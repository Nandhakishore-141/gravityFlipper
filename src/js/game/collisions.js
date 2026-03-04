/**
 * Collision Detection System
 */

import { intersects } from '../utils/helpers.js';
import { GAME_CONSTANTS } from '../config/constants.js';
import { topSpikes, bottomSpikes, walls, collectibles } from './obstacles.js';
import { 
  lavaZones, 
  movingWalls, 
  projectiles, 
  aliens,
  checkPortalCollision,
  getGravityModifier
} from './specialObstacles.js';

const { boundaryOffset, boxSize } = GAME_CONSTANTS;

/**
 * Check all collisions
 * @param {Object} params - Player position and game state
 * @returns {Object} Collision result
 */
export function checkCollisions({ playerX, y, cameraX, gameWidth, gameHeight, boxWidth, boxHeight, onHit, onCollect }) {
  const px = Math.max(playerX, GAME_CONSTANTS.cameraFollowX);
  const py = y;
  
  // Hitbox forgiveness - shrink player hitbox for easier gameplay
  const hitboxShrink = 10;
  const hitPx = px + hitboxShrink;
  const hitPy = py + hitboxShrink;
  const hitW = boxWidth - (hitboxShrink * 2);
  const hitH = boxHeight - (hitboxShrink * 2);

  // Check top spike collisions
  for (let i = 0; i < topSpikes.length; i++) {
    const s = topSpikes[i];
    const sx = s.x - cameraX;
    if (sx < -50 || sx > gameWidth + 100) continue;
    
    const sy = boundaryOffset;
    if (intersects(hitPx, hitPy, hitW, hitH, sx, sy, s.width, s.height)) {
      if (onHit) onHit();
      return { hit: true };
    }
  }

  // Check bottom spike collisions
  for (let i = 0; i < bottomSpikes.length; i++) {
    const s = bottomSpikes[i];
    const sx = s.x - cameraX;
    if (sx < -50 || sx > gameWidth + 100) continue;
    
    const sy = gameHeight - boundaryOffset - s.height;
    if (intersects(hitPx, hitPy, hitW, hitH, sx, sy, s.width, s.height)) {
      if (onHit) onHit();
      return { hit: true };
    }
  }

  // Check wall collisions
  for (let i = 0; i < walls.length; i++) {
    const wall = walls[i];
    const wx = wall.x - cameraX;
    if (wx < -100 || wx > gameWidth + 100) continue;
    
    if (intersects(hitPx, hitPy, hitW, hitH, wx, wall.y, wall.width, wall.height)) {
      if (onHit) onHit();
      return { hit: true };
    }
  }

  // Check collectible collisions (use full hitbox for pickups - more forgiving)
  for (let i = 0; i < collectibles.length; i++) {
    const c = collectibles[i];
    if (c.collected) continue;
    
    const cx = c.x - cameraX;
    
    if (intersects(px, py, boxWidth, boxHeight, cx, c.y, c.width, c.height)) {
      c.collected = true;
      c.el.style.transform = 'scale(0)';
      if (onCollect) onCollect(c.value);
    }
  }

  // Check lava zone collisions
  for (const lava of lavaZones) {
    const lx = lava.x - cameraX;
    if (lx < -300 || lx > gameWidth + 100) continue;
    
    if (intersects(hitPx, hitPy, hitW, hitH, lx, lava.y, lava.width, lava.height)) {
      if (onHit) onHit();
      return { hit: true };
    }
  }

  // Check moving wall collisions
  for (const wall of movingWalls) {
    const wx = wall.x - cameraX;
    if (wx < -100 || wx > gameWidth + 100) continue;
    
    if (intersects(hitPx, hitPy, hitW, hitH, wx, wall.y, wall.width, wall.height)) {
      if (onHit) onHit();
      return { hit: true };
    }
  }

  // Check projectile collisions
  for (const proj of projectiles) {
    const projX = proj.x - cameraX;
    if (intersects(hitPx, hitPy, hitW, hitH, projX, proj.y, proj.width, proj.height)) {
      if (onHit) onHit();
      return { hit: true };
    }
  }

  // Check alien collisions
  for (const alien of aliens) {
    const ax = alien.x - cameraX;
    if (ax < -100 || ax > gameWidth + 100) continue;
    
    if (intersects(hitPx, hitPy, hitW, hitH, ax, alien.y, alien.width, alien.height)) {
      if (onHit) onHit();
      return { hit: true };
    }
  }

  // Check portal collision (teleport effect)
  const portalTargetY = checkPortalCollision(px + cameraX, py, boxWidth, boxHeight);
  if (portalTargetY !== null) {
    return { hit: false, teleportY: portalTargetY };
  }

  // Get gravity modifier from gravity zones
  const gravityMod = getGravityModifier(px + cameraX, py, boxWidth, boxHeight);

  return { hit: false, gravityModifier: gravityMod };
}
