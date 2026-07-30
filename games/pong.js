const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let x = 20;
let y = 300;
let fps = 60;
let speedX = 5;
let speedY = 8;
let radius = 20;
let directionX = 1;
let directionY = 1;

const paddleX = 350;
let paddleY = 100;
let paddleWidth = 4;
let paddleHeight = 100;

let score = 0;
let lives = 3;
let oldTime = (new Date()).getTime();
let gameOver = false;

function movePaddle(mouseEvent) {
    let canvasRect = canvas.getBoundingClientRect();
    paddleY = mouseEvent.clientY - canvasRect.y;
    if (paddleY > canvas.height) {
        paddleY = canvas.height;
    }
    if (paddleY < 0) {
        paddleY = 0;
    }
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    drawBall();
    drawPaddle();
    drawScoreboard();
}

function drawBall() {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0 , 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}

function drawPaddle() {
    ctx.fillStyle = "red";
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}

function drawScoreboard() {
    ctx.fillStyle = "white";
    ctx.font = "24px Times New Roman";
    ctx.fillText("Score: " + score, 5, 25);
    ctx.fillText("Lives: " + lives, 5, 50);
}

function update() {
    if (!gameOver) {
        x = x + speedX * directionX;
        if (x + radius >= paddleX && x - radius <= paddleX + paddleWidth) { //TO DO: bottom of paddle should go down and top should go up
            if (y >= paddleY && y <= paddleY + paddleHeight) {
                directionX = -1;
                let time = (new Date()).getTime();
                if (time - oldTime > 1000) {
                    score += 1;
                }
                oldTime = (new Date()).getTime();

                if (y <= paddleY + paddleHeight - (paddleHeight * .66666666)) {
                    directionY = -1;
                } else if (y >= paddleY + paddleHeight - (paddleHeight * .33333333)) {
                    directionY = 1;
                }
            }
        }

        if (x + radius >= canvas.width) {
            lives -= 1;
            if (lives < 1) {
                x = 1000;
                y = 1000;
                alert("Game Over.");
                window.location = "savescore.php?score=" + score;
                gameOver = true;
            } else {
                x = 20;
                y = 300;
            }
        }

        if (x - radius <= 0) {
            directionX = 1;
        }

        y = y + speedY * directionY;
        if (y + radius >= canvas.height) {
            directionY = -1;
        }
        if (y - radius <= 0) {
            directionY = 1;
        }
    }
}

function animate() {
    clear();
    draw();
    update();
}

animate();
window.setInterval(animate, 1000 / fps);