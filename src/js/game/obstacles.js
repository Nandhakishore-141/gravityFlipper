/**
 * Obstacles Management - Spikes, Walls, and Collectibles
 */

import { LEVELS } from '../config/levels.js';
import { SPIKE_SIZE_CHOICES, WALL_SIZE_CHOICES } from '../config/constants.js';
import { randInt, randomFrom } from '../utils/helpers.js';
import { gameState } from '../core/state.js';
import * as dom from '../config/dom.js';

// Obstacle arrays
export const topSpikes = [];
export const bottomSpikes = [];
export const walls = [];
export const collectibles = [];

// Track farthest positions for spawning
export let farthestSpikeX = 620;
export let farthestWallX = 1500;
export let farthestCollectibleX = 400;

// Spike alternation state
let spikeAlternate = true;

// Game dimensions (set by game module)
let minY = 0;
let maxY = 0;
let gameWidth = 0;
let gameHeight = 0;
let cameraX = 0;

/**
 * Set game dimensions for obstacle spawning
 */
export function setDimensions(dimensions) {
  minY = dimensions.minY;
  maxY = dimensions.maxY;
  gameWidth = dimensions.gameWidth;
  gameHeight = dimensions.gameHeight;
}

/**
 * Update camera position
 */
export function setCameraX(x) {
  cameraX = x;
}

/**
 * Get random spike size
 */
function randomSpikeSize() {
  return randomFrom(SPIKE_SIZE_CHOICES);
}

/**
 * Get random wall size
 */
function randomWallSize() {
  return randomFrom(WALL_SIZE_CHOICES);
}

/**
 * Apply random size to spike
 */
function applySpikeSize(spike, side) {
  const size = randomSpikeSize();
  spike.width = size.width;
  spike.height = size.height;
  spike.side = side;
  spike.el.style.width = size.width + "px";
  spike.el.style.height = size.height + "px";
}

/**
 * Create a spike element
 */
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

/**
 * Add a pair of spikes (top and bottom)
 */
export function addSpikePairGroup() {
  const level = LEVELS[gameState.currentLevel - 1];
  if (!level) return;
  
  farthestSpikeX += randInt(level.spikeGapMin, level.spikeGapMax);
  const jitter = randInt(-24, 24);
  const groupX = farthestSpikeX + jitter;
  
  spikeAlternate = !spikeAlternate;
  
  const topX = spikeAlternate ? groupX : groupX + randInt(80, 150);
  const bottomX = spikeAlternate ? groupX + randInt(80, 150) : groupX;
  
  const top = createSpike(dom.spikesTopContainer, "top", topX);
  const bottom = createSpike(dom.spikesBottomContainer, "bottom", bottomX);
  topSpikes.push(top);
  bottomSpikes.push(bottom);
}

/**
 * Recycle spikes that are off-screen
 */
export function recycleSpikes(addScoreCallback) {
  const level = LEVELS[gameState.currentLevel - 1];
  if (!level) return;
  
  const offscreenLeft = cameraX - 140;
  const minSpawnX = cameraX + gameWidth + 100;

  for (let i = 0; i < topSpikes.length; i++) {
    const top = topSpikes[i];

    if (top.x < offscreenLeft) {
      farthestSpikeX += randInt(level.spikeGapMin, level.spikeGapMax);
      if (farthestSpikeX < minSpawnX) {
        farthestSpikeX = minSpawnX;
      }
      const jitter = randInt(-20, 20);
      spikeAlternate = !spikeAlternate;
      top.x = spikeAlternate ? farthestSpikeX + jitter : farthestSpikeX + jitter + randInt(80, 150);
      applySpikeSize(top, "top");
      top.passed = false;
    }

    if (!top.passed && top.x + top.width < cameraX + 32) {
      top.passed = true;
      if (addScoreCallback) addScoreCallback(1);
    }
  }

  for (let i = 0; i < bottomSpikes.length; i++) {
    const bottom = bottomSpikes[i];

    if (bottom.x < offscreenLeft) {
      const offsetX = randInt(level.spikeGapMin / 2, level.spikeGapMax / 2);
      const baseX = topSpikes[i] ? topSpikes[i].x : minSpawnX;
      bottom.x = Math.max(baseX + randInt(60, 140), minSpawnX);
      applySpikeSize(bottom, "bottom");
    }
  }
}

/**
 * Create a wall element
 */
function createWall(x) {
  const size = randomWallSize();
  const el = document.createElement("div");
  el.className = "wall";
  el.style.width = size.width + "px";
  el.style.height = size.height + "px";
  dom.wallsContainer.appendChild(el);

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

/**
 * Add a wall group
 */
export function addWallGroup() {
  const level = LEVELS[gameState.currentLevel - 1];
  if (!level) return;
  
  farthestWallX += randInt(level.wallGapMin, level.wallGapMax);
  walls.push(createWall(farthestWallX));
}

/**
 * Recycle walls that are off-screen
 */
export function recycleWalls() {
  const level = LEVELS[gameState.currentLevel - 1];
  if (!level || !level.hasWalls) return;
  
  const offscreenLeft = cameraX - 200;
  const minSpawnX = cameraX + gameWidth + 100;

  for (let i = 0; i < walls.length; i++) {
    const wall = walls[i];

    if (wall.x < offscreenLeft) {
      farthestWallX += randInt(level.wallGapMin, level.wallGapMax);
      if (farthestWallX < minSpawnX) {
        farthestWallX = minSpawnX;
      }
      const size = randomWallSize();
      wall.x = farthestWallX;
      wall.width = size.width;
      wall.height = size.height;
      wall.isTop = Math.random() > 0.5;
      wall.el.style.width = size.width + "px";
      wall.el.style.height = size.height + "px";
    }

    wall.y = wall.isTop ? minY : maxY - wall.height;
  }
}

/**
 * Create a collectible element
 */
function createCollectible(x) {
  const el = document.createElement("div");
  const isGem = Math.random() > 0.5;
  el.className = `collectible ${isGem ? 'gem' : 'coin'}`;
  dom.collectiblesContainer.appendChild(el);

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

/**
 * Add a collectible
 */
export function addCollectible() {
  const level = LEVELS[gameState.currentLevel - 1];
  if (!level) return;
  
  if (Math.random() > level.collectibleRate) {
    farthestCollectibleX += randInt(200, 400);
    return;
  }
  farthestCollectibleX += randInt(150, 350);
  const minSpawnX = cameraX + gameWidth + 50;
  if (farthestCollectibleX < minSpawnX) {
    farthestCollectibleX = minSpawnX;
  }
  collectibles.push(createCollectible(farthestCollectibleX));
}

/**
 * Recycle collectibles that are off-screen or collected
 */
export function recycleCollectibles() {
  const level = LEVELS[gameState.currentLevel - 1];
  if (!level || !level.hasCollectibles) return;
  
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

/**
 * Clear all obstacles
 */
export function clearObstacles() {
  dom.spikesTopContainer.innerHTML = "";
  dom.spikesBottomContainer.innerHTML = "";
  dom.wallsContainer.innerHTML = "";
  dom.collectiblesContainer.innerHTML = "";
  topSpikes.length = 0;
  bottomSpikes.length = 0;
  walls.length = 0;
  collectibles.length = 0;
}

/**
 * Reset spawn positions
 */
export function resetSpawnPositions() {
  farthestSpikeX = 620 - randInt(120, 240);
  farthestWallX = 1500 - randInt(220, 340);
  farthestCollectibleX = 300;
}
