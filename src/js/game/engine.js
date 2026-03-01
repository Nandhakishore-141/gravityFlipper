/**
 * Game Engine - Main game loop and initialization
 */

import { GAME_CONSTANTS } from '../config/constants.js';
import { LEVELS } from '../config/levels.js';
import { gameState, saveGameState } from '../core/state.js';
import { playSound, startBackgroundMusic, stopBackgroundMusic, pauseBackgroundMusic, resumeBackgroundMusic } from '../core/audio.js';
import * as dom from '../config/dom.js';
import * as obstacles from './obstacles.js';
import { checkCollisions } from './collisions.js';
import { render } from './render.js';
import * as controls from './controls.js';
import { randInt } from '../utils/helpers.js';

const { boundaryOffset, boundaryThickness, boxSize, cameraFollowX, baseGravityForce } = GAME_CONSTANTS;

// Game state
let playerX = 32;
let y = 0;
let minY = 0;
let maxY = 0;
let gameWidth = 0;
let gameHeight = 0;
let boxWidth = boxSize;
let boxHeight = boxSize;
let hitUntil = 0;
let cameraX = 0;
let lastTime = 0;
let runElapsedMs = 0;
let isPaused = false;
let isGameRunning = false;
let score = 0;
let combo = 0;
let comboTimeout = null;
let levelStartTime = 0;
let currentDistance = 0;
let currentHorizontalSpeed = 3.0;

// Callbacks
let onGameOver = null;
let onLevelComplete = null;

/**
 * Set game callbacks
 */
export function setCallbacks(callbacks) {
  onGameOver = callbacks.onGameOver;
  onLevelComplete = callbacks.onLevelComplete;
}

/**
 * Get current game state
 */
export function getGameState() {
  return {
    isPaused,
    isGameRunning,
    score,
    currentDistance,
    cameraX,
    y
  };
}

/**
 * Resize game dimensions
 */
export function resizeGame() {
  const gameRect = dom.game.getBoundingClientRect();
  gameWidth = gameRect.width;
  gameHeight = gameRect.height;
  boxWidth = boxSize;
  boxHeight = boxSize;

  minY = boundaryOffset + boundaryThickness;
  maxY = gameHeight - boundaryOffset - boundaryThickness - boxHeight;

  if (y < minY || y > maxY || y === 0) {
    y = (minY + maxY) / 2;
  }
  
  obstacles.setDimensions({ minY, maxY, gameWidth, gameHeight });
}

/**
 * Initialize game world
 */
export function initWorld() {
  resizeGame();
  
  const level = LEVELS[gameState.currentLevel - 1];

  obstacles.clearObstacles();
  obstacles.resetSpawnPositions();
  
  // Generate initial obstacles
  for (let i = 0; i < 36; i++) {
    obstacles.addSpikePairGroup();
  }

  if (level.hasWalls) {
    for (let i = 0; i < 8; i++) {
      obstacles.addWallGroup();
    }
  }

  if (level.hasCollectibles) {
    for (let i = 0; i < 15; i++) {
      obstacles.addCollectible();
    }
  }

  // Reset game state
  cameraX = 0;
  y = (minY + maxY) / 2;
  controls.resetGravity();
  score = 0;
  runElapsedMs = 0;
  currentHorizontalSpeed = level.minSpeed;
  combo = 0;
  currentDistance = 0;
  
  // Update global y for trail effects
  window._gameY = y;
  
  updateHUD();
  
  dom.box.className = 'box';
  dom.box.style.transform = 'rotate(0deg)';
}

/**
 * Update HUD elements
 */
function updateHUD() {
  dom.scoreDisplay.textContent = score;
  dom.currentLevelDisplay.textContent = gameState.currentLevel;
  dom.distanceDisplay.textContent = currentDistance;
  dom.comboDisplay.classList.add('hidden');
  dom.gameMessage.classList.add('hidden');
  
  const level = LEVELS[gameState.currentLevel - 1];
  const progress = Math.min((currentDistance / level.distance) * 100, 100);
  dom.progressFill.style.width = progress + '%';
  
  updateSpeedDisplay();
}

/**
 * Update speed display
 */
