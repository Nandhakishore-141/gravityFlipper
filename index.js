const game = document.getElementById("game");
const box = document.getElementById("box");
const spikesTopContainer = document.getElementById("spikesTop");
const spikesBottomContainer = document.getElementById("spikesBottom");

const boundaryOffset = 14;
const boundaryThickness = 4;
const gravityForce = 0.62;
const horizontalSpeed = 2.4;
const cameraFollowX = 260;
const spikeGapMin = 380;
const spikeGapMax = 560;
const spikeStartX = 620;
const totalInitialSpikes = 36;

let playerX = 32;
let y = 0;
let vy = 0;
let gravity = gravityForce;
let minY = 0;
let maxY = 0;
let gameWidth = 0;
let gameHeight = 0;
let boxWidth = 0;
let boxHeight = 0;
let hitUntil = 0;
let cameraX = 0;
let farthestSpikeX = spikeStartX;

const spikeSizeChoices = [
  { width: 30, height: 30 },
  { width: 34, height: 36 },
  { width: 32, height: 34 },
  { width: 36, height: 38 }
];

const topSpikes = [];
const bottomSpikes = [];

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomSize() {
  return spikeSizeChoices[randInt(0, spikeSizeChoices.length - 1)];
}

function createSpike(container, side, x) {
  const size = randomSize();
  const el = document.createElement("div");
  el.className = "spike";
  el.style.width = `${size.width}px`;
  el.style.height = `${size.height}px`;
  container.appendChild(el);

  return {
    side,
    x,
    width: size.width,
    height: size.height,
    el
  };
}

function addSpikePairGroup() {
  farthestSpikeX += randInt(spikeGapMin, spikeGapMax);
  const chooseTop = Math.random() > 0.5;

  if (chooseTop) {
    topSpikes.push(createSpike(spikesTopContainer, "top", farthestSpikeX));
    if (Math.random() > 0.45) {
      bottomSpikes.push(createSpike(spikesBottomContainer, "bottom", farthestSpikeX + randInt(120, 190)));
    }
  } else {
    bottomSpikes.push(createSpike(spikesBottomContainer, "bottom", farthestSpikeX));
    if (Math.random() > 0.45) {
      topSpikes.push(createSpike(spikesTopContainer, "top", farthestSpikeX + randInt(120, 190)));
    }
  }
}

function seedSpikes() {
  for (let i = 0; i < totalInitialSpikes; i += 1) {
    addSpikePairGroup();
  }
}

function updateMeasurements() {
  gameWidth = game.clientWidth;
  gameHeight = game.clientHeight;
  boxWidth = box.offsetWidth;
  boxHeight = box.offsetHeight;
  minY = boundaryOffset + boundaryThickness;
  maxY = gameHeight - boundaryOffset - boundaryThickness - boxHeight;

  if (y < minY) {
    y = minY;
    vy = 0;
  }
  if (y > maxY) {
    y = maxY;
    vy = 0;
  }
}

function resetPlayer() {
  playerX = 32;
  y = maxY;
  vy = 0;
  gravity = gravityForce;
  cameraX = 0;
}

function killPlayer(now) {
  resetPlayer();
  hitUntil = now + 180;
  box.classList.add("hit");
}

function intersectsRect(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function checkSpikeCollision(list, side, playerRect) {
  const baseTop = boundaryOffset;
  const baseBottom = gameHeight - boundaryOffset;

  for (const spike of list) {
    const rect =
      side === "top"
        ? {
            left: spike.x,
            right: spike.x + spike.width,
            top: baseTop,
            bottom: baseTop + spike.height
          }
        : {
            left: spike.x,
            right: spike.x + spike.width,
            top: baseBottom - spike.height,
            bottom: baseBottom
          };

    if (intersectsRect(playerRect, rect)) {
      return true;
    }
  }

  return false;
}

function isCollidingWithSpikes() {
  const playerRect = {
    left: playerX,
    right: playerX + boxWidth,
    top: y,
    bottom: y + boxHeight
  };

  return checkSpikeCollision(bottomSpikes, "bottom", playerRect) || checkSpikeCollision(topSpikes, "top", playerRect);
}

function updateSpikeRendering() {
  const leftBound = cameraX - 80;
  const rightBound = cameraX + gameWidth + 80;

  for (const spike of bottomSpikes) {
    const screenX = spike.x - cameraX;
    spike.el.style.left = `${screenX}px`;
    spike.el.style.bottom = `${boundaryOffset}px`;
    spike.el.style.display = spike.x + spike.width < leftBound || spike.x > rightBound ? "none" : "block";
  }

  for (const spike of topSpikes) {
    const screenX = spike.x - cameraX;
    spike.el.style.left = `${screenX}px`;
    spike.el.style.top = `${boundaryOffset}px`;
    spike.el.style.display = spike.x + spike.width < leftBound || spike.x > rightBound ? "none" : "block";
  }
}

function ensureFutureSpikes() {
  while (farthestSpikeX < playerX + gameWidth * 3) {
    addSpikePairGroup();
  }
}

window.addEventListener("resize", updateMeasurements);
window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    gravity *= -1;
  }
});

function tick(now) {
  playerX += horizontalSpeed;

  vy += gravity;
  y += vy;

  if (y <= minY) {
    y = minY;
    vy = 0;
  } else if (y >= maxY) {
    y = maxY;
    vy = 0;
  }

  cameraX = Math.max(0, playerX - cameraFollowX);

  if (hitUntil > 0 && now >= hitUntil) {
    hitUntil = 0;
    box.classList.remove("hit");
  }

  if (hitUntil === 0 && isCollidingWithSpikes()) {
    killPlayer(now);
  }

  ensureFutureSpikes();
  updateSpikeRendering();

  box.style.transform = `translate(${playerX - cameraX}px, ${y}px)`;
  requestAnimationFrame(tick);
}

seedSpikes();
updateMeasurements();
resetPlayer();
requestAnimationFrame(tick);
