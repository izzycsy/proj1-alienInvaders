console.log("hello script js");

let canvas; //main.js
let player;
let bgColor;
let pauseMode = false; //to start game wo a pause

let aliens = []; //to store aliens & png
let alienA;
let alienAA;
let alienB;
let alienBB;
let alienC;
let alienCC;

let speed = 10; //alien move once every 10 frames, lower no. = faster
let alienDirection = "left";

let bullets = []; //bullet.js, to store bullets

let gameOverBool = false; //gameover, in func spacebar

//preload alien PNGs
function preload() {
  alienA = loadImage("png/alienA.png");
  alienAA = loadImage("png/alienAA.png");
  alienB = loadImage("png/alienB.png");
  alienBB = loadImage("png/alienBB.png");
  alienC = loadImage("png/alienC.png");
  alienCC = loadImage("png/alienCC.png");
}

//setup canvas
// canvas = document.getElementById("gameCanvas");
function setup() {
  canvas = createCanvas(800, 600);
  canvas.id("AlienInvaders"); //to enable CSS
  bgColor = color("#082547");
  stroke("#666");
  strokeWeight(5);
  frameRate(20); //10 frames per second
  player = new Spaceship();
  createAliens(); //call createAliens func
  imageMode(CENTER);
}

//Func continuously executes the lines of code contained inside its block until stopped
function draw() {
  if (focused || frameCount < 30) {
    //the screen I'm focused on, eg when i click on it
    background(bgColor);
    player.moveSpaceship();
    player.drawPlayer();

    if (!pauseMode) {
      //If game is not in pause mode, run func that incrementally move everything else
      moveBullet();

      if (frameCount % speed == 0) {
        //Move aliens for every other frame; staggering, def speed
        moveAliens();
      }
    }

    if (pauseMode) {
    }

    drawBullet(); //func drawBullets
    drawAliens(); //func drawAliens
    hitAlien(); //func hitAliens
  } else {
    drawUnpauseInstructions();
  }
}

//Func for unPauseInstruction
function drawUnpauseInstructions() {
  //To start the game
  noStroke();
  fill(255);
  textAlign(CENTER);
  textSize(18);
  text("click to play", width / 2, height - height / 4); // "width/2" is center, "height" is in 4/4
}

//Create aliens
function createAliens() {
  let startingX = 70;
  let startingY = 100;

  //create row 1 of alienA && alienAA
  for (i = 0; i < 24; i++) {
    //20 aliens to appear
    aliens[i] = new Alien(startingX, startingY, 25, 25, alienA, alienAA); //30 30 is the alien size
    startingX += 30;

    if (startingX > width - 30) {
      startingX = 70; //if touch wall, create a new row
      startingY -= 30;
    }
  }
  //create row 2 of alienB && alienBB
  for (i = 24; i < 48; i++) {
    //20 aliens to appear
    aliens[i] = new Alien(startingX, startingY, 25, 25, alienB, alienBB); //30 30 is the alien size
    startingX += 30;

    if (startingX > width - 30) {
      startingX = 70; //if touch wall, create a new row
      startingY -= 30;
    }
  }
  //create row 3 of alienC && alienCC
  for (i = 48; i < 72; i++) {
    //20 aliens to appear
    aliens[i] = new Alien(startingX, startingY, 25, 25, alienC, alienCC); //30 30 is the alien size
    startingX += 30;

    if (startingX > width - 30) {
      startingX = 70; //if touch wall, create a new row
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
      (alien.xAxis > width - 20 && alien.alive)
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
    player.changeDirection("left");
  }
  if (keyCode === RIGHT_ARROW) {
    player.changeDirection("right");
  }
  if ((keyCode === RETURN || keyCode === ENTER) && gameOverBool) {
    reset();
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
