console.log("hello script js");

let cnv; //to center
let player;
let bgColor;
let pauseMode = false; //to start game wo a pause

let aliens = []; //to store aliens & png, total 72 aliens
let alienA;
let alienAA;
let alienB;
let alienBB;
let alienC;
let alienCC;

let speedAlien = 8; //alien speed, X frames /sec lower no. = faster
let alienDirection = "left";

let bullets = []; //bullet.js, to store bullets
let score = 0; //func drawScore

let gameOverBool = false; //gameover if true, in func spacebar
// let ele; //to store MediaElement
// let gameIsPlaying = true; //to start unpaused

//preload alien PNGs
function preload() {
  alienA = loadImage("png/alienA.png");
  alienAA = loadImage("png/alienAA.png");
  alienB = loadImage("png/alienB.png");
  alienBB = loadImage("png/alienBB.png");
  alienC = loadImage("png/alienC.png");
  alienCC = loadImage("png/alienCC.png");
}

//Prioritsed first bec windowResized, need to refresh to re-center
//Seq 1.1 centerCanvas
function centerCanvas() {
  var x = (windowWidth - width) / 2; //x, y to centralise canvas
  var y = (windowHeight - height) / 1.6;
  cnv.position(x, y);
}

//setup canvas
//Seq 1.2 centerCanvas
function setup() {
  cnv = createCanvas(800, 550);
  centerCanvas();
  bgColor = color("#0e2c54");
  stroke("#666");
  strokeWeight(5);
  frameRate(25); //spaceship + bullet 20 frames /sec, higher no. = faster
  player = new Spaceship();
  createAliens(); //call createAliens func
  textFont("Space Mono");
}

//Func to center canvas when windowResized
//Seq 1.3 centerCanvas
function windowResized() {
  centerCanvas;
}

//Func continuously executes the lines of code contained inside its block until stopped
function draw() {
  if (focused || frameCount < 30) {
    //the screen I'm focused on, eg when i click on it
    background(bgColor);
    player.moveSpaceship();
    player.drawPlayer();
    drawScore(); //add func to show score

    if (!pauseMode) {
      //If game is not in pause mode, run func that incrementally move everything else
      moveBullet();

      if (frameCount % speedAlien == 0) {
        //Move aliens for every other frame; staggering, def speed
        moveAliens();
      }
    }
    if (pauseMode) {
      //if in pauseMode
      drawUnpauseInstructions();
    }

    drawBullet(); //func drawBullets
    drawAliens(); //func drawAliens
    hitAlien(); //func hitAliens

    if (killedAlien()) {
      print("all aliens ded");
      playerWin();
      resetAliens();
      // resetGame();
    }
  } else {
    drawUnpauseInstructions();
  }
}

// function mouseClicked() { //ele is for music
//mouse over canvas when clicked
// if(mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
// background(800, 600); //canvas dimension
// }
//     if (gameIsPlaying) {
//       ele.pause();
//       gameIsPlaying = false;
//       text("click to resume", width / 2, height - height / 4);
//     } else {
//       //loop game
//       ele.loop();
//       gameIsPlaying = true;
//       text("click to pause!", width / 2, height / 4);
//     }
// }

//Func for unPauseInstruction

function drawUnpauseInstructions() {
  //When click on another window, game will be pauseMode
  noStroke();
  fill("#fff");
  textAlign(CENTER);
  textSize(14);
  textFont("Space Mono");
  text("click on screen to play", width / 2, height - height / 4); // "width/2" is center, "height" is in 4/4
  text("press P to resume", width / 2, height - height / 4 + 25); // +25 to put text below "click tp play"
}

//Create aliens, total: 72 aliens
function createAliens() {
  let startingX = 60; //gap bwtn canvas left and 1st column of aliens, apply to all startingX
  let startingY = 110; //gap bwtn canvas top and 1st row of aliens

  //create row 1 of alienA && alienAA
  for (i = 0; i < 24; i++) { //original < 24 aliens
    //24 per row
    //20 aliens to appear
    aliens[i] = new Alien(startingX, startingY, 25, 25, alienA, alienAA, 10); //30 30 is the alien size, 10 refers to 10 pts
    startingX += 30;

    if (startingX > width - 30) {
      //(-30) readjust till aliens /row falls within correct row
      startingX = 60; //if touch wall, create a new row
      startingY -= 30;
    }
  }
  //create row 2 of alienB && alienBB
  for (i = 24; i < 48; i++) {
      //20 aliens to appear
      aliens[i] = new Alien(startingX, startingY, 25, 25, alienB, alienBB, 10); //30 30 is the alien size
      startingX += 30;

      if (startingX > width - 30) {
          startingX = 60; //if touch wall, create a new row
          startingY -= 30;
      }
  }
  // //create row 3 of alienC && alienCC
  for (i = 48; i < 72; i++) {
      //20 aliens to appear
      aliens[i] = new Alien(startingX, startingY, 25, 25, alienC, alienCC, 10); //30 30 is the alien size
      startingX += 30;

      if (startingX > width - 30) {
          startingX = 60; //if touch wall, create a new row
          startingY -= 30;
      }
  }
}

