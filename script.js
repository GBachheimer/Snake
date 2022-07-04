var xHeaderSnake = 0;
var dxHeaderSnake = 4;

function headerSnake() {
    const canv = document.getElementById("headerCanvas");
    const cax = canv.getContext("2d");
    const image = new Image();
    image.src = "snake.png";
    cax.clearRect(0, 0, 400, 400);
    requestAnimationFrame(headerSnake);
    cax.drawImage(image, xHeaderSnake, 5, 120, 50);
    if (xHeaderSnake > 270) {
        dxHeaderSnake = 16;
        dxHeaderSnake = -dxHeaderSnake;
    } else if (xHeaderSnake < 10) {
        dxHeaderSnake = -dxHeaderSnake;
        dxHeaderSnake = 3;
    }
    xHeaderSnake += dxHeaderSnake;
}

var headPosition = [160, 280];
var gridSize = 40;
var direction = 1;
let time;

function drawSquare() {
    const canvas = document.getElementById("root");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = '#35a255';
    drawSnake(ctx);
    time = setInterval(moveSnake, 100);
}

document.onkeydown = function(event) {
    var keyCode = window.event.keyCode;
    switch (keyCode) {
            case 37: //left
                direction = 3;
                break;
            case 38: //up
                direction = 2;
                break;
            case 39: //right
                direction = 1;
                break;
            case 40: //down
                direction = 4;
                break;
            default:
                break;
    }
    moveSnake();
}

function drawSnake(ctx) {
    ctx.fillRect(headPosition[0], headPosition[1], gridSize, gridSize);
}

function moveSnake() {
    const canvas = document.getElementById("root");
    const ctx = canvas.getContext("2d");
    switch (direction) {
            case 3: //left
                headPosition[0] = headPosition[0] - gridSize;
                drawSnake(ctx);
                break;
            case 2: //up
                headPosition[1] = headPosition[1] - gridSize;
                drawSnake(ctx);
                break;
            case 1: //right
                headPosition[0] = headPosition[0] + gridSize;
                drawSnake(ctx);
                break;
            case 4: //down
                headPosition[1] = headPosition[1] + gridSize;
                drawSnake(ctx);
                break;
            default:
                break;
    }
    checkWalls();
}

function checkWalls() {
    if (headPosition[0] === -40 || headPosition[0] === 600 || headPosition[1] === -40 || headPosition[1] === 600) {
        alert("Game Over!");
    }
}
