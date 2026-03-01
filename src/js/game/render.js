/**
 * Rendering System
 */

import { GAME_CONSTANTS } from '../config/constants.js';
import { topSpikes, bottomSpikes, walls, collectibles } from './obstacles.js';
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
