// ==================== DOM ELEMENTS ====================
const bgParticles = document.getElementById("bgParticles");
const menuScreen = document.getElementById("menuScreen");
const levelScreen = document.getElementById("levelScreen");
const settingsScreen = document.getElementById("settingsScreen");
const gameScreen = document.getElementById("gameScreen");
const game = document.getElementById("game");
const boxWrap = document.getElementById("boxWrap");
const box = document.getElementById("box");
const spikesTopContainer = document.getElementById("spikesTop");
const spikesBottomContainer = document.getElementById("spikesBottom");
const wallsContainer = document.getElementById("walls");
const collectiblesContainer = document.getElementById("collectibles");
const powerupsContainer = document.getElementById("powerups");

// HUD Elements
const scoreDisplay = document.getElementById("scoreDisplay");
const currentLevelDisplay = document.getElementById("currentLevel");
const comboDisplay = document.getElementById("comboDisplay");
const comboValue = document.getElementById("comboValue");
const progressFill = document.getElementById("progressFill");
const speedBarFill = document.getElementById("speedBarFill");
const speedValue = document.getElementById("speedValue");
const distanceDisplay = document.getElementById("distanceDisplay");
const powerupActive = document.getElementById("powerupActive");
const powerupIcon = document.getElementById("powerupIcon");
const powerupTimer = document.getElementById("powerupTimer");
const gameMessage = document.getElementById("gameMessage");
const messageText = document.getElementById("messageText");

// Menu Elements
const menuHighScore = document.getElementById("menuHighScore");
const totalDistanceDisplay = document.getElementById("totalDistance");
const settingsBtn = document.getElementById("settingsBtn");
const settingsBackBtn = document.getElementById("settingsBackBtn");
const levelGrid = document.getElementById("levelGrid");

// Settings Elements
const soundToggle = document.getElementById("soundToggle");
const musicToggle = document.getElementById("musicToggle");
const particlesToggle = document.getElementById("particlesToggle");
const shakeToggle = document.getElementById("shakeToggle");
const resetBtn = document.getElementById("resetBtn");

// Overlay Elements
const pauseOverlay = document.getElementById("pauseOverlay");
const gameOverOverlay = document.getElementById("gameOverOverlay");
const levelCompleteOverlay = document.getElementById("levelCompleteOverlay");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const restartBtn = document.getElementById("restartBtn");
const quitBtn = document.getElementById("quitBtn");
const retryBtn = document.getElementById("retryBtn");
const menuBtn = document.getElementById("menuBtn");
const nextLevelBtn = document.getElementById("nextLevelBtn");
const replayBtn = document.getElementById("replayBtn");
const lcMenuBtn = document.getElementById("lcMenuBtn");
const pauseScore = document.getElementById("pauseScore");
const pauseLevel = document.getElementById("pauseLevel");
const finalScore = document.getElementById("finalScore");
const finalDistance = document.getElementById("finalDistance");
const bestScore = document.getElementById("bestScore");
const lcScore = document.getElementById("lcScore");
const lcDistance = document.getElementById("lcDistance");
const lcTime = document.getElementById("lcTime");

// ==================== GAME CONSTANTS ====================
const boundaryOffset = 14;
const boundaryThickness = 4;
const baseGravityForce = 0.62;
const cameraFollowX = 260;
const boxSize = 42;

