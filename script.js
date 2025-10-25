const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const levelSelect = document.getElementById("levelSelect");
const levelBtns = document.querySelectorAll(".levelBtn");
const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");
const ball = document.getElementById("ball");
const scoreDisplay = document.getElementById("score");
const rankDisplay = document.getElementById("rank");

let score = 0;
let rank = "သင်ယူသူ";
let ballSkin = ["red", "blue", "yellow"];
let ballInterval;

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  levelSelect.classList.remove("hidden");
});

levelBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const level = btn.dataset.level;
    levelSelect.classList.add("hidden");
    gameArea.classList.remove("hidden");
    gameArea.style.backgroundImage = `url('images/court${level}.jpg')`;
    startGame();
  });
});

function startGame() {
  score = 0;
  updateRank();
  scoreDisplay.textContent = score;
  dropBall();
}

function updateRank() {
  if(score >= 20) rank = "ဆရာကြီး";
  else if(score >= 10) rank = "ကျွမ်းကျင်သူ";
  else if(score >= 5) rank = "သင်ယူသူ";
  else rank = "သင်ယူသူ";
  rankDisplay.textContent = rank;
}

function dropBall() {
  clearInterval(ballInterval);
  ball.style.top = "0px";
  ball.style.left = Math.random() * (window.innerWidth - 30) + "px";
  ball.style.background = ballSkin[Math.floor(Math.random() * ballSkin.length)];

  ballInterval = setInterval(() => {
    let top = parseInt(ball.style.top);
    if(top < gameArea.clientHeight - 50) {
      ball.style.top = top + 5 + "px";
    } else {
      ball.style.top = "0px";
      ball.style.left = Math.random() * (window.innerWidth - 30) + "px";
      ball.style.background = ballSkin[Math.floor(Math.random() * ballSkin.length)];
    }
  },50);
}

// Joystick Buttons
document.getElementById("moveLeft").addEventListener("click", moveLeft);
document.getElementById("moveRight").addEventListener("click", moveRight);
document.getElementById("shoot").addEventListener("click", shootBall);
document.getElementById("pass").addEventListener("click", passBall);

// Mobile touch swipe control
let touchStartX = 0;
gameArea.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

gameArea.addEventListener("touchmove", (e) => {
  let touchX = e.touches[0].clientX;
  let diff = touchX - touchStartX;
  let left = parseInt(player.style.left) || 200;
  player.style.left = Math.min(Math.max(left + diff, 0), window.innerWidth - 60) + "px";
  touchStartX = touchX;
});

function moveLeft() {
  let left = parseInt(player.style.left) || 200;
  player.style.left = Math.max(left - 20, 0) + "px";
}
function moveRight() {
  let left = parseInt(player.style.left) || 200;
  player.style.left = Math.min(left + 20, window.innerWidth - 60) + "px";
}
function shootBall() {
  score++;
  updateRank();
  scoreDisplay.textContent = score;
  dropBall();
}
function passBall() {
  score += 0.5;
  updateRank();
  scoreDisplay.textContent = score;
}