function updateSpeedDisplay() {
  const level = LEVELS[gameState.currentLevel - 1];
  const minMPH = 15;
  const maxMPH = 120;
  const speedPercent = (currentHorizontalSpeed - level.minSpeed) / (level.maxSpeed - level.minSpeed);
  const mph = Math.round(minMPH + (maxMPH - minMPH) * speedPercent);
  
  dom.speedValue.textContent = mph;
  dom.speedBarFill.style.width = (speedPercent * 100) + '%';
}

/**
 * Add score with combo multiplier
 */
function addScore(points) {
  combo++;
  const multiplier = Math.min(combo, 5);
  const finalPoints = points * multiplier;
  score += finalPoints;
  gameState.totalDiamonds += finalPoints;
  
  dom.scoreDisplay.textContent = score;
  
  if (combo >= 2) {
    dom.comboValue.textContent = 'x' + multiplier;
    dom.comboDisplay.classList.remove('hidden');
  }
  
  clearTimeout(comboTimeout);
  comboTimeout = setTimeout(() => {
    combo = 0;
    dom.comboDisplay.classList.add('hidden');
  }, 2000);
  
  updateProgress();
  checkLevelComplete();
}

/**
 * Update progress bar
 */
function updateProgress() {
  const level = LEVELS[gameState.currentLevel - 1];
  const progress = Math.min((currentDistance / level.distance) * 100, 100);
  dom.progressFill.style.width = progress + '%';
}

/**
 * Check if level is complete
 */
function checkLevelComplete() {
  const level = LEVELS[gameState.currentLevel - 1];
  if (currentDistance >= level.distance) {
    levelComplete();
  }
}

/**
 * Trigger hit effect
 */
function triggerHit() {
  const now = performance.now();
  if (now < hitUntil) return;

  playSound('hit');
  
  hitUntil = now + 260;
  dom.box.classList.add("hit");
  
  if (gameState.settings.screenShake) {
    dom.game.style.animation = 'hitShake 200ms ease';
    setTimeout(() => dom.game.style.animation = '', 200);
  }
  
  setTimeout(() => dom.box.classList.remove("hit"), 220);
  
  gameOver();
}

/**
 * Handle game over
 */
function gameOver() {
  isGameRunning = false;
  isPaused = true;
  
  if (score > gameState.highScore) {
    gameState.highScore = score;
  }
  
  gameState.totalDistance += currentDistance;
  saveGameState();
  
  dom.finalScore.textContent = score;
  dom.finalDistance.textContent = currentDistance + 'm';
  dom.bestScore.textContent = gameState.highScore;
  
  dom.gameOverOverlay.classList.remove('hidden');
  
  if (onGameOver) onGameOver();
}

/**
 * Handle level complete
 */
function levelComplete() {
  isGameRunning = false;
  isPaused = true;
  
  playSound('levelComplete');
  
  const elapsedTime = (performance.now() - levelStartTime) / 1000;
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = Math.floor(elapsedTime % 60);
  
  gameState.levelCompleted[gameState.currentLevel] = true;
  
  if (!gameState.unlockedLevels.includes(gameState.currentLevel)) {
    gameState.unlockedLevels.push(gameState.currentLevel);
  }
  
  gameState.totalDistance += currentDistance;
  
  const nextLevel = gameState.currentLevel + 1;
  if (nextLevel <= LEVELS.length && !gameState.unlockedLevels.includes(nextLevel)) {
    gameState.unlockedLevels.push(nextLevel);
  }
  
  if (score > gameState.highScore) {
    gameState.highScore = score;
  }
  
  saveGameState();
  
  dom.lcScore.textContent = score;
  dom.lcDistance.textContent = currentDistance + 'm';
  dom.lcTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  if (gameState.currentLevel >= LEVELS.length) {
    dom.nextLevelBtn.style.display = 'none';
  } else {
    dom.nextLevelBtn.style.display = '';
  }
  
  dom.levelCompleteOverlay.classList.remove('hidden');
  
  if (onLevelComplete) onLevelComplete();
}

/**
 * Start a level
 */
export function startLevel(levelId) {
  if (document.activeElement) {
    document.activeElement.blur();
  }
  
  gameState.currentLevel = levelId;
  initWorld();
  isPaused = false;
  isGameRunning = true;
  lastTime = 0;
  levelStartTime = performance.now();
  
  stopBackgroundMusic();
  startBackgroundMusic(0, 0);
  
  requestAnimationFrame(loop);
}