// ==================== LEVEL DEFINITIONS ====================
const LEVELS = [
  { id: 1, name: "Beginner", distance: 1500, minSpeed: 3.9, maxSpeed: 6.5, spikeGapMin: 450, spikeGapMax: 600, wallGapMin: 1200, wallGapMax: 1600, targetScore: 15, star1: 8, star2: 12, star3: 15, hasWalls: false, hasPowerups: false, hasCollectibles: true, collectibleRate: 0.3 },
  { id: 2, name: "Easy", distance: 1500, minSpeed: 4.16, maxSpeed: 7.15, spikeGapMin: 420, spikeGapMax: 560, wallGapMin: 1100, wallGapMax: 1500, targetScore: 20, star1: 10, star2: 16, star3: 20, hasWalls: true, hasPowerups: false, hasCollectibles: true, collectibleRate: 0.35 },
  { id: 3, name: "Warming Up", distance: 1500, minSpeed: 4.42, maxSpeed: 7.8, spikeGapMin: 400, spikeGapMax: 540, wallGapMin: 1050, wallGapMax: 1400, targetScore: 25, star1: 12, star2: 20, star3: 25, hasWalls: true, hasPowerups: true, hasCollectibles: true, collectibleRate: 0.4 },
  { id: 4, name: "Getting Tricky", distance: 1500, minSpeed: 4.68, maxSpeed: 8.45, spikeGapMin: 380, spikeGapMax: 520, wallGapMin: 1000, wallGapMax: 1350, targetScore: 30, star1: 15, star2: 24, star3: 30, hasWalls: true, hasPowerups: true, hasCollectibles: true, collectibleRate: 0.4 },
  { id: 5, name: "Speedy", distance: 1500, minSpeed: 4.94, maxSpeed: 9.1, spikeGapMin: 360, spikeGapMax: 500, wallGapMin: 950, wallGapMax: 1300, targetScore: 35, star1: 18, star2: 28, star3: 35, hasWalls: true, hasPowerups: true, hasCollectibles: true, collectibleRate: 0.45 },
  { id: 6, name: "Intense", distance: 1500, minSpeed: 5.2, maxSpeed: 9.75, spikeGapMin: 340, spikeGapMax: 480, wallGapMin: 900, wallGapMax: 1250, targetScore: 40, star1: 20, star2: 32, star3: 40, hasWalls: true, hasPowerups: true, hasCollectibles: true, collectibleRate: 0.45 },
  { id: 7, name: "Challenging", distance: 1500, minSpeed: 5.46, maxSpeed: 10.4, spikeGapMin: 320, spikeGapMax: 460, wallGapMin: 850, wallGapMax: 1200, targetScore: 45, star1: 22, star2: 36, star3: 45, hasWalls: true, hasPowerups: true, hasCollectibles: true, collectibleRate: 0.5 },
  { id: 8, name: "Hard", distance: 1500, minSpeed: 5.72, maxSpeed: 11.05, spikeGapMin: 300, spikeGapMax: 440, wallGapMin: 800, wallGapMax: 1150, targetScore: 50, star1: 25, star2: 40, star3: 50, hasWalls: true, hasPowerups: true, hasCollectibles: true, collectibleRate: 0.5 },
  { id: 9, name: "Expert", distance: 1500, minSpeed: 5.98, maxSpeed: 11.7, spikeGapMin: 280, spikeGapMax: 420, wallGapMin: 750, wallGapMax: 1100, targetScore: 60, star1: 30, star2: 48, star3: 60, hasWalls: true, hasPowerups: true, hasCollectibles: true, collectibleRate: 0.55 },
  { id: 10, name: "Master", distance: 1500, minSpeed: 6.5, maxSpeed: 13.0, spikeGapMin: 260, spikeGapMax: 400, wallGapMin: 700, wallGapMax: 1000, targetScore: 75, star1: 35, star2: 60, star3: 75, hasWalls: true, hasPowerups: true, hasCollectibles: true, collectibleRate: 0.6 },
  { id: 11, name: "Insane", distance: 1500, minSpeed: 7.15, maxSpeed: 14.3, spikeGapMin: 240, spikeGapMax: 380, wallGapMin: 650, wallGapMax: 950, targetScore: 90, star1: 40, star2: 72, star3: 90, hasWalls: true, hasPowerups: true, hasCollectibles: true, collectibleRate: 0.6 },
  { id: 12, name: "Impossible", distance: 1500, minSpeed: 7.8, maxSpeed: 15.6, spikeGapMin: 220, spikeGapMax: 360, wallGapMin: 600, wallGapMax: 900, targetScore: 100, star1: 50, star2: 80, star3: 100, hasWalls: true, hasPowerups: true, hasCollectibles: true, collectibleRate: 0.65 }
];

// ==================== GAME STATE ======================================
let gameState = {
  currentScreen: 'levels',
  currentLevel: 1,
  score: 0,
  highScore: 0,
  totalDistance: 0,
  levelCompleted: {},
  unlockedLevels: [1],
  settings: {
    sound: true,
    music: true,
    particles: true,
    screenShake: true
  }
};

// ==================== GAME VARIABLES ====================
let playerX = 32;
let y = 0;
let vy = 0;
let gravity = baseGravityForce;
let currentHorizontalSpeed = 3.0;
let score = 0;
let minY = 0;
let maxY = 0;
let gameWidth = 0;
let gameHeight = 0;
let boxWidth = boxSize;
let boxHeight = boxSize;
let hitUntil = 0;
let cameraX = 0;
let farthestSpikeX = 620;
let farthestWallX = 1500;
let farthestCollectibleX = 400;
let farthestPowerupX = 2000;
let lastTime = 0;
let flipped = false;
let runElapsedMs = 0;
let isPaused = false;
let isGameRunning = false;
let combo = 0;
let comboTimeout = null;
let levelStartTime = 0;
let currentDistance = 0;

// Powerup state
let activePowerup = null;
let powerupEndTime = 0;
let isShielded = false;
let isSlowMotion = false;
let isMagnet = false;

const spikeSizeChoices = [
  { width: 30, height: 30 },
  { width: 34, height: 36 },
  { width: 32, height: 34 },
  { width: 36, height: 38 }
];

const wallSizeChoices = [
  { width: 18, height: 90 },
  { width: 20, height: 105 },
  { width: 22, height: 120 }
];

const powerupTypes = ['shield', 'slow', 'magnet'];

const topSpikes = [];
const bottomSpikes = [];
const walls = [];
const collectibles = [];
const powerups = [];

// ==================== UTILITY FUNCTIONS ====================
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFrom(list) {
  return list[randInt(0, list.length - 1)];
}

function randomSpikeSize() {
  return randomFrom(spikeSizeChoices);
}

function randomWallSize() {
  return randomFrom(wallSizeChoices);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// ==================== SAVE/LOAD ====================
function saveGameState() {
  localStorage.setItem('gravityFlipperSave', JSON.stringify(gameState));
}

function loadGameState() {
  const saved = localStorage.getItem('gravityFlipperSave');
  if (saved) {
    const parsed = JSON.parse(saved);
    gameState = { ...gameState, ...parsed };
  }
  updateHomeStats();
  renderLevelGrid();
}

function resetProgress() {
  gameState = {
    currentScreen: 'levels',
    currentLevel: 1,
    score: 0,
    highScore: 0,
    totalDistance: 0,
    levelCompleted: {},
    unlockedLevels: [1],
    settings: {
      sound: true,
      music: true,
      particles: true,
      screenShake: true
    }
  };
  saveGameState();
  updateHomeStats();
  renderLevelGrid();
  updateSettingsUI();
}

// ==================== BACKGROUND PARTICLES ====================
function createBackgroundParticles() {
  if (!gameState.settings.particles) return;
  
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      createParticle();
    }, i * 500);
  }
}

