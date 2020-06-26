//Alien

// var x = 50;
// var y = 50;

class Alien {
    constructor(xAxis, yAxis, width, height)
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.alienWidth = width;
    this.alienHeight = height;
    this.alive = true;
    this.explosionTimer = 3;
    

    draw() {
        if(this.alive) { //Draw alien if alive
            if(this.currentImage === "first") {
                image(this.alienA, this.xAxis, this.yAxis, this.alienWidth, this.alienHeight);
            }
            if(this.currentImage === "second") {
                image(this.alienAA, this.xAxis, this.yAxis, this.alienWidth, this.alienHeight);
            }
        }
        if(!this.alive){
            if(this.explosionTimer > 0) {
                this.explode();
                this.explosionTimer -= 1;
            }
        }
    };

    moveHorizontal() {
        if(alienDirection === "left") {
            this.xAxis -= 5;
        }
        if(alienDirection === "right") {
            this.xAxis += 5;
        }
        if(this.currentImage === "alienA") {
            this.currentImage = "alienAA";
        } else if (this.currentImage === "alienAA") {
            this.currentImage = "alienA";
        }
    };

    moveVertical() {
        this.y += 10;
    };

};