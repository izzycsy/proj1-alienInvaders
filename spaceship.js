//Spaceship

class Spaceship {
  constructor() { //no arguments
    this.xAxis = width / 2; //start position
    this.yAxis = height - 30; //posotion from bottom of screen
    this.spaceshipWidth = 35;
    this.spaceshipHeight = 10;
    this.cannonWidth = 10; 
    this.direction = "none"; //stop it from moving when arrow-keys are not pressed
    // this.lives = 3;
    this.bulletInterval = 5; //fire() one shot every 5 frames
    this.lastBulletFiredTimestamp = -this.bulletInterval; //the first timestamp is -5
    this.color = "#fff07f";
  };

  //draw the player
  drawPlayer() {
    fill(this.color);
    rectMode(CENTER);
    noStroke();
    this.drawSpaceship(this.xAxis, this.yAxis); //link player to spaceship
  };

  //draw the spaceship & cannon
  drawSpaceship(x, y) {
    rect(x, y, this.spaceshipWidth, this.spaceshipHeight, 2); //left
    rect(x, y - (this.spaceshipHeight / 2) - (this.cannonWidth / 2),
      this.cannonWidth, this.cannonWidth); //cannon
    rect(x, y - (this.spaceshipHeight / 2) - (this.cannonWidth - 1), 2, 2); //right
  };
  
  //to move spaceship
  moveSpaceship() {
    if(!pauseMode) { 
      if (this.direction === "left" && this.xAxis > (this.spaceshipWidth / 2)) {
        this.xAxis -= 5; //5px per frame; movement speed
      }
      if(this.direction === "right" && this.xAxis < width - (this.spaceshipWidth / 2)) {
        this.xAxis += 5; //no yAxis, bec player only moves left & right
      }
    }
  };

  changeDirection(direction) {
    this.direction = direction; //take the argument from sketch.js
  };

  //Fire bullets using spaceBar n
  fire() {
      if(frameCount - this.lastBulletFiredTimestamp > this.bulletInterval) { //frameCount is an invisible no., it refers to the no. of frames rendered
        bullets.push(new Bullet(this.xAxis, this.yAxis - (this.spaceshipHeight), 1));
        this.lastBulletFiredTimestamp = frameCount; //to record the timestamp
      }
  }
};