function createParticle() {
  if (!gameState.settings.particles) return;
  
  const particle = document.createElement('div');
  particle.className = 'bg-particle';
  const size = randInt(2, 6);
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  particle.style.left = randInt(0, 100) + '%';
  particle.style.animationDuration = randInt(8, 15) + 's';
  particle.style.animationDelay = '0s';
  bgParticles.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
    createParticle();
  }, parseInt(particle.style.animationDuration) * 1000);
}

// ==================== SCREEN MANAGEMENT ====================
function showScreen(screenName) {
  levelScreen.classList.remove('active');
  settingsScreen.classList.remove('active');
  gameScreen.classList.remove('active');
  
  gameState.currentScreen = screenName;
  
  switch(screenName) {
    case 'levels':
      levelScreen.classList.add('active');
      updateHomeStats();
      renderLevelGrid();
      break;
    case 'settings':
      settingsScreen.classList.add('active');
      updateSettingsUI();
      break;
    case 'game':
      gameScreen.classList.add('active');
      break;
  }
}

function updateHomeStats() {
  menuHighScore.textContent = gameState.highScore;
  totalDistanceDisplay.textContent = Math.floor(gameState.totalDistance) + 'm';
}

function renderLevelGrid() {
  levelGrid.innerHTML = '';
  
  LEVELS.forEach(level => {
    const card = document.createElement('div');
    card.className = 'level-card';
    
    const isCompleted = gameState.levelCompleted[level.id] || false;
    // A level is unlocked if it's in unlockedLevels OR if it's been completed
    const isUnlocked = gameState.unlockedLevels.includes(level.id) || isCompleted;
    const isCurrent = level.id === Math.max(...gameState.unlockedLevels);
    
    if (!isUnlocked) {
      card.classList.add('locked');
      card.innerHTML = `<span class="level-lock">🔒</span>`;
    } else {
      if (isCompleted) {
        card.classList.add('completed');
      } else if (isCurrent) {
        card.classList.add('current');
      }
      
      card.innerHTML = `
        <span class="level-number">${level.id}</span>
        <span class="level-name">${level.name}</span>
        ${isCompleted ? '<span class="level-check">✓</span>' : ''}
      `;
      
      // Add both click and touch support for level selection
      const handleLevelSelect = (e) => {
        e.preventDefault();
        e.stopPropagation();
        startLevel(level.id);
      };
      card.addEventListener('click', handleLevelSelect);
      card.addEventListener('touchend', handleLevelSelect);
    }
    
    levelGrid.appendChild(card);
  });
}

function updateSettingsUI() {
  soundToggle.classList.toggle('active', gameState.settings.sound);
  soundToggle.textContent = gameState.settings.sound ? 'ON' : 'OFF';
  
  musicToggle.classList.toggle('active', gameState.settings.music);
  musicToggle.textContent = gameState.settings.music ? 'ON' : 'OFF';
  
  particlesToggle.classList.toggle('active', gameState.settings.particles);
  particlesToggle.textContent = gameState.settings.particles ? 'ON' : 'OFF';
  
  shakeToggle.classList.toggle('active', gameState.settings.screenShake);
  shakeToggle.textContent = gameState.settings.screenShake ? 'ON' : 'OFF';
}

// ==================== GAME INITIALIZATION ====================
function startLevel(levelId) {
  gameState.currentLevel = levelId;
  showScreen('game');
  initWorld();
  isPaused = false;
  isGameRunning = true;
  lastTime = 0;
  levelStartTime = performance.now();
  requestAnimationFrame(loop);
}

function startEndlessMode() {
  gameState.currentLevel = 1;
  showScreen('game');
  initWorld();
  isPaused = false;
  isGameRunning = true;
  lastTime = 0;
  levelStartTime = performance.now();
  requestAnimationFrame(loop);
}

function resizeGame() {
  const gameRect = game.getBoundingClientRect();
  gameWidth = gameRect.width;
  gameHeight = gameRect.height;
  boxWidth = boxSize;
  boxHeight = boxSize;

  minY = boundaryOffset + boundaryThickness;
  maxY = gameHeight - boundaryOffset - boundaryThickness - boxHeight;

  if (y < minY || y > maxY || y === 0) {
    y = (minY + maxY) / 2;
  }
}

