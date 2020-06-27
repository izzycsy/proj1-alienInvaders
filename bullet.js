//Bullet

class Bullet {
    constructor(x, y, dir) { //dir to set direction of left to right
      this.xAxis = x;
      this.yAxis = y;
      this.direction = dir; //positive for up, negative for down
      this.length = 5;
      this.hit = false;
  };

  draw() {
    if(!this.hit) {
      stroke(255);
      strokeWeight(5);
      line(this.xAxis, this.yAxis, this.xAxis, this.yAxis - this.length); //draw a line that orginates from xAxis & yAxis, the 2nd xAxis does not move
      if (this.yAxis < 0) {
        bullet.splice(0, 1); //removes bullet once it leaves screen, no need 3rd value bec not adding anything else
      }
    }
  };

  move() {
    this.yAxis -= 12;
  };
};