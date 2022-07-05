var xHeaderSnake = 100;
var dxHeaderSnake = 2;
const image = new Image();
image.src = "snake.png";
image.onload = function() { headerSnake(); };

function headerSnake() {
    const canv = document.getElementById("headerCanvas");
    canv.width = document.getElementById("header").offsetWidth;
    canv.height = document.getElementById("header").offsetHeight;
    const cax = canv.getContext("2d");
    cax.clearRect(0, 0, 400, 400);
    requestAnimationFrame(headerSnake);
    cax.drawImage(image, xHeaderSnake, 5, 120, 50);
    if (xHeaderSnake > document.getElementById("header").offsetWidth / 2) {
        dxHeaderSnake = 16;
        dxHeaderSnake = -dxHeaderSnake;
    } else if (xHeaderSnake < document.getElementById("title").offsetWidth + 50) {
        dxHeaderSnake = -dxHeaderSnake;
        dxHeaderSnake = 2;
    }
    xHeaderSnake += dxHeaderSnake;
}

var headPosition = [160, 280];
var snakeBody = [];
var gridSize = 40;
var direction = 0;
let time;
var xFood = Math.floor(Math.random() * 15) * gridSize;
var yFood = Math.floor(Math.random() * 15) * gridSize;
let snakeLength = 2;
let difficulty = 100;
let score = 0;
let bestScore = 0;

function drawSquare() {
    const canvas = document.getElementById("root");
    const ctx = canvas.getContext("2d");
    const snakeHead = new Image();
    snakeHead.src = "snakeHead.png";
    ctx.clearRect(0, 0, 600, 600);
    snakeHead.onload = function() { drawSnake(ctx, snakeHead); };
    generateFood();
}

function generateFood() {
    const canvas = document.getElementById("root");
    const ctx = canvas.getContext("2d");
    do {
        xFood = Math.floor(Math.random() * 15) * gridSize;
        yFood = Math.floor(Math.random() * 15) * gridSize;
    } while (checkFoodCollision());
    const image = new Image();
    image.src = "apple.png";
    image.onload = function() { ctx.drawImage(image, xFood, yFood, gridSize, gridSize); };
}

document.onkeydown = function(event) {
    var keyCode = window.event.keyCode;
    switch (keyCode) {
            case 37: //left
                if (direction !== 1) {
                    direction = 3;
                }
                break;
            case 38: //up
                if (direction !== 4) {
                    direction = 2;
                }
                break;
            case 39: //right
                if (direction !== 3) {
                    direction = 1;
                }
                break;
            case 40: //down
                if (direction !== 2) {
                    direction = 4;
                }
    }
    if (difficulty === 100) {
        time = setInterval(moveSnake, difficulty);
        difficulty += 1;
    }
    moveSnake();
    document.getElementById("message").innerHTML = score;
}

function drawSnake(ctx, snakeHead) {
    snakeBody.push([headPosition[0], headPosition[1]]);
    ctx.drawImage(snakeHead, headPosition[0], headPosition[1], gridSize, gridSize);
    if (snakeBody.length > snakeLength) {
        let toRemove = snakeBody.shift();
        ctx.clearRect(toRemove[0], toRemove[1], gridSize, gridSize);
    }
}

function moveSnake() {
    const canvas = document.getElementById("root");
    const ctx = canvas.getContext("2d");
    const snakeHead = new Image();
    snakeHead.src = "snakeHead.png";
    switch (direction) {
        case 3: //left
            headPosition[0] = headPosition[0] - gridSize;
            break;
        case 2: //up
            headPosition[1] = headPosition[1] - gridSize;
            break;
        case 1: //right
            headPosition[0] = headPosition[0] + gridSize;
            break;
        case 4: //down
            headPosition[1] = headPosition[1] + gridSize;
    }
    eatFood();
    if (checkCollision()) {
        drawSnake(ctx, snakeHead);
    } else {
        clearInterval(time);
        direction = 0;
        snakeLength = 2;
        difficulty = 100;
        headPosition = [160, 280];
        snakeBody = [];
        if (bestScore < score) {
            bestScore = score;
        }
        document.getElementById("message").innerHTML = "Game over! Your score was " + score + "! Best score is " + bestScore + ".";
        score = 0;
        drawSquare();
    }
}

function eatFood() {
    if (headPosition[0] === xFood && headPosition[1] === yFood) {
        ++snakeLength;
        ++score;
        document.getElementById("message").innerHTML = score;
        generateFood();
    }
}

function checkCollision() {
    let length = snakeBody.length;
    if (headPosition[0] === -40 || headPosition[0] === 600 || headPosition[1] === -40 || headPosition[1] === 600) {
        return false;
    }
    for (let i = 0; i < length; ++i) {
        if (headPosition[0] === snakeBody[i][0] && headPosition[1] === snakeBody[i][1]) {
            return false;
        }
    }
    return true;
}

function checkFoodCollision() {
    let length = snakeBody.length;
    if (headPosition[0] === xFood && headPosition[1] === yFood) {
        return false;
    }
    for (let i = 0; i < length; ++i) {
        if (xFood === snakeBody[i][0] && yFood === snakeBody[i][1]) {
            return true;
        }
    }
    return false;
}
