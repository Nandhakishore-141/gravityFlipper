const game = document.getElementById("game");
const box = document.getElementById("box");

let x = 24;
let y = 16;
let vy = 0;
let gravity = 0.45;
const horizontalSpeed = 2.1;
const bounceLoss = 0.82;

function flipGravity() {
  gravity *= -1;
}

window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    flipGravity();
  }
});

game.addEventListener("click", flipGravity);

function tick() {
  const maxX = game.clientWidth - box.offsetWidth;
  const maxY = game.clientHeight - box.offsetHeight;

  x += horizontalSpeed;
  if (x > maxX) {
    x = -box.offsetWidth;
  }

  vy += gravity;
  y += vy;

  if (y <= 0) {
    y = 0;
    vy *= -bounceLoss;
  } else if (y >= maxY) {
    y = maxY;
    vy *= -bounceLoss;
  }

  box.style.transform = `translate(${x}px, ${y}px)`;
  requestAnimationFrame(tick);
}

tick();