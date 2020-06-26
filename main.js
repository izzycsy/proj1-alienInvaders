console.log("hello script js");

//mainCanvas
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
var x = 50;
var y = 50;
var moonRadius = 20;
var dx = 2;
var dy = 0;

//Duplicate moon
var rowMoon = 5;
var columnMoon = 11;
var paddingMoon = 10;
var offsetTopMoon = 30;
var offsetLeftMoon = 30;

var moonBugs = [];
for (var c = 0; c < columnMoon; c++) {
    moonBugs[c] = []; //Instantiate (column) an array within an array
    for (var r = 0; r < rowMoon; r++) {
        moonBugs[c][r] = {
            x: 0,
            y: 0,
            state: 1
        } //each moonBug has a x,y coordinate & alive / dead state
    }
}

function drawMoon() {
    for (var c = 0; c < columnMoon; c++) {
        for (var r = 0; r < rowMoon; r++) {
            var moonBugsX = (c * paddingMoon) + offsetLeftMoon;

            moonBugs[c][r].x = moonBugsX;

            context.beginPath();
            context.arc(x, y, moonRadius, 0, 2 * Math.PI);
            context.fillStyle = "#e6e6e6";
            context.fill();
            context.closePath();
        }
    }
}

// Moon move sideways
function move() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawMoon();
    if (x + dx > canvas.width - moonRadius || x + dx < moonRadius) {
        dx = -dx;
    }
    x += dx;
}

// setInterval(move, 20); //frame rate: 0.02s
