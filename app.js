let canvas;
let canvasContext;
let ballX = 50;
let ballSpeedX = 10;
let ballY = 50;
let ballSpeedY = 5;

let player1Score = 0;
let player2Score = 0;
const WINNING_SCORE = 3;

let paddle1Y = 250;
let paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

let showingWinScreen = false;


// Functie pentru controlarea mouse-ului
function calculateMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };
}
function handleMouseClick(evt) {
    if (showingWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    }
}

window.onload = function () {

    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");


    let framesPerSecond = 30;
    setInterval(callBoth, 1000 / framesPerSecond);

    canvas.addEventListener("mousedown", handleMouseClick);

    // Aici este adaugat evenimentul pentru a sincroniza jucatorul din stanga cu mouse ul;
    canvas.addEventListener('mousemove', function (evt) {
        let mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);

    });
}


function callBoth() {
    moveEverything();
    drawEverything();
}

// Functie pentru jucatorul din dreapta
function computerMovement() {
    let paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
    if (paddle2YCenter < ballY - 35)
        paddle2Y += 6;
    else if (paddle2YCenter > ballY + 35)
        paddle2Y -= 6;

}

//Functie pentru movementul jocului
function moveEverything() {
    if (showingWinScreen)
        return;
    computerMovement();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Lovirea canvasului si resetul
    if (ballX < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;
        }
        else {
            player2Score++;
            ballReset();

        }
    }
    if (ballX > canvas.width) {
        if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            let deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;
        }
        else {
            player1Score++;
            ballReset();
        }

    }


    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}
function drawNet() {
    for (let i = 0; i < canvas.height; i += 40) {
        colorRect(canvas.width / 2 -1, i, 2, 20, 'black');
    }
}


function drawEverything() {
    //Canvas 
    colorRect(0, 0, canvas.width, canvas.height, "#A9B2C3");

    if (showingWinScreen) {

        canvasContext.fillStyle = 'Black';
        if (player1Score >= WINNING_SCORE) {
            canvasContext.fillText("PLAYER 1 WON", 350, 250);
        }
        else if (player2Score >= WINNING_SCORE) {
            canvasContext.fillText("PLAYER 2 WON", 350, 250);

        }
        canvasContext.fillStyle = 'Black';
        canvasContext.fillText("CLICK TO CONTINUE THE GAME", 350, 500);
        return;
    }
    drawNet();


    //Jucator Stanga
    colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "#00BFFF");

    //Jucator Dreapta
    colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "	#F7E7CE");

    //Bila
    colorCircle(ballX, ballY, 10, "#58111A")

    //Scor
    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width - 100, 100);
}

//Functie pentru colorarea obiectelor
function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

//Functie pentru bila
function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

//Functie pentru resetarea bilei
function ballReset() {
    if ((player1Score >= WINNING_SCORE) || (player2Score >= WINNING_SCORE)) {

        showingWinScreen = true;

    }

    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}