/**
 * Pause game
 */
export function pauseGame() {
  if (!isGameRunning) return;
  
  isPaused = true;
  dom.pauseScore.textContent = score;
  dom.pauseLevel.textContent = gameState.currentLevel;
  dom.pauseOverlay.classList.remove('hidden');
  
  pauseBackgroundMusic();
}

/**
 * Resume game
 */
export function resumeGame() {
  if (document.activeElement) {
    document.activeElement.blur();
  }
  
  isPaused = false;
  dom.pauseOverlay.classList.add('hidden');
  lastTime = 0;
  
  resumeBackgroundMusic();
  
  requestAnimationFrame(loop);
}

/**
 * Restart current level
 */
export function restartLevel() {
  dom.pauseOverlay.classList.add('hidden');
  dom.gameOverOverlay.classList.add('hidden');
  dom.levelCompleteOverlay.classList.add('hidden');
  
  startLevel(gameState.currentLevel);
}

/**
 * Go to next level
 */
export function nextLevel() {
  dom.levelCompleteOverlay.classList.add('hidden');
  if (gameState.currentLevel < LEVELS.length) {
    startLevel(gameState.currentLevel + 1);
  }
}

/**
 * Quit to menu
 */
export function quitToMenu(showScreenCallback) {
  dom.pauseOverlay.classList.add('hidden');
  dom.gameOverOverlay.classList.add('hidden');
  dom.levelCompleteOverlay.classList.add('hidden');
  
  isGameRunning = false;
  isPaused = false;
  
  stopBackgroundMusic();
  
  dom.gameScreen.classList.remove('active');
  
  saveGameState();
  if (showScreenCallback) showScreenCallback('levels');
}

/**
 * Handle flip input
 */
export function handleFlip() {
  controls.flipGravity(isPaused, isGameRunning);
}

/**
 * Main game loop
 */
function loop(timestamp) {
  if (!isGameRunning || isPaused) return;
  
  try {
    if (!lastTime) {
      lastTime = timestamp;
    }

    const level = LEVELS[gameState.currentLevel - 1];
    if (!level) {
      console.error('Invalid level:', gameState.currentLevel);
      return;
    }
    
    const frameDelta = Math.min(50, timestamp - lastTime);
    let dt = frameDelta / 16.6667;
    dt = Math.min(dt, 2.5);
    lastTime = timestamp;

    runElapsedMs += frameDelta;
    const speedProgress = Math.min(runElapsedMs / 60000, 1);
    currentHorizontalSpeed = level.minSpeed + (level.maxSpeed - level.minSpeed) * speedProgress;
    
    updateSpeedDisplay();
    
    cameraX += currentHorizontalSpeed * dt;
    obstacles.setCameraX(cameraX);

    const vy = controls.getVelocity();
    const gravity = controls.getGravity();
    controls.setVelocity(vy + gravity * dt);
    y += controls.getVelocity() * dt;
    
    // Update global y for trail effects
    window._gameY = y;

    if (y < minY) {
      y = minY;
      if (controls.getVelocity() < 0) {
        controls.triggerLandingSqueeze();
        controls.setVelocity(0);
        controls.allowFlip();
      }
    } else if (y > maxY) {
      y = maxY;
      if (controls.getVelocity() > 0) {
        controls.triggerLandingSqueeze();
        controls.setVelocity(0);
        controls.allowFlip();
      }
    }

    obstacles.recycleSpikes(addScore);
    obstacles.recycleWalls();
    obstacles.recycleCollectibles();
    
    currentDistance = Math.floor(cameraX * 0.1);
    dom.distanceDisplay.textContent = currentDistance;
    updateProgress();
    
    checkCollisions({
      playerX,
      y,
      cameraX,
      gameWidth,
      gameHeight,
      boxWidth,
      boxHeight,
      onHit: triggerHit,
      onCollect: (value) => {
        playSound('collect');
        addScore(value);
      }
    });
    
    render({ y, cameraX, playerX });
  } catch (error) {
    console.error('Game loop error:', error);
  }

  if (isGameRunning && !isPaused) {
    requestAnimationFrame(loop);
  }
}

// Export for resize handler
export { resizeGame as handleResize };
