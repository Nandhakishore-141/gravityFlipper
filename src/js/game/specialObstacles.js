/**
 * Special Obstacles - Universe-specific hazards
 * - Lava zones (Universe 2)
 * - Portals (Universe 3)
 * - Moving walls (Universe 4)
 * - Shooters (Universe 5)
 * - Gravity zones (Universe 6)
 * - Aliens (Universe 7)
 */

import { LEVELS } from '../config/levels.js';
import { randInt, randomFrom } from '../utils/helpers.js';
import { gameState } from '../core/state.js';
import * as dom from '../config/dom.js';

// Special obstacle arrays
export const lavaZones = [];
export const portals = [];
export const movingWalls = [];
export const shooters = [];
export const gravityZones = [];
export const aliens = [];
export const projectiles = [];

// Spawn tracking
let farthestLavaX = 800;
let farthestPortalX = 900;
let farthestMovingWallX = 1000;
let farthestShooterX = 1100;
let farthestGravityX = 850;
let farthestAlienX = 950;

// Game dimensions
let minY = 0;
let maxY = 0;
let gameWidth = 0;
let gameHeight = 0;
let cameraX = 0;

/**
 * Set game dimensions
 */
export function setSpecialDimensions(dimensions) {
  minY = dimensions.minY;
  maxY = dimensions.maxY;
  gameWidth = dimensions.gameWidth;
  gameHeight = dimensions.gameHeight;
}

/**
 * Update camera position
 */
export function setSpecialCameraX(x) {
  cameraX = x;
}

// ==================== LAVA ZONES ====================
function createLavaZone(x) {
  const el = document.createElement("div");
  el.className = "lava-zone";
  const width = randInt(100, 200);
  el.style.width = width + "px";
  dom.lavaZonesContainer.appendChild(el);
  
  return {
    x,
    y: maxY - 20,
    width,
    height: 20,
    el
  };
}

export function addLavaZone() {
  farthestLavaX += randInt(400, 700);
  const minX = cameraX + gameWidth + 50;
  if (farthestLavaX < minX) farthestLavaX = minX;
  lavaZones.push(createLavaZone(farthestLavaX));
}

export function recycleLavaZones() {
  const offscreenLeft = cameraX - 300;
  
  for (let i = lavaZones.length - 1; i >= 0; i--) {
    const lava = lavaZones[i];
    if (lava.x + lava.width < offscreenLeft) {
      lava.el.remove();
      lavaZones.splice(i, 1);
      addLavaZone();
    }
  }
}

// ==================== PORTALS ====================
function createPortal(x) {
  const el = document.createElement("div");
  el.className = "portal";
  dom.portalsContainer.appendChild(el);
  
  const y = randInt(minY + 60, maxY - 60);
  const targetY = y > (minY + maxY) / 2 ? randInt(minY + 40, (minY + maxY) / 2) : randInt((minY + maxY) / 2, maxY - 40);
  
  return {
    x,
    y,
    width: 40,
    height: 40,
    targetY,
    el
  };
}

export function addPortal() {
  farthestPortalX += randInt(500, 900);
  const minX = cameraX + gameWidth + 100;
  if (farthestPortalX < minX) farthestPortalX = minX;
  portals.push(createPortal(farthestPortalX));
}

export function recyclePortals() {
  const offscreenLeft = cameraX - 100;
  
  for (let i = portals.length - 1; i >= 0; i--) {
    const portal = portals[i];
    if (portal.x < offscreenLeft) {
      portal.el.remove();
      portals.splice(i, 1);
      addPortal();
    }
  }
}

// ==================== MOVING WALLS ====================
function createMovingWall(x) {
  const el = document.createElement("div");
  el.className = "moving-wall";
  const height = randInt(80, 150);
  el.style.height = height + "px";
  dom.movingWallsContainer.appendChild(el);
  
  const startY = randInt(minY + 20, maxY - height - 20);
  
  return {
    x,
    y: startY,
    width: 20,
    height,
    direction: Math.random() > 0.5 ? 1 : -1,
    speed: 1 + Math.random() * 2,
    startY,
    el
  };
}

export function addMovingWall() {
  farthestMovingWallX += randInt(400, 600);
  const minX = cameraX + gameWidth + 50;
  if (farthestMovingWallX < minX) farthestMovingWallX = minX;
  movingWalls.push(createMovingWall(farthestMovingWallX));
}