//draw aliens
function drawAliens() {
  for (let alien of aliens) {
    alien.draw();
  }
}

//move aliens
function moveAliens() {
  for (let alien of aliens) {
    alien.moveHorizontal(alienDirection);
  }
  //When alien reachEdge, call alienReverseHorizontalDirection
  if (alienReachEdge()) {
    alienReverseHorizontalDirection();
    moveDown();
  }
}

//alien reach edge
function alienReachEdge() {
  let reachEdge = false; //create a state, false = haven't touch edge
  for (let alien of aliens) {
    //when any alien reachEdge, reverse direction
    //left wall || right wall
    if (
      (alien.xAxis < 20 && alien.alive) ||
      (alien.xAxis > width - 40 && alien.alive) //max (-40) for alien to not go out screen
    ) {
      //increase no. to prevent clipping
      reachEdge = true; //if true, reverse direction
    }
  }
  return reachEdge;
}

//reverse Horizontal direction
function alienReverseHorizontalDirection() {
  if (alienDirection === "left") {
    alienDirection = "right";
  } else {
    alienDirection = "left";
  }
} //add function to |Move aliens|

//alien moveDown
function moveDown() {
  for (let alien of aliens) {
    alien.moveVertical();
  }
}

//bullet.js
function drawBullet() {
  for (let bullet of bullets) {
    bullet.draw(); //func located in bullet.js
  }
}

function moveBullet() {
  for (let bullet of bullets) {
    //create 1 bullet for every bullets in the array
    bullet.move(); //func located in bullet.js
  }
}

//Func for spacebar
function keyPressed() {
  if (key === " ") {
    if (!pauseMode) {
      player.fire(); //fire() in spaceship.js
    }
  }
  if (keyCode === LEFT_ARROW) {
    player.changeDirection("left"); //spaceship goes left
  }
  if (keyCode === RIGHT_ARROW) {
    player.changeDirection("right"); //spaceship goes right
  }
  // if ((keyCode === RETURN || keyCode === ENTER) && gameOverBool) {
  //   resetGame();
  // }
  if (key === "p") {
    //setting key "p" as pause
    if (!pauseMode) {
      pauseMode = true;
    } else {
      pauseMode = false;
    }
  }
  return false; //prevent bugs from default browser behaviours
}

function keyReleased() {
  //keyReleased to stop left / right from moving
  if (keyIsPressed === false) {
    //true if any key is pressed and false if no keys are pressed
    player.changeDirection("none"); //changeDirection will be nothing
  }
}

//func for hitAlien
function hitAlien() {
  for (let bullet of bullets) {
    //check if any bullet[] is touching alien[]
    for (let alien of aliens) {
      //if(distannce of (alien.xAxis, alien.yAxis, bullet.xAxis, bullet.yAxis) < 10), anything <10 is inside the target
      if (
        bullet.xAxis > alien.xAxis - alien.alienWidth / 2 && //bullet in rightAlien
        bullet.xAxis < alien.xAxis + alien.alienWidth / 2 && //bullet in leftAlien
        bullet.yAxis - bullet.length > alien.yAxis - alien.alienHeight / 2 && //anything bwtn the "gap", refers to the whole bullet
        bullet.yAxis - bullet.length < alien.yAxis + alien.alienHeight / 2 &&
        !bullet.hit &&
        alien.alive //bullet never hit & alien alive
      ) {
        alien.alive = false; //setting alien is ded
        bullet.hit = true; //setting bullet has hit, bullet disappears

        score += alien.points; //SCORE when alien is hit, alien.js; points
      }
    }
  }
}

//func killedAlien
function killedAlien() {
  //check through the alien[] if alien are ded
  let ded = true;
  for (let alien of aliens) {
    if (alien.alive) {
      ded = false;
    }
  }
  return ded;
}

//func resetAliens, add to when all ded
function resetAliens() {
  createAliens();
}

//func drawScore on screen
function drawScore() {
  noStroke();
  fill("#fff");
  textSize(14);
  textAlign(LEFT);
  textFont("Space Mono");
  text("SCORE: " + score, 20, 25); //score comes after "score:"
  // text(score, 90, 25); //position of score
}

//func playerWin
function playerWin() {
  gameOverBool = true; //gameOver is true
  if ((score = 10)) { //270
    background(0, 255);
    print("player cleared all aliens");
    textSize(25);
    stroke(0);
    fill("#fff");
    textAlign(CENTER);
    textFont("SpaceMono");
    text("Congratulations, you won!", width / 2, height / 2); //click to restart?
  }
  noLoop();
}

//create restart (for game clear)
// function restart() {
//   let resetButton = document.getElementById("lineOne");
//   resetButton.textContent = "restart";
//   resetButton.addEventListener("click", resetGame());
// }

//func resetGame
// function resetGame() {
//   score = 0;
//   player = new Spaceship();
//   resetAliens();
//   for(let bullet of bullets) { //clear bullets
//     bullet.hit = true;
//   }
  // noloop();
// }

//func for gameInstruction button
function howToPlay() {
  var gameInstruction = document.getElementById("gameInstructionPopup");
  gameInstruction.classList.toggle("show");
  // gameInstruction.addEventListener("click", howToPlay());
}
