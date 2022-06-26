var xHeaderSnake = 0;
var dxHeaderSnake = 4;
var start = 0;
//patrat = 40, 40*15 = 600 latura gameBoard

function headerSnake() {
    const canvas = document.getElementById("headerCanvas");
    const c = canvas.getContext("2d");
    const image = new Image();
    image.src = "snake.png";
    c.clearRect(0, 0, 400, 400);
    requestAnimationFrame(headerSnake);
    c.drawImage(image, xHeaderSnake, 5, 120, 50);
    if (xHeaderSnake > 270) {
        dxHeaderSnake = 16;
        dxHeaderSnake = -dxHeaderSnake;
    } else if (xHeaderSnake < 10) {
        dxHeaderSnake = -dxHeaderSnake;
        dxHeaderSnake = 3;
    }
    xHeaderSnake += dxHeaderSnake;
}

function startGame() {
    document.getElementById("message").innerHTML = "Press an arrow to start!";
    document.getElementById("start").innerHTML = "RESET";
    document.getElementById("start").onclick = function() { reset(); };
    const canvas = document.getElementById("root");
    const c = canvas.getContext("2d");
    c.fillStyle = "green";
    c.fillRect(120, 280, 80, 40);
    generateFood(c);
    start = 1;
}

function reset() {
    location.reload();
}

document.onkeydown = function(e) {
    e = e || window.event;
    var key = e.which || e.keyCode;
    if ((key === 37 || key === 38 || key === 39 || key === 40) && start === 1) {
        direction(key);
        document.getElementById("message").innerHTML = "";
    }
}

function direction(key) {
    alert(key + "was pressed");
}

function generateFood(c) {
    var xFood = Math.floor(Math.random() * 15) * 40;
    var yFood = Math.floor(Math.random() * 15) * 40;
    c.fillStyle = "red";
    c.fillRect(xFood, yFood, 40, 40);
}

/*function feedSnake() {
    
}

function gameOver() {
    
}*/