export function updateMovingWalls() {
  for (const wall of movingWalls) {
    wall.y += wall.direction * wall.speed;
    
    // Bounce off boundaries
    if (wall.y <= minY + 10) {
      wall.y = minY + 10;
      wall.direction = 1;
    } else if (wall.y + wall.height >= maxY - 10) {
      wall.y = maxY - wall.height - 10;
      wall.direction = -1;
    }
  }
}

export function recycleMovingWalls() {
  const offscreenLeft = cameraX - 100;
  
  for (let i = movingWalls.length - 1; i >= 0; i--) {
    const wall = movingWalls[i];
    if (wall.x < offscreenLeft) {
      wall.el.remove();
      movingWalls.splice(i, 1);
      addMovingWall();
    }
  }
}

// ==================== SHOOTERS ====================
function createShooter(x) {
  const el = document.createElement("div");
  const isTop = Math.random() > 0.5;
  el.className = `shooter ${isTop ? 'shooter-top' : 'shooter-bottom'}`;
  dom.shootersContainer.appendChild(el);
  
  return {
    x,
    y: isTop ? minY : maxY - 30,
    width: 30,
    height: 30,
    isTop,
    lastShot: 0,
    shootInterval: randInt(1500, 3000),
    el
  };
}

export function addShooter() {
  farthestShooterX += randInt(350, 550);
  const minX = cameraX + gameWidth + 100;
  if (farthestShooterX < minX) farthestShooterX = minX;
  shooters.push(createShooter(farthestShooterX));
}

function createProjectile(shooter) {
  const el = document.createElement("div");
  el.className = "projectile";
  dom.projectilesContainer.appendChild(el);
  
  return {
    x: shooter.x + 10,
    y: shooter.isTop ? shooter.y + 30 : shooter.y - 10,
    width: 10,
    height: 10,
    direction: shooter.isTop ? 1 : -1,
    speed: 4,
    el
  };
}

export function updateShooters(currentTime) {
  for (const shooter of shooters) {
    // Only shoot when on screen
    if (shooter.x > cameraX - 50 && shooter.x < cameraX + gameWidth + 50) {
      if (currentTime - shooter.lastShot > shooter.shootInterval) {
        shooter.lastShot = currentTime;
        projectiles.push(createProjectile(shooter));
      }
    }
  }
  
  // Update projectiles
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const proj = projectiles[i];
    proj.y += proj.direction * proj.speed;
    
    // Remove if off screen
    if (proj.y < minY - 50 || proj.y > maxY + 50) {
      proj.el.remove();
      projectiles.splice(i, 1);
    }
  }
}

export function recycleShooters() {
  const offscreenLeft = cameraX - 100;
  
  for (let i = shooters.length - 1; i >= 0; i--) {
    const shooter = shooters[i];
    if (shooter.x < offscreenLeft) {
      shooter.el.remove();
      shooters.splice(i, 1);
      addShooter();
    }
  }
}

// ==================== GRAVITY ZONES ====================
function createGravityZone(x) {
  const el = document.createElement("div");
  const isInverse = Math.random() > 0.5;
  el.className = `gravity-zone ${isInverse ? 'gravity-inverse' : 'gravity-heavy'}`;
  const width = randInt(120, 200);
  const height = randInt(80, 120);
  el.style.width = width + "px";
  el.style.height = height + "px";
  dom.gravityZonesContainer.appendChild(el);
  
  return {
    x,
    y: randInt(minY + 30, maxY - height - 30),
    width,
    height,
    isInverse,
    gravityMultiplier: isInverse ? -0.5 : 2,
    el
  };
}

export function addGravityZone() {
  farthestGravityX += randInt(500, 800);
  const minX = cameraX + gameWidth + 50;
  if (farthestGravityX < minX) farthestGravityX = minX;
  gravityZones.push(createGravityZone(farthestGravityX));
}

export function recycleGravityZones() {
  const offscreenLeft = cameraX - 300;
  
  for (let i = gravityZones.length - 1; i >= 0; i--) {
    const zone = gravityZones[i];
    if (zone.x + zone.width < offscreenLeft) {
      zone.el.remove();
      gravityZones.splice(i, 1);
      addGravityZone();
    }
  }
}

// ==================== ALIENS ====================
function createAlien(x) {
  const el = document.createElement("div");
  el.className = "alien";
  dom.aliensContainer.appendChild(el);
  
  return {
    x,
    y: randInt(minY + 50, maxY - 80),
    width: 40,
    height: 40,
    direction: Math.random() > 0.5 ? 1 : -1,
    speedX: 1 + Math.random() * 1.5,
    speedY: 0.5 + Math.random(),
    startX: x,
    el
  };
}

