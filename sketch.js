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


//preload alien PNGs
function preload() {
    alienA = loadImage("png/alienA.png");
    alienAA = loadImage("png/alienAA.png");
    alienB = loadImage("png/alienB.png");
    alienBB = loadImage("png/alienBB.png");
    alienC = loadImage("png/alienC.png");
    alienCC = loadImage("png/alienCC.png");
};

//setup canvas 
// canvas = document.getElementById("gameCanvas");
function setup() {
    canvas = createCanvas(800, 600);
    canvas.id("AlienInvaders");
    bgColor = color("#082547");
    stroke("#666");
    strokeWeight(5);
    frameRate(10);
    player = new Spaceship();
    createAliens(); //call createAliens func
    imageMode(CENTER);

};

//Func continuously executes the lines of code contained inside its block until stopped
function draw() {
    if(focused || frameCount < 30) { //the screen I'm focused on
        background(bgColor);
        player.moveSpaceship();
        player.drawPlayer(); 

        if(!pauseMode) { //If game is not in pause mode, run func that incrementally move everything else
                moveBullet();

                if(frameCount % speed == 0) { //Move aliens for every other frame; staggering, def speed
                    moveAliens();
            } 
        } 

        if(pauseMode) {
        }

        drawBullet();
        drawAliens();

    } else {
        drawUnpauseInstructions();
    }
};

//Func for unPauseInstruction
function drawUnpauseInstructions() { //To start the game
    noStroke();
    fill(255);
    textAlign(CENTER);
    textSize(18);
    text("click to play", width / 2, height - height / 4); // "width/2" is center, "height" is in 4/4
}

//Func for spacebar



//Create aliens
function createAliens() {
    let startingX = 70;
    let startingY = 200;

    //create row 1 of alienA && alienAA
    for(i = 0; i < 20; i++) { //22 aliens to appear
        aliens[i] = new Alien(startingX, startingY, 30, 30, alienA, alienAA); //30 30 is the alien size
        startingX += 30;

        if(startingX > width - 30) {
            startingX = 70; //if touch wall, create a new row
            startingY -= 30;
        }
    };
};

//draw aliens
function drawAliens() {
    for(let alien of aliens) {
        alien.draw();
    }
};

//Move aliens
function moveAliens() {
    for(let alien of aliens) {
        alien.moveHorizontal(alienDirection);
    }
    //When alien reachEdge, call alienReverseHorizontalDirection
    if(alienReachEdge()) {
        alienReverseHorizontalDirection();
        moveDown();
    }
};

 //Alien reach edge
 function alienReachEdge() {
     let reachEdge = false; //create a state, false = haven't touch edge
     for(let alien of aliens) { //when any alien reachEdge, reverse direction
        //left wall || right wall
         if((alien.xAxis < 20 && alien.alive) || (alien.xAxis > width - 20 && alien.alive)) { //increase no. to prevent clipping
             reachEdge = true; //if true, reverse direction
         }
     }
     return reachEdge;
 };

 //Reverse Horizontal direction
function alienReverseHorizontalDirection() {
    if(alienDirection === "left") {
        alienDirection = "right";
    } else {
        alienDirection = "left";
    }
}; //add function to |Move aliens|

//Alien moveDown
function moveDown() {
    for(let alien of aliens) {
        alien.moveVertical();
    }
};

//bullet.js
function drawBullet() {
    for(let bullet of bullets) {
        bullet.draw(); //func located in bullet.js
    }
}

function moveBullet() {
    for(let bullet of bullets) { //create 1 bullet for every bullets in the array
        bullet.move(); //func located in bullet.js
    }
}

//Reset alien position && incriment speed