function initWorld() {
  resizeGame();
  
  const level = LEVELS[gameState.currentLevel - 1];

  spikesTopContainer.innerHTML = "";
  spikesBottomContainer.innerHTML = "";
  wallsContainer.innerHTML = "";
  collectiblesContainer.innerHTML = "";
  powerupsContainer.innerHTML = "";
  topSpikes.length = 0;
  bottomSpikes.length = 0;
  walls.length = 0;
  collectibles.length = 0;
  powerups.length = 0;

  farthestSpikeX = 620 - randInt(120, 240);
  for (let i = 0; i < 36; i++) {
    addSpikePairGroup();
  }

  if (level.hasWalls) {
    farthestWallX = 1500 - randInt(220, 340);
    for (let i = 0; i < 8; i++) {
      addWallGroup();
    }
  }

  if (level.hasCollectibles) {
    farthestCollectibleX = 300;
    for (let i = 0; i < 15; i++) {
      addCollectible();
    }
  }

  if (level.hasPowerups) {
    farthestPowerupX = 2000;
    for (let i = 0; i < 3; i++) {
      addPowerup();
    }
  }

  cameraX = 0;
  y = (minY + maxY) / 2;
  vy = 0;
  gravity = baseGravityForce;
  score = 0;
  runElapsedMs = 0;
  currentHorizontalSpeed = level.minSpeed;
  flipped = false;
  combo = 0;
  currentDistance = 0;
  activePowerup = null;
  isShielded = false;
  isSlowMotion = false;
  isMagnet = false;
  
  updateScore();
  updateLevelDisplay();
  updateDistance();
  updateProgress();
  updateSpeedDisplay();
  hideCombo();
  hidePowerupIndicator();
  hideMessage();
  
  box.className = 'box';
  box.style.transform = 'rotate(0deg)';
}

// ==================== SPIKE MANAGEMENT ====================
function applySpikeSize(spike, side) {
  const size = randomSpikeSize();
  spike.width = size.width;
  spike.height = size.height;
  spike.side = side;
  spike.el.style.width = size.width + "px";
  spike.el.style.height = size.height + "px";
}

function createSpike(container, side, x) {
  const el = document.createElement("div");
  el.className = "spike";
  container.appendChild(el);

  const spike = {
    side,
    x,
    width: 30,
    height: 30,
    passed: false,
    el
  };

  applySpikeSize(spike, side);
  return spike;
}

let spikeAlternate = true; // Alternates between top and bottom spikes

function addSpikePairGroup() {
  const level = LEVELS[gameState.currentLevel - 1];
  farthestSpikeX += randInt(level.spikeGapMin, level.spikeGapMax);
  const jitter = randInt(-24, 24);
  const groupX = farthestSpikeX + jitter;
  
  // Alternate spikes - don't place both top and bottom at same X
  // One side gets the spike, other side is offset or skipped
  spikeAlternate = !spikeAlternate;
  
  const topX = spikeAlternate ? groupX : groupX + randInt(80, 150);
  const bottomX = spikeAlternate ? groupX + randInt(80, 150) : groupX;
  
  const top = createSpike(spikesTopContainer, "top", topX);
  const bottom = createSpike(spikesBottomContainer, "bottom", bottomX);
  topSpikes.push(top);
  bottomSpikes.push(bottom);
}

// Removed syncTopBottomPosition - spikes are now independent

function recycleSpikes() {
  const level = LEVELS[gameState.currentLevel - 1];
  const offscreenLeft = cameraX - 140;

  // Recycle top spikes
  for (let i = 0; i < topSpikes.length; i++) {
    const top = topSpikes[i];

    if (top.x < offscreenLeft) {
      farthestSpikeX += randInt(level.spikeGapMin, level.spikeGapMax);
      const jitter = randInt(-20, 20);
      spikeAlternate = !spikeAlternate;
      top.x = spikeAlternate ? farthestSpikeX + jitter : farthestSpikeX + jitter + randInt(80, 150);
      applySpikeSize(top, "top");
      top.passed = false;
    }

    if (!top.passed && top.x + top.width < cameraX + playerX) {
      top.passed = true;
      addScore(1);
    }
  }

  // Recycle bottom spikes independently
  for (let i = 0; i < bottomSpikes.length; i++) {
    const bottom = bottomSpikes[i];

    if (bottom.x < offscreenLeft) {
      const offsetX = randInt(level.spikeGapMin / 2, level.spikeGapMax / 2);
      bottom.x = topSpikes[i].x + randInt(60, 140);
      applySpikeSize(bottom, "bottom");
    }
  }
}

// ==================== WALL MANAGEMENT ====================
function createWall(x) {
  const size = randomWallSize();
  const el = document.createElement("div");
  el.className = "wall";
  el.style.width = size.width + "px";
  el.style.height = size.height + "px";
  wallsContainer.appendChild(el);

  // Wall sticks to ceiling (top) or floor (bottom)
  const isTop = Math.random() > 0.5;
  return {
    x,
    width: size.width,
    height: size.height,
    isTop: isTop,
    y: isTop ? minY : maxY - size.height,
    el
  };
}

function addWallGroup() {
  const level = LEVELS[gameState.currentLevel - 1];
  farthestWallX += randInt(level.wallGapMin, level.wallGapMax);
  walls.push(createWall(farthestWallX));
}

function recycleWalls() {
  const level = LEVELS[gameState.currentLevel - 1];
  if (!level.hasWalls) return;
  
  const offscreenLeft = cameraX - 200;

  for (let i = 0; i < walls.length; i++) {
    const wall = walls[i];

    if (wall.x < offscreenLeft) {
      farthestWallX += randInt(level.wallGapMin, level.wallGapMax);
      const size = randomWallSize();
      wall.x = farthestWallX;
      wall.width = size.width;
      wall.height = size.height;
      wall.isTop = Math.random() > 0.5;
      wall.el.style.width = size.width + "px";
      wall.el.style.height = size.height + "px";
    }

    // Wall sticks to ceiling or floor
    wall.y = wall.isTop ? minY : maxY - wall.height;
  }
}