export function addAlien() {
  farthestAlienX += randInt(400, 700);
  const minX = cameraX + gameWidth + 100;
  if (farthestAlienX < minX) farthestAlienX = minX;
  aliens.push(createAlien(farthestAlienX));
}

export function updateAliens() {
  for (const alien of aliens) {
    // Move in a wave pattern
    alien.y += Math.sin(Date.now() / 300 + alien.startX) * alien.speedY;
    
    // Stay within bounds
    if (alien.y < minY + 20) alien.y = minY + 20;
    if (alien.y > maxY - alien.height - 20) alien.y = maxY - alien.height - 20;
  }
}

export function recycleAliens() {
  const offscreenLeft = cameraX - 100;
  
  for (let i = aliens.length - 1; i >= 0; i--) {
    const alien = aliens[i];
    if (alien.x < offscreenLeft) {
      alien.el.remove();
      aliens.splice(i, 1);
      addAlien();
    }
  }
}

// ==================== INITIALIZATION ====================
export function initSpecialObstacles(obstacleType) {
  clearSpecialObstacles();
  resetSpecialSpawnPositions();
  
  if (!obstacleType) return;
  
  const types = obstacleType === 'all' 
    ? ['lava', 'portal', 'movingWall', 'shooter', 'gravity', 'alien']
    : [obstacleType];
  
  for (const type of types) {
    switch (type) {
      case 'lava':
        for (let i = 0; i < 3; i++) addLavaZone();
        break;
      case 'portal':
        for (let i = 0; i < 2; i++) addPortal();
        break;
      case 'movingWall':
        for (let i = 0; i < 3; i++) addMovingWall();
        break;
      case 'shooter':
        for (let i = 0; i < 3; i++) addShooter();
        break;
      case 'gravity':
        for (let i = 0; i < 2; i++) addGravityZone();
        break;
      case 'alien':
        for (let i = 0; i < 3; i++) addAlien();
        break;
    }
  }
}

export function updateSpecialObstacles(obstacleType, currentTime) {
  if (!obstacleType) return;
  
  const types = obstacleType === 'all' 
    ? ['lava', 'portal', 'movingWall', 'shooter', 'gravity', 'alien']
    : [obstacleType];
  
  for (const type of types) {
    switch (type) {
      case 'lava':
        recycleLavaZones();
        break;
      case 'portal':
        recyclePortals();
        break;
      case 'movingWall':
        updateMovingWalls();
        recycleMovingWalls();
        break;
      case 'shooter':
        updateShooters(currentTime);
        recycleShooters();
        break;
      case 'gravity':
        recycleGravityZones();
        break;
      case 'alien':
        updateAliens();
        recycleAliens();
        break;
    }
  }
}

export function clearSpecialObstacles() {
  // Clear all arrays and remove elements
  for (const lava of lavaZones) lava.el.remove();
  for (const portal of portals) portal.el.remove();
  for (const wall of movingWalls) wall.el.remove();
  for (const shooter of shooters) shooter.el.remove();
  for (const zone of gravityZones) zone.el.remove();
  for (const alien of aliens) alien.el.remove();
  for (const proj of projectiles) proj.el.remove();
  
  lavaZones.length = 0;
  portals.length = 0;
  movingWalls.length = 0;
  shooters.length = 0;
  gravityZones.length = 0;
  aliens.length = 0;
  projectiles.length = 0;
}

export function resetSpecialSpawnPositions() {
  farthestLavaX = 800;
  farthestPortalX = 900;
  farthestMovingWallX = 1000;
  farthestShooterX = 1100;
  farthestGravityX = 850;
  farthestAlienX = 950;
}

/**
 * Get active gravity modifier for player position
 */
export function getGravityModifier(playerX, playerY, playerWidth, playerHeight) {
  for (const zone of gravityZones) {
    // Check if player overlaps with gravity zone
    if (playerX + playerWidth > zone.x &&
        playerX < zone.x + zone.width &&
        playerY + playerHeight > zone.y &&
        playerY < zone.y + zone.height) {
      return zone.gravityMultiplier;
    }
  }
  return 1; // Normal gravity
}

/**
 * Check if player touches a portal
 */
export function checkPortalCollision(playerX, playerY, playerWidth, playerHeight) {
  for (const portal of portals) {
    if (playerX + playerWidth > portal.x + 10 &&
        playerX < portal.x + portal.width - 10 &&
        playerY + playerHeight > portal.y + 10 &&
        playerY < portal.y + portal.height - 10) {
      return portal.targetY;
    }
  }
  return null;
}
