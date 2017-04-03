/**
 * Created by Metr_yumora on 03.04.2017.
 */
let canvas;
let canvasContext;

let thimble1;
let thimble2;
let thimble3;

let thimbles;

function initialize() {
    canvas = document.getElementById("canvas");
    canvasContext = canvas.getContext("2d");
    thimble1 = new Thimble(100, 400, "#000000");
    thimble2 = new Thimble(500, 400, "#000000");
    thimble3 = new Thimble(900, 400, "#000000");
    thimbles = [thimble1, thimble2, thimble3];
    updateCanvas();
}

function updateCanvas() {
    canvasContext.clearRect(0, 0, 1300, 800);
    thimble1.draw();
    thimble2.draw();
    thimble3.draw();
    window.requestAnimationFrame(updateCanvas);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function mix(swapsCount, speed) {
    switch (getRandomInt(1, 4)) {
        case 1: {
            swapThimbles(thimble1, thimble2, speed);
            break;
        }
        case 2: {
            swapThimbles(thimble1, thimble3, speed);
            break;
        }
        case 3: {
            swapThimbles(thimble3, thimble2, speed);
            break;
        }
    }
}

function move() {
    mix(1, 10);
}

function Thimble(leftBotX, leftBotY, color) {

    this.xPos = leftBotX;
    this.yPos = leftBotY;
    this.topWidth = 170;
    this.bottomWidth = 300;
    this.height = 250;

    this.draw = function () {
        canvasContext.beginPath();
        canvasContext.moveTo(this.xPos, this.yPos);
        canvasContext.arcTo(this.xPos + this.bottomWidth / 2, this.yPos + 45, this.xPos + this.bottomWidth, this.yPos, 520);
        canvasContext.moveTo(this.xPos + (this.bottomWidth - this.topWidth) / 2, this.yPos - this.height);
        canvasContext.arcTo(this.xPos + (this.bottomWidth - this.topWidth) / 2 + this.topWidth / 2, this.yPos - this.height - 25, this.xPos + (this.bottomWidth - this.topWidth) / 2 + this.topWidth, this.yPos - this.height, 300);
        canvasContext.moveTo(this.xPos + (this.bottomWidth - this.topWidth) / 2 + this.topWidth, this.yPos - this.height);
        canvasContext.arcTo(this.xPos + (this.bottomWidth - this.topWidth) / 2 + this.topWidth / 2, this.yPos - this.height + 25, this.xPos + (this.bottomWidth - this.topWidth) / 2, this.yPos - this.height, 300);
        canvasContext.moveTo(this.xPos, this.yPos);
        canvasContext.lineTo(this.xPos + (this.bottomWidth - this.topWidth) / 2, this.yPos - this.height);
        canvasContext.moveTo(this.xPos + this.bottomWidth, this.yPos);
        canvasContext.lineTo(this.xPos + (this.bottomWidth - this.topWidth) / 2 + this.topWidth, this.yPos - this.height);
        canvasContext.stroke();
    };

    this.changePosition = function (newX, newY) {
        this.xPos = newX;
        this.yPos = newY;
    };

    this.getX = function () {
        return this.xPos;
    };

    this.getY = function () {
        return this.yPos;
    };

}

function swapThimbles(thimble1, thimble2, speedMult) {
    let x1 = thimble1.getX();
    let x2 = thimble2.getX();
    var interval = setInterval(
        function () {
            if (x1 > x2) {
                thimble1.xPos -= 1 * speedMult;
                thimble2.xPos += 1 * speedMult;
            } else {
                thimble1.xPos += 1 * speedMult;
                thimble2.xPos -= 1 * speedMult;
            }
            updateCanvas();
            if (thimble2.xPos === x1) {
                clearInterval(interval);
            }
        }, 1);
}
