//Spaceship

class Spaceship {
  constructor() {
    this.x = width / 2;
    this.y = height - 20;
    this.spaceshipWidth = 26;
    this.spaceshipHeight = 8;
    this.cannonWidth = 5;
    this.direction = "none";
    // this.lives = 3;
    this.bulletInterval = 5;
    this.lastBulletFiredTimestamp = -this.bulletInterval;
    this.color = "#fff07f";
  };

  // draws the player
  drawPlayer() {
    fill(this.color);
    rectMode(CENTER);
    noStroke();
    this.drawSpaceship(this.x, this.y);
  };

  //draw spaceship && cannon
  drawSpaceship(x, y) {
    rect(x, y, this.spaceshipWidth, this.spaceshipHeight, 2);
    rect(x, y - (this.spaceshipHeight / 2) - (this.cannonWidth / 2),
      this.cannonWidth, this.cannonWidth);
    rect(x, y - (this.spaceshipHeight / 2) - (this.cannonWidth - 1), 2, 2);
  };

  moveSpaceship() {
    if(!pauseMode) {
      if (this.direction === "left" && this.x > (this.spaceshipWidth / 2)) {
        this.x -= 5;
      }
      if(this.direction === "right" && this.x < width - (this.spaceshipWidth / 2)) {
        this.x += 5;
      }
    }
  };

  changeDirection(direction) {
    this.direction = direction;
  };

  //Fire bullets
  fire() {
      
  }
};
