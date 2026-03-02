/**
 * Powerup Manager - Handles powerup activation and effects during gameplay
 */

import { POWERUPS, getPowerupByKey } from '../config/powerups.js';
import { gameState, saveGameState, usePowerup, getPowerupCount } from '../core/state.js';
import { playSound } from '../core/audio.js';
import * as dom from '../config/dom.js';

// Active powerup states
let activePowerup = null;
let powerupEndTime = 0;
let shieldActive = false;
let effectOverlay = null;

/**
 * Initialize powerup manager
 */
export function initPowerupManager() {
  activePowerup = null;
  powerupEndTime = 0;
  shieldActive = false;
  updateInventoryHUD();
  removeEffectOverlay();
}

/**
 * Update powerup inventory HUD
 */
export function updateInventoryHUD() {
  if (dom.invSlowmo) {
    const count = getPowerupCount('slowmo');
    dom.invSlowmo.textContent = count;
    dom.invSlowmo.classList.toggle('empty', count === 0);
    dom.invSlowmo.closest('.inventory-item')?.classList.toggle('disabled', count === 0);
  }
  
  if (dom.invShield) {
    const count = getPowerupCount('shield');
    dom.invShield.textContent = count;
    dom.invShield.classList.toggle('empty', count === 0);
    dom.invShield.closest('.inventory-item')?.classList.toggle('disabled', count === 0);
  }
  
  if (dom.invFastforward) {
    const count = getPowerupCount('fastforward');
    dom.invFastforward.textContent = count;
    dom.invFastforward.classList.toggle('empty', count === 0);
    dom.invFastforward.closest('.inventory-item')?.classList.toggle('disabled', count === 0);
  }
}

/**
 * Try to activate a powerup by key
 * @param {string} key - The key pressed
 * @returns {object|null} - Powerup effect info or null
 */
export function tryActivatePowerup(key) {
  const powerup = getPowerupByKey(key);
  if (!powerup) return null;
  
  const count = getPowerupCount(powerup.id);
  if (count <= 0) {
    showPowerupMessage('No ' + powerup.name + ' available!', 'error');
    return null;
  }
  
  // Don't allow overlapping timed powerups (slowmo)
  if (powerup.id === 'slowmo' && activePowerup === 'slowmo') {
    return null;
  }
  
  // Consume the powerup
  if (!usePowerup(powerup.id)) {
    return null;
  }
  
  playSound('powerup');
  updateInventoryHUD();
  
  switch (powerup.id) {
    case 'slowmo':
      return activateSlowmo(powerup);
    case 'shield':
      return activateShield(powerup);
    case 'fastforward':
      return activateFastForward(powerup);
    default:
      return null;
  }
}

/**
 * Activate slow motion effect
 */
function activateSlowmo(powerup) {
  activePowerup = 'slowmo';
  powerupEndTime = performance.now() + powerup.duration;
  
  showEffectOverlay('slowmo');
  showPowerupMessage('SLOW MOTION!', 'success');
  
  // Mark inventory item as active
  const invItem = dom.invSlowmo?.closest('.inventory-item');
  if (invItem) invItem.classList.add('active');
  
  return {
    type: 'slowmo',
    speedMultiplier: powerup.speedMultiplier,
    duration: powerup.duration
  };
}

/**
 * Activate shield
 */
function activateShield(powerup) {
  shieldActive = true;
  
  showEffectOverlay('shield');
  showPowerupMessage('SHIELD ACTIVE!', 'success');
  
  // Mark inventory item as active
  const invItem = dom.invShield?.closest('.inventory-item');
  if (invItem) invItem.classList.add('active');
  
  return {
    type: 'shield',
    active: true
  };
}

/**
 * Activate fast forward (teleport)
 */
function activateFastForward(powerup) {
  showEffectOverlay('fastforward');
  showPowerupMessage('+150m FORWARD!', 'success');
  
  // Remove effect after brief animation
  setTimeout(() => removeEffectOverlay(), 500);
  
  return {
    type: 'fastforward',
    teleportDistance: powerup.teleportDistance
  };
}

/**
 * Update powerups each frame
 * @returns {object} - Current powerup effects
 */
export function updatePowerups() {
  const now = performance.now();
  const effects = {
    speedMultiplier: 1.0,
    shieldActive: shieldActive
  };
  
  // Check slowmo duration
  if (activePowerup === 'slowmo') {
    if (now < powerupEndTime) {
      effects.speedMultiplier = POWERUPS.slowmo.speedMultiplier;
    } else {
      // Slowmo ended
      deactivateSlowmo();
    }
  }
  
  return effects;
}

/**
 * Deactivate slowmo
 */
function deactivateSlowmo() {
  activePowerup = null;
  powerupEndTime = 0;
  removeEffectOverlay();
  
  const invItem = dom.invSlowmo?.closest('.inventory-item');
  if (invItem) invItem.classList.remove('active');
  
  showPowerupMessage('Slow motion ended', 'info');
}

/**
 * Check if shield can block a hit
 * @returns {boolean} - True if shield blocked the hit
 */
export function tryBlockWithShield() {
  if (shieldActive) {
    shieldActive = false;
    removeEffectOverlay();
    
    const invItem = dom.invShield?.closest('.inventory-item');
    if (invItem) invItem.classList.remove('active');
    
    playSound('shieldBlock');
    showPowerupMessage('Shield blocked!', 'success');
    
    return true;
  }
  return false;
}

/**
 * Check if shield is active
 */
export function isShieldActive() {
  return shieldActive;
}

/**
 * Show effect overlay
 */
function showEffectOverlay(type) {
  removeEffectOverlay();
  
  effectOverlay = document.createElement('div');
  effectOverlay.className = `powerup-effect-active ${type}`;
  document.body.appendChild(effectOverlay);
}

/**
 * Remove effect overlay
 */
function removeEffectOverlay() {
  if (effectOverlay) {
    effectOverlay.remove();
    effectOverlay = null;
  }
}

/**
 * Show powerup activation message
 */
function showPowerupMessage(text, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `powerup-notification ${type}`;
  notification.textContent = text;
  
  document.body.appendChild(notification);
  
  setTimeout(() => notification.classList.add('show'), 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 1500);
}

/**
 * Reset all active powerups (on level restart/quit)
 */
export function resetActivePowerups() {
  activePowerup = null;
  powerupEndTime = 0;
  shieldActive = false;
  removeEffectOverlay();
  
  // Remove active states from inventory
  document.querySelectorAll('.inventory-item.active').forEach(el => {
    el.classList.remove('active');
  });
}

/**
 * Get active powerup info for display
 */
export function getActivePowerupInfo() {
  if (activePowerup === 'slowmo') {
    const remaining = Math.max(0, powerupEndTime - performance.now());
    return {
      type: 'slowmo',
      remaining,
      icon: POWERUPS.slowmo.icon
    };
  }
  if (shieldActive) {
    return {
      type: 'shield',
      icon: POWERUPS.shield.icon
    };
  }
  return null;
}
