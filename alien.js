//Alien

// var x = 50;
// var y = 50;

class Alien {
  constructor(x, y, width, height, imgA, imgAA) {
    this.xAxis = x;
    this.yAxis = y;
    this.alienWidth = width;
    this.alienHeight = height;
    this.imageA = imgA;
    this.imageAA = imgAA;
    this.currentImage = "A";
    this.alive = true;
    this.explosionTimer = 3; //link to this.die
  }

  draw() {
    if (this.alive) {
      //Draw alien if alive
      if (this.currentImage === "A") {
        image(
          this.imageA,
          this.xAxis,
          this.yAxis,
          this.alienWidth,
          this.alienHeight
        );
      }

      if (this.currentImage === "AA") {
        //add variable when "moveHorizontal"
        image(
          this.imageAA,
          this.xAxis,
          this.yAxis,
          this.alienWidth,
          this.alienHeight
        );
      }
    }
    
    if(!this.alive){ //link to this.die
        if(this.explosionTimer > 0) {
            this.die();
            this.explosionTimer -= 1;
        }
    }
  }

  moveHorizontal() {
    if (alienDirection === "left") {
      this.xAxis -= 5; //movement speed 5px every other frame
    }
    if (alienDirection === "right") {
      this.xAxis += 5;
    }
    if (this.currentImage === "A") {
      //swap the images
      this.currentImage = "AA";
    } else if (this.currentImage === "AA") {
      this.currentImage = "A";
    }
  }

  moveVertical() {
    this.yAxis += 10; //movement speed 10px once when collide w wall
  }

  die() {
    push(); //start drawing explosion
    translate(this.xAxis, this.yAxis); //orginate the explosion from alien's center
    noFill();
    stroke(255);
    strokeWeight(2);

    for (let i = 0; i < 10; i++) {
      //to draw 10 random lines
      line(floor(random(2, 8)), 0, floor(random(10, 15)), 0);
      rotate(random(0, (4 * PI) / 10));
    }
    pop(); //restore original state
  }
}