// ==================== COLLECTIBLE MANAGEMENT ====================
function createCollectible(x) {
  const el = document.createElement("div");
  const isGem = Math.random() > 0.5;
  el.className = `collectible ${isGem ? 'gem' : 'coin'}`;
  collectiblesContainer.appendChild(el);

  return {
    x,
    y: randInt(minY + 40, maxY - 40),
    width: 24,
    height: 24,
    collected: false,
    value: isGem ? 3 : 1,
    el
  };
}

function addCollectible() {
  const level = LEVELS[gameState.currentLevel - 1];
  if (Math.random() > level.collectibleRate) {
    farthestCollectibleX += randInt(200, 400);
    return;
  }
  farthestCollectibleX += randInt(150, 350);
  collectibles.push(createCollectible(farthestCollectibleX));
}

function recycleCollectibles() {
  const level = LEVELS[gameState.currentLevel - 1];
  if (!level.hasCollectibles) return;
  
  const offscreenLeft = cameraX - 100;

  for (let i = collectibles.length - 1; i >= 0; i--) {
    const c = collectibles[i];
    
    if (c.collected || c.x < offscreenLeft) {
      c.el.remove();
      collectibles.splice(i, 1);
      addCollectible();
    }
  }
}

// ==================== POWERUP MANAGEMENT ====================
function createPowerup(x) {
  const type = randomFrom(powerupTypes);
  const el = document.createElement("div");
  el.className = `powerup ${type}`;
  
  const icons = { shield: '🛡', slow: '⏱', magnet: '🧲' };
  el.textContent = icons[type];
  powerupsContainer.appendChild(el);

  return {
    x,
    y: randInt(minY + 60, maxY - 60),
    width: 36,
    height: 36,
    collected: false,
    type,
    el
  };
}

function addPowerup() {
  farthestPowerupX += randInt(1500, 2500);
  powerups.push(createPowerup(farthestPowerupX));
}

function recyclePowerups() {
  const level = LEVELS[gameState.currentLevel - 1];
  if (!level.hasPowerups) return;
  
  const offscreenLeft = cameraX - 100;

  for (let i = powerups.length - 1; i >= 0; i--) {
    const p = powerups[i];
    
    if (p.collected || p.x < offscreenLeft) {
      p.el.remove();
      powerups.splice(i, 1);
      addPowerup();
    }
  }
}

function activatePowerup(type) {
  activePowerup = type;
  powerupEndTime = performance.now() + 5000;
  
  box.classList.remove('shielded', 'slow-motion', 'magnet');
  
  const icons = { shield: '🛡', slow: '⏱', magnet: '🧲' };
  powerupIcon.textContent = icons[type];
  powerupActive.classList.remove('hidden');
  powerupTimer.style.animation = 'none';
  void powerupTimer.offsetWidth;
  powerupTimer.style.animation = 'timerDrain 5s linear forwards';
  
  switch(type) {
    case 'shield':
      isShielded = true;
      box.classList.add('shielded');
      showMessage('SHIELD!');
      break;
    case 'slow':
      isSlowMotion = true;
      box.classList.add('slow-motion');
      showMessage('SLOW-MO!');
      break;
    case 'magnet':
      isMagnet = true;
      box.classList.add('magnet');
      showMessage('MAGNET!');
      break;
  }
}

function updatePowerups() {
  if (activePowerup && performance.now() > powerupEndTime) {
    deactivatePowerup();
  }
}

function deactivatePowerup() {
  activePowerup = null;
  isShielded = false;
  isSlowMotion = false;
  isMagnet = false;
  box.classList.remove('shielded', 'slow-motion', 'magnet');
  hidePowerupIndicator();
}

function hidePowerupIndicator() {
  powerupActive.classList.add('hidden');
}

// ==================== SCORING ====================
function addScore(points) {
  combo++;
  const multiplier = Math.min(combo, 5);
  const finalPoints = points * multiplier;
  score += finalPoints;
  updateScore();
  
  if (combo >= 2) {
    showCombo(multiplier);
  }
  
  clearTimeout(comboTimeout);
  comboTimeout = setTimeout(() => {
    combo = 0;
    hideCombo();
  }, 2000);
  
  updateProgress();
  checkLevelComplete();
}

function updateScore() {
  scoreDisplay.textContent = score;
}

function updateDistance() {
  // Convert camera position to meters (1 unit = 0.1m)
  currentDistance = Math.floor(cameraX * 0.1);
  distanceDisplay.textContent = currentDistance;
}

function updateSpeedDisplay() {
  const level = LEVELS[gameState.currentLevel - 1];
  // Convert game speed to MPH (scale factor for visual appeal)
  const minMPH = 15;
  const maxMPH = 120;
  const speedPercent = (currentHorizontalSpeed - level.minSpeed) / (level.maxSpeed - level.minSpeed);
  const mph = Math.round(minMPH + (maxMPH - minMPH) * speedPercent);
  
  speedValue.textContent = mph;
  speedBarFill.style.width = (speedPercent * 100) + '%';
}

