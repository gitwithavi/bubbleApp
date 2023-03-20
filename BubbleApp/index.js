const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Circle properties
const circleRadius = 80;
const circleX = 100;
const circleY = canvas.height / 2;
const linewidth = 10;
let circleColor = getRandomColor();

// Arrow properties
const arrowLength = 60;
const arrowWidth = 20;
const arrowColor = "black";
let arrowAngle = -180; // in degrees
let arrowX = canvas.width - arrowLength;
let arrowY = circleY;

// Animation properties
let arrowSpeed = 5;
let isArrowMoving = false;

function drawCircle() {
  ctx.beginPath();
  ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
  ctx.fillStyle = circleColor;
  ctx.fill();
  ctx.closePath();
}

function drawArrow() {
  ctx.translate(arrowX, arrowY);
  ctx.rotate((arrowAngle * Math.PI) / 180);
  ctx.beginPath();
  ctx.moveTo(0, -arrowWidth / 2);
  ctx.lineTo(arrowLength, 0);
  ctx.lineTo(0, arrowWidth / 2);
  ctx.fillStyle = arrowColor;
  ctx.fill();
  ctx.closePath();
  ctx.rotate((-arrowAngle * Math.PI) / 180);
  ctx.translate(-arrowX, -arrowY);
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function moveArrow() {
  if (arrowX > circleX + circleRadius) {
    arrowX -= arrowSpeed;
  } else if (arrowX <= circleX + circleRadius) {
    isArrowMoving = false;
    circleColor = getRandomColor();
  }
}

function update() {
  if (isArrowMoving) {
    moveArrow();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle();
  drawArrow();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

function startGame() {
  isArrowMoving = true;
}

function reset() {
  circleColor = getRandomColor();
  arrowX = canvas.width - arrowLength;
  isArrowMoving = false;
}

loop();
