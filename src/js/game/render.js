/**
 * Rendering System
 */

import { GAME_CONSTANTS } from '../config/constants.js';
import { topSpikes, bottomSpikes, walls, collectibles } from './obstacles.js';
import { 
  lavaZones, 
  portals, 
  movingWalls, 
  shooters, 
  gravityZones, 
  aliens,
  projectiles
} from './specialObstacles.js';
import * as dom from '../config/dom.js';

const { cameraFollowX } = GAME_CONSTANTS;

/**
 * Render all game elements
 */
export function render({ y, cameraX, playerX }) {
  const visualX = Math.max(playerX, cameraFollowX);
  
  // Use translate3d for GPU acceleration
  dom.boxWrap.style.transform = `translate3d(${visualX}px, ${y}px, 0)`;

  // Render top spikes
  for (let i = 0; i < topSpikes.length; i++) {
    const spike = topSpikes[i];
    spike.el.style.transform = `translate3d(${spike.x - cameraX}px, 0, 0)`;
  }

  // Render bottom spikes
  for (let i = 0; i < bottomSpikes.length; i++) {
    const spike = bottomSpikes[i];
    spike.el.style.transform = `translate3d(${spike.x - cameraX}px, 0, 0)`;
  }

  // Render walls
  for (let i = 0; i < walls.length; i++) {
    const wall = walls[i];
    wall.el.style.transform = `translate3d(${wall.x - cameraX}px, ${wall.y}px, 0)`;
  }

  // Render collectibles
  for (let i = 0; i < collectibles.length; i++) {
    const c = collectibles[i];
    if (!c.collected) {
      c.el.style.transform = `translate3d(${c.x - cameraX}px, ${c.y}px, 0)`;
    }
  }
}

/**
 * Render special obstacles
 */
export function renderSpecialObstacles(cameraX) {
  // Render lava zones
  for (const lava of lavaZones) {
    lava.el.style.transform = `translate3d(${lava.x - cameraX}px, 0, 0)`;
  }
  
  // Render portals
  for (const portal of portals) {
    portal.el.style.transform = `translate3d(${portal.x - cameraX}px, ${portal.y}px, 0)`;
  }
  
  // Render moving walls
  for (const wall of movingWalls) {
    wall.el.style.transform = `translate3d(${wall.x - cameraX}px, ${wall.y}px, 0)`;
  }
  
  // Render shooters
  for (const shooter of shooters) {
    shooter.el.style.transform = `translate3d(${shooter.x - cameraX}px, 0, 0)`;
  }
  
  // Render gravity zones
  for (const zone of gravityZones) {
    zone.el.style.transform = `translate3d(${zone.x - cameraX}px, ${zone.y}px, 0)`;
  }
  
  // Render aliens
  for (const alien of aliens) {
    alien.el.style.transform = `translate3d(${alien.x - cameraX}px, ${alien.y}px, 0)`;
  }
  
  // Render projectiles
  for (const proj of projectiles) {
    proj.el.style.transform = `translate3d(${proj.x - cameraX}px, ${proj.y}px, 0)`;
  }
}