function showCombo(multiplier) {
  comboValue.textContent = 'x' + multiplier;
  comboDisplay.classList.remove('hidden');
}

function hideCombo() {
  comboDisplay.classList.add('hidden');
}

function updateLevelDisplay() {
  currentLevelDisplay.textContent = gameState.currentLevel;
}

function updateProgress() {
  const level = LEVELS[gameState.currentLevel - 1];
  // Update progress bar based on distance towards target
  const progress = Math.min((currentDistance / level.distance) * 100, 100);
  progressFill.style.width = progress + '%';
}

function checkLevelComplete() {
  const level = LEVELS[gameState.currentLevel - 1];
  if (currentDistance >= level.distance) {
    levelComplete();
  }
}

// ==================== COLLISION DETECTION ====================
function intersects(ax, ay, aw, ah, bx, by, bw, bh) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

function checkCollisions() {
  const px = Math.max(playerX, cameraFollowX);
  const py = y;

  // Check spike collisions
  for (let i = 0; i < topSpikes.length; i++) {
    const s = topSpikes[i];
    const sx = s.x - cameraX;
    const sy = boundaryOffset;
    if (intersects(px, py, boxWidth, boxHeight, sx, sy, s.width, s.height)) {
      if (!isShielded) {
        triggerHit();
        return;
      }
      deactivatePowerup();
    }
  }

  for (let i = 0; i < bottomSpikes.length; i++) {
    const s = bottomSpikes[i];
    const sx = s.x - cameraX;
    const sy = gameHeight - boundaryOffset - s.height;
    if (intersects(px, py, boxWidth, boxHeight, sx, sy, s.width, s.height)) {
      if (!isShielded) {
        triggerHit();
        return;
      }
      deactivatePowerup();
    }
  }

  // Check wall collisions
  for (let i = 0; i < walls.length; i++) {
    const wall = walls[i];
    const wx = wall.x - cameraX;
    if (intersects(px, py, boxWidth, boxHeight, wx, wall.y, wall.width, wall.height)) {
      if (!isShielded) {
        triggerHit();
        return;
      }
      deactivatePowerup();
    }
  }

  // Check collectible collisions
  const magnetRange = isMagnet ? 80 : 0;
  for (let i = 0; i < collectibles.length; i++) {
    const c = collectibles[i];
    if (c.collected) continue;
    
    const cx = c.x - cameraX;
    
    // Magnet effect - pull collectibles toward player
    if (isMagnet) {
      const dx = px - cx;
      const dy = py - c.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        c.x += dx * 0.1;
        c.y += dy * 0.1;
      }
    }
    
    if (intersects(px - magnetRange/2, py - magnetRange/2, boxWidth + magnetRange, boxHeight + magnetRange, cx, c.y, c.width, c.height)) {
      c.collected = true;
      c.el.style.transform = 'scale(0)';
      addScore(c.value);
    }
  }

  // Check powerup collisions
  for (let i = 0; i < powerups.length; i++) {
    const p = powerups[i];
    if (p.collected) continue;
    
    const px2 = p.x - cameraX;
    if (intersects(px, py, boxWidth, boxHeight, px2, p.y, p.width, p.height)) {
      p.collected = true;
      p.el.style.transform = 'scale(0)';
      activatePowerup(p.type);
    }
  }
}

// ==================== HIT & GAME OVER ====================
function triggerHit() {
  const now = performance.now();
  if (now < hitUntil) return;

  hitUntil = now + 260;
  box.classList.add("hit");
  
  if (gameState.settings.screenShake) {
    game.style.animation = 'hitShake 200ms ease';
    setTimeout(() => game.style.animation = '', 200);
  }
  
  setTimeout(() => box.classList.remove("hit"), 220);
  
  gameOver();
}

function gameOver() {
  isGameRunning = false;
  isPaused = true;
  
  // Update high score
  if (score > gameState.highScore) {
    gameState.highScore = score;
  }
  
  // Update total distance
  gameState.totalDistance += currentDistance;
  
  saveGameState();
  
  // Show game over modal
  finalScore.textContent = score;
  finalDistance.textContent = currentDistance + 'm';
  bestScore.textContent = gameState.highScore;
  
  gameOverOverlay.classList.remove('hidden');
}

function levelComplete() {
  isGameRunning = false;
  isPaused = true;
  
  const elapsedTime = (performance.now() - levelStartTime) / 1000;
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = Math.floor(elapsedTime % 60);
  
  // Mark level as completed
  gameState.levelCompleted[gameState.currentLevel] = true;
  
  // Ensure current level is in unlockedLevels (safeguard)
  if (!gameState.unlockedLevels.includes(gameState.currentLevel)) {
    gameState.unlockedLevels.push(gameState.currentLevel);
  }
  
  // Update total distance
  gameState.totalDistance += currentDistance;
  
  // Unlock next level
  const nextLevel = gameState.currentLevel + 1;
  if (nextLevel <= LEVELS.length && !gameState.unlockedLevels.includes(nextLevel)) {
    gameState.unlockedLevels.push(nextLevel);
  }
  
  if (score > gameState.highScore) {
    gameState.highScore = score;
  }
  
  saveGameState();
  
  // Show level complete modal
  lcScore.textContent = score;
  lcDistance.textContent = currentDistance + 'm';
  lcTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  if (gameState.currentLevel >= LEVELS.length) {
    nextLevelBtn.style.display = 'none';
  } else {
    nextLevelBtn.style.display = '';
  }
  
  levelCompleteOverlay.classList.remove('hidden');
}

