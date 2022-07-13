const headSnake = {
    x: 100,
    dx: 2
};
const snakeImg = new Image();
snakeImg.src = "snake.png";
snakeImg.onload = function() { headerSnake(); };

function headerSnake() {
    const canv = document.getElementById("headerCanvas");
    canv.width = document.getElementById("header").offsetWidth;
    canv.height = document.getElementById("header").offsetHeight;
    const cax = canv.getContext("2d");
    cax.clearRect(0, 0, 400, 400);
    requestAnimationFrame(headerSnake);
    cax.drawImage(snakeImg, headSnake.x, 5, 120, 50);
    if (headSnake.x > document.getElementById("header").offsetWidth / 2) {
        headSnake.dx = 16;
        headSnake.dx = -headSnake.dx;
    } else if (headSnake.x < document.getElementById("title").offsetWidth + 50) {
        headSnake.dx = -headSnake.dx;
        headSnake.dx = 2;
    }
    headSnake.x += headSnake.dx;
}

let snakeBody = [{x: 120, y: 280}, {x: 160, y: 280}, {x: 200, y: 280}];
let dx = 40;
let dy = 0;
let previousDirection = 39;
var xFood = 0;
var yFood = 0;
let difficulty = 120;
let score = 0;
const canvas = document.getElementById("root");
const ctx = canvas.getContext("2d");
const appleImg = new Image();
appleImg.src = "apple.png";
appleImg.onload = function() { generateFood(); };
const snakeHead = new Image();
snakeHead.src = "snakeHead.png";
snakeHead.onload = function() { drawSnake(); };

startGame();
document.addEventListener("keydown", direction);

function startGame() {
    if (gameOver()) {
        document.getElementById("message").innerHTML = "Game over! Your score was " + score + ".";
        resetGame();
        return;
    }
    setTimeout(function () {
        clearCanvas();
        moveSnake();
        drawSnake();
        startGame();
    }, difficulty);
}

function generateFood() {
    do {
        xFood = Math.floor(Math.random() * 15) * 40;
        yFood = Math.floor(Math.random() * 15) * 40;
    } while (checkFoodCollision());
}

function direction(event) {
    const keyPressed = event.keyCode;
    switch (keyPressed) {
        case 37: //left
            if (previousDirection != 39) {
                dx = -40;
                dy = 0;
                previousDirection = 37;
            }
            break;
        case 38: //up
            if (previousDirection != 40) {
                dx = 0;
                dy = -40;
                previousDirection = 38;
            }
            break;
        case 39: //right
            if (previousDirection != 37) {
                dx = 40;
                dy = 0;
                previousDirection = 39;
            }
            break;
        case 40: //down
            if (previousDirection != 38) {
                dx = 0;
                dy = 40;
                previousDirection = 40;
            }
    }
}

function drawSnake() {
    snakeBody.forEach(drawSnakeSegment);
}

function drawSnakeSegment(snakeSegment) {
    ctx.drawImage(snakeHead, snakeSegment.x, snakeSegment.y, 40, 40);
}

function moveSnake() {
    const snakeHead = {x: snakeBody[0].x + dx, y: snakeBody[0].y + dy};
    snakeBody.unshift(snakeHead);
    if (!eatFood()) {
        snakeBody.pop();
    }
}

function eatFood() {
    if (snakeBody[0].x === xFood && snakeBody[0].y === yFood) {
        ++score;
        document.getElementById("message").innerHTML = score;
        generateFood();
        return true;
    }
    return false;
}

function gameOver() {
    for (let i = 3; i < snakeBody.length; ++i) {
        if (snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y) {
            return true;
        }
    }
    if (snakeBody[0].x < 0 || snakeBody[0].y < 0 || snakeBody[0].x > 560 || snakeBody[0].y > 560) {
        return true;
    }
    return false;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(appleImg, xFood, yFood, 40, 40);
}

function checkFoodCollision() {
    for (let i = 0; i < snakeBody.length; ++i) {
        if (snakeBody[i].x === xFood && snakeBody[i].y === yFood) {
            return false;
        }
    }
    return false;
}

function resetGame() {
    snakeBody = [{x: 120, y: 280}, {x: 160, y: 280}, {x: 200, y: 280}];
    dx = 40;
    dy = 0;
    score = 0;
    previousDirection = 39;
    startGame();
}
