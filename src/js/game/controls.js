/**
 * Player Controls - Gravity flip and movement
 */

import { playSound } from '../core/audio.js';
import { GAME_CONSTANTS } from '../config/constants.js';
import * as dom from '../config/dom.js';

let flipped = false;
let gravity = GAME_CONSTANTS.baseGravityForce;
let canFlip = true;
let vy = 0;

/**
 * Get current velocity
 */
export function getVelocity() {
  return vy;
}

/**
 * Set velocity
 */
export function setVelocity(v) {
  vy = v;
}

/**
 * Get gravity
 */
export function getGravity() {
  return gravity;
}

/**
 * Reset gravity to base value
 */
export function resetGravity() {
  gravity = GAME_CONSTANTS.baseGravityForce;
  flipped = false;
  canFlip = true;
  vy = 0;
}

/**
 * Check if player is flipped
 */
export function isFlipped() {
  return flipped;
}

/**
 * Allow flip again (when touching ground/ceiling)
 */
export function allowFlip() {
  canFlip = true;
}

/**
 * Flip gravity
 */
export function flipGravity(isPaused, isGameRunning) {
  if (isPaused || !isGameRunning) return false;
  if (!canFlip) return false;
  
  canFlip = false;
  
  playSound('flip');
  createTrailGhost();
  
  gravity *= -1;
  flipped = !flipped;
  vy += flipped ? -2.8 : 2.8;

  dom.box.classList.remove("flip-pop");
  void dom.box.offsetWidth;
  dom.box.classList.add("flip-pop");
  dom.box.style.transform = flipped ? "rotate(180deg)" : "rotate(0deg)";
  
  return true;
}

/**
 * Create trail ghost effect
 */
function createTrailGhost() {
  const visualX = Math.max(32, GAME_CONSTANTS.cameraFollowX);
  const currentFlipped = flipped;
  const direction = currentFlipped ? -1 : 1;
  
  // We need y from game state - will be passed or accessed globally
  const y = window._gameY || 0;
  
  for (let i = 0; i <= 6; i++) {
    setTimeout(() => {
      const trailGhost = document.createElement('div');
      trailGhost.className = 'trail-ghost';
      trailGhost.style.left = visualX + 'px';
      trailGhost.style.top = (y + direction * i * 10) + 'px';
      trailGhost.style.opacity = (0.8 - i * 0.1);
      const scale = 1 - i * 0.06;
      trailGhost.style.transform = currentFlipped ? `rotate(180deg) scale(${scale})` : `rotate(0deg) scale(${scale})`;
      dom.game.appendChild(trailGhost);
      
      setTimeout(() => trailGhost.remove(), 200);
    }, i * 20);
  }
  
  for (let wave = 1; wave <= 3; wave++) {
    setTimeout(() => {
      for (let i = 0; i <= 4; i++) {
        const trailGhost = document.createElement('div');
        trailGhost.className = 'trail-ghost trail-secondary';
        trailGhost.style.left = visualX + 'px';
        trailGhost.style.top = (y + direction * i * 8) + 'px';
        trailGhost.style.opacity = (0.5 - i * 0.08);
        const scale = 0.8 - i * 0.08;
        trailGhost.style.transform = currentFlipped ? `rotate(180deg) scale(${scale})` : `rotate(0deg) scale(${scale})`;
        dom.game.appendChild(trailGhost);
        
        setTimeout(() => trailGhost.remove(), 180);
      }
    }, wave * 60);
  }
}

/**
 * Trigger landing squeeze animation
 */
export function triggerLandingSqueeze() {
  dom.box.classList.remove('squeeze-land');
  void dom.box.offsetWidth;
  dom.box.classList.add('squeeze-land');
  setTimeout(() => dom.box.classList.remove('squeeze-land'), 200);
}