// ==================== GAME CONTROLS ====================
function flipGravity() {
  if (isPaused || !isGameRunning) return;
  
  // Create trail effect
  createTrailGhost();
  
  gravity *= -1;
  flipped = !flipped;
  vy += flipped ? -2.8 : 2.8;

  box.classList.remove("flip-pop");
  void box.offsetWidth;
  box.classList.add("flip-pop");
  box.style.transform = flipped ? "rotate(180deg)" : "rotate(0deg)";
}

function createTrailGhost() {
  const visualX = Math.max(playerX, cameraFollowX);
  const currentFlipped = flipped;
  const direction = currentFlipped ? -1 : 1;
  
  // Create initial burst of trails
  for (let i = 0; i <= 6; i++) {
    setTimeout(() => {
      const trailGhost = document.createElement('div');
      trailGhost.className = 'trail-ghost';
      trailGhost.style.left = visualX + 'px';
      trailGhost.style.top = (y + direction * i * 10) + 'px';
      trailGhost.style.opacity = (0.8 - i * 0.1);
      const scale = 1 - i * 0.06;
      trailGhost.style.transform = currentFlipped ? 'rotate(180deg) scale(' + scale + ')' : 'rotate(0deg) scale(' + scale + ')';
      game.appendChild(trailGhost);
      
      setTimeout(() => trailGhost.remove(), 200);
    }, i * 20);
  }
  
  // Continue spawning trails as player moves
  for (let wave = 1; wave <= 3; wave++) {
    setTimeout(() => {
      for (let i = 0; i <= 4; i++) {
        const trailGhost = document.createElement('div');
        trailGhost.className = 'trail-ghost trail-secondary';
        trailGhost.style.left = visualX + 'px';
        trailGhost.style.top = (y + direction * i * 8) + 'px';
        trailGhost.style.opacity = (0.5 - i * 0.08);
        const scale = 0.8 - i * 0.08;
        trailGhost.style.transform = currentFlipped ? 'rotate(180deg) scale(' + scale + ')' : 'rotate(0deg) scale(' + scale + ')';
        game.appendChild(trailGhost);
        
        setTimeout(() => trailGhost.remove(), 180);
      }
    }, wave * 60);
  }
}

function triggerLandingSqueeze(isTop) {
  box.classList.remove('squeeze-land');
  void box.offsetWidth;
  box.classList.add('squeeze-land');
  setTimeout(() => box.classList.remove('squeeze-land'), 200);
}

function pauseGame() {
  if (!isGameRunning) return;
  
  isPaused = true;
  pauseScore.textContent = score;
  pauseLevel.textContent = gameState.currentLevel;
  pauseOverlay.classList.remove('hidden');
}

function resumeGame() {
  isPaused = false;
  pauseOverlay.classList.add('hidden');
  lastTime = 0;
  requestAnimationFrame(loop);
}

function restartLevel() {
  pauseOverlay.classList.add('hidden');
  gameOverOverlay.classList.add('hidden');
  levelCompleteOverlay.classList.add('hidden');
  startLevel(gameState.currentLevel);
}

function quitToMenu() {
  // Hide all overlays first
  pauseOverlay.classList.add('hidden');
  gameOverOverlay.classList.add('hidden');
  levelCompleteOverlay.classList.add('hidden');
  
  // Stop the game completely
  isGameRunning = false;
  isPaused = false;
  
  // Remove active class from game screen to fully hide it
  gameScreen.classList.remove('active');
  
  // Save any progress and show level selection
  saveGameState();
  showScreen('levels');
}

function nextLevel() {
  levelCompleteOverlay.classList.add('hidden');
  if (gameState.currentLevel < LEVELS.length) {
    startLevel(gameState.currentLevel + 1);
  }
}

// ==================== MESSAGE DISPLAY ====================
function showMessage(text) {
  messageText.textContent = text;
  gameMessage.classList.remove('hidden');
  setTimeout(() => hideMessage(), 1000);
}

function hideMessage() {
  gameMessage.classList.add('hidden');
}

// ==================== RENDER ====================
function render() {
  const visualX = Math.max(playerX, cameraFollowX);
  boxWrap.style.transform = "translate(" + visualX + "px, " + y + "px)";

  for (let i = 0; i < topSpikes.length; i++) {
    const spike = topSpikes[i];
    spike.el.style.transform = "translateX(" + (spike.x - cameraX) + "px)";
  }

  for (let i = 0; i < bottomSpikes.length; i++) {
    const spike = bottomSpikes[i];
    spike.el.style.transform = "translateX(" + (spike.x - cameraX) + "px)";
  }

  for (let i = 0; i < walls.length; i++) {
    const wall = walls[i];
    wall.el.style.transform = "translate(" + (wall.x - cameraX) + "px, " + wall.y + "px)";
  }

  for (let i = 0; i < collectibles.length; i++) {
    const c = collectibles[i];
    if (!c.collected) {
      c.el.style.transform = "translate(" + (c.x - cameraX) + "px, " + c.y + "px)";
    }
  }

  for (let i = 0; i < powerups.length; i++) {
    const p = powerups[i];
    if (!p.collected) {
      p.el.style.transform = "translate(" + (p.x - cameraX) + "px, " + p.y + "px)";
    }
  }
}

