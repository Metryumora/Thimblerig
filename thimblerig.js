/**
 * Created by Metr_yumora on 03.04.2017.
 */
let canvas;
let canvasContext;
let thimbleImage;
let ballImage;

let thimble1;
let thimble2;
let thimble3;

let executingSwaps = false;

let defaultSpeed = 1;

function initialize() {
    canvas = document.getElementById("canvas");
    canvasContext = canvas.getContext("2d");
    thimbleImage = document.getElementById("thimbleImage");
    ballImage = document.getElementById("ballImage");
}

function startNewGame() {
    thimble1 = new Thimble(100, 60, false);
    thimble2 = new Thimble(500, 60, true);
    thimble3 = new Thimble(900, 60, false);
    thimble2.raise()
    updateCanvas();
}

function updateCanvas() {
    canvasContext.clearRect(0, 0, 1300, 500);
    thimble1.draw();
    thimble2.draw();
    thimble3.draw();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function mix(swapsCount, speed) {
    let i = 0;
    let swapExecutor = setInterval(function () {
        if (!executingSwaps) {
            switch (getRandomInt(1, 4)) {
                case 1: {
                    swapThimbles(thimble1, thimble2, speed);
                    i++;
                    break;
                }
                case 2: {
                    swapThimbles(thimble1, thimble3, speed);
                    i++;
                    break;
                }
                case 3: {
                    swapThimbles(thimble3, thimble2, speed);
                    i++;
                    break;
                }
            }
        }
        if (i === swapsCount) {
            clearInterval(swapExecutor);
        }
    }, 100)
}

function move() {
    if (!executingSwaps) {
        if (thimble2.risen) {
            thimble2.lower();
        }
        mix(5, defaultSpeed);
    }
}

function Thimble(x, y, ballIsHere) {

    this.x = x;
    this.y = y;
    this.containsBall = ballIsHere;
    this.risen = false;

    this.draw = function () {
        canvasContext.drawImage(thimbleImage, this.x, this.y);
        if (this.containsBall && this.risen) {
            canvasContext.drawImage(ballImage, this.x + thimbleImage.width / 2 - ballImage.width / 2, this.y + thimbleImage.height - 25);
        }
    };

    this.raise = function () {
        if (!this.risen) {
            this.changePosition(this.x, this.y - 50);
            this.risen = true;
        }
    };

    this.lower = function () {
        if (this.risen) {
            this.changePosition(this.x, this.y + 50);
            this.draw();
            this.risen = false;
        }
    };

    this.changePosition = function (newX, newY) {
        this.x = newX;
        this.y = newY;
    };

    this.getX = function () {
        return this.x;
    };

    this.getY = function () {
        return this.y;
    };

    this.checkClickBox = function (x, y) {
        return (x >= this.x && x <= this.x + thimbleImage.width
        && y >= this.y && y <= this.y + thimbleImage.height)
    };
}

function swapThimbles(thimble1, thimble2, speedMult) {
    let x1 = thimble1.getX();
    let x2 = thimble2.getX();

    let interval = setInterval(
        function () {
            executingSwaps = true;
            if (x1 > x2) {
                thimble1.x -= 10 * speedMult;
                thimble2.x += 10 * speedMult;
            } else {
                thimble1.x += 10 * speedMult;
                thimble2.x -= 10 * speedMult;
            }
            updateCanvas();
            if (thimble2.x === x1) {
                clearInterval(interval);
                executingSwaps = false;
                console.log(typeof interval);
            }
        }, 10);
}

function processClick() {
    if (!executingSwaps) {
        var pageX = event.pageX;
        var pageY = event.pageY;
        let bodyRect = document.body.getBoundingClientRect();
        let elemRect = canvas.getBoundingClientRect();
        let offsetY = elemRect.top - bodyRect.top;
        let offsetX = elemRect.left - bodyRect.left;
        if (thimble1.checkClickBox(pageX - offsetX, pageY - offsetY)) {
            thimble1.raise();
            updateCanvas();
        } else if (thimble2.checkClickBox(pageX - offsetX, pageY - offsetY)) {
            thimble2.raise();
            updateCanvas();
        } else if (thimble3.checkClickBox(pageX - offsetX, pageY - offsetY)) {
            thimble3.raise();
            updateCanvas();
        }
    }
}
