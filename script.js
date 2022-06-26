var x = 0;
var dx = 4;

function headerSnake() {
    const canvas = document.getElementById("headerCanvas");
    const c = canvas.getContext("2d");
    const image = new Image();
    image.src = "snake.png";
    c.clearRect(0, 0, 700, 700);
    requestAnimationFrame(headerSnake);
    c.drawImage(image, x, 5, 120, 50);
    if (x > 570) {
        dx = 16;
        dx = -dx;
    } else if (x < 0) {
        dx = -dx;
        dx = 4;
    }
    x += dx;
}

function startGame() {
    
}