// ==================== GAME LOOP ====================
function loop(timestamp) {
  if (!isGameRunning || isPaused) return;
  
  
  if (!lastTime) {
    lastTime = timestamp;
  }

  const level = LEVELS[gameState.currentLevel - 1];
  const frameDelta = Math.min(34, timestamp - lastTime);
  let dt = frameDelta / 16.6667;
  lastTime = timestamp;

  // Slow motion effect
  if (isSlowMotion) {
    dt *= 0.5;
  }

  runElapsedMs += frameDelta;
  const speedProgress = Math.min(runElapsedMs / 60000, 1);
  currentHorizontalSpeed = level.minSpeed + (level.maxSpeed - level.minSpeed) * speedProgress;
  
  // Update speed display (convert to MPH - game units to visualized speed)
  updateSpeedDisplay();
  
  cameraX += currentHorizontalSpeed * dt;

  vy += gravity * dt;
  y += vy * dt;

  if (y < minY) {
    y = minY;
    if (vy < 0) {
      triggerLandingSqueeze(true);
      vy = 0;
    }
  } else if (y > maxY) {
    y = maxY;
    if (vy > 0) {
      triggerLandingSqueeze(false);
      vy = 0;
    }
  }

  recycleSpikes();
  recycleWalls();
  recycleCollectibles();
  recyclePowerups();
  updatePowerups();
  updateDistance();
  updateProgress();
  checkCollisions();
  render();

  requestAnimationFrame(loop);
}

// ==================== EVENT LISTENERS ====================
// Level screen buttons
settingsBtn.addEventListener('click', () => showScreen('settings'));
settingsBackBtn.addEventListener('click', () => showScreen('levels'));

// Settings toggles
soundToggle.addEventListener('click', () => {
  gameState.settings.sound = !gameState.settings.sound;
  updateSettingsUI();
  saveGameState();
});

musicToggle.addEventListener('click', () => {
  gameState.settings.music = !gameState.settings.music;
  updateSettingsUI();
  saveGameState();
});

particlesToggle.addEventListener('click', () => {
  gameState.settings.particles = !gameState.settings.particles;
  updateSettingsUI();
  saveGameState();
});

shakeToggle.addEventListener('click', () => {
  gameState.settings.screenShake = !gameState.settings.screenShake;
  updateSettingsUI();
  saveGameState();
});

resetBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to reset all progress?')) {
    resetProgress();
  }
});

// Game controls
pauseBtn.addEventListener('click', pauseGame);
resumeBtn.addEventListener('click', resumeGame);
restartBtn.addEventListener('click', restartLevel);
quitBtn.addEventListener('click', quitToMenu);
retryBtn.addEventListener('click', restartLevel);
menuBtn.addEventListener('click', quitToMenu);
nextLevelBtn.addEventListener('click', nextLevel);
replayBtn.addEventListener('click', restartLevel);
lcMenuBtn.addEventListener('click', quitToMenu);

// Touch support for buttons (ensures mobile compatibility)
pauseBtn.addEventListener('touchend', (e) => { e.preventDefault(); pauseGame(); });
resumeBtn.addEventListener('touchend', (e) => { e.preventDefault(); resumeGame(); });
restartBtn.addEventListener('touchend', (e) => { e.preventDefault(); restartLevel(); });
quitBtn.addEventListener('touchend', (e) => { e.preventDefault(); quitToMenu(); });
retryBtn.addEventListener('touchend', (e) => { e.preventDefault(); restartLevel(); });
menuBtn.addEventListener('touchend', (e) => { e.preventDefault(); quitToMenu(); });
nextLevelBtn.addEventListener('touchend', (e) => { e.preventDefault(); nextLevel(); });
replayBtn.addEventListener('touchend', (e) => { e.preventDefault(); restartLevel(); });
lcMenuBtn.addEventListener('touchend', (e) => { e.preventDefault(); quitToMenu(); });

// Keyboard controls
function isSpaceInput(event) {
  return event.code === "Space" || event.key === " " || event.key === "Spacebar";
}

window.addEventListener("keydown", (event) => {
  if (isSpaceInput(event) && !event.repeat) {
    event.preventDefault();
    
    if (gameState.currentScreen === 'levels') {
      // Start the highest unlocked level
      const highestLevel = Math.max(...gameState.unlockedLevels);
      startLevel(highestLevel);
    } else if (gameState.currentScreen === 'game') {
      if (isPaused && pauseOverlay.classList.contains('hidden') === false) {
        resumeGame();
      } else {
        flipGravity();
      }
    }
  }
  
  if (event.key === 'Escape') {
    if (gameState.currentScreen === 'game' && isGameRunning) {
      if (isPaused) {
        resumeGame();
      } else {
        pauseGame();
      }
    } else if (gameState.currentScreen === 'settings') {
      showScreen('levels');
    }
  }
});

// Touch/click controls
game.addEventListener("pointerdown", (e) => {
  if (e.target.closest('.game-hud') || e.target.closest('.pause-btn')) return;
  flipGravity();
});

// Window resize
window.addEventListener("resize", resizeGame);

// ==================== INITIALIZATION ==================== 
loadGameState();
createBackgroundParticles();
showScreen('levels');





