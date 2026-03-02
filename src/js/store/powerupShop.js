/**
 * Powerups Shop Module
 */

import { POWERUPS, getAllPowerups } from '../config/powerups.js';
import { 
  gameState, 
  saveGameState, 
  isPowerupUnlocked, 
  getPowerupCount, 
  purchasePowerup 
} from '../core/state.js';
import { playSound } from '../core/audio.js';

// DOM Elements
let powerupGrid = null;
let powerupDiamondDisplay = null;

/**
 * Initialize powerup shop with DOM elements
 */
export function initPowerupShop(elements) {
  powerupGrid = elements.powerupGrid;
  powerupDiamondDisplay = elements.powerupDiamondDisplay;
}

/**
 * Render the powerup shop grid
 */
export function renderPowerupGrid() {
  if (!powerupGrid) return;
  
  powerupGrid.innerHTML = '';
  
  const powerups = getAllPowerups();
  
  powerups.forEach(powerup => {
    const card = document.createElement('div');
    card.className = 'powerup-card';
    card.dataset.powerupId = powerup.id;
    
    const isUnlocked = isPowerupUnlocked(powerup.id, powerup.unlockDistance);
    const ownedCount = getPowerupCount(powerup.id);
    const canAfford = gameState.totalDiamonds >= powerup.price;
    
    if (!isUnlocked) {
      card.classList.add('locked');
    }
    
    // Icon
    const icon = document.createElement('div');
    icon.className = 'powerup-icon';
    icon.textContent = powerup.icon;
    icon.style.color = powerup.color;
    icon.style.textShadow = `0 0 10px ${powerup.glow}`;
    
    // Name
    const name = document.createElement('div');
    name.className = 'powerup-name';
    name.textContent = powerup.name;
    
    // Description
    const desc = document.createElement('div');
    desc.className = 'powerup-desc';
    desc.textContent = powerup.description;
    
    // Key hint
    const keyHint = document.createElement('div');
    keyHint.className = 'powerup-key';
    keyHint.innerHTML = `Press <span class="key-badge">${powerup.keyDisplay}</span> to use`;
    
    // Owned count
    const owned = document.createElement('div');
    owned.className = 'powerup-owned';
    owned.innerHTML = `Owned: <span class="owned-count">${ownedCount}</span>`;
    
    // Price or lock info
    const priceDiv = document.createElement('div');
    priceDiv.className = 'powerup-price';
    
    if (!isUnlocked) {
      priceDiv.innerHTML = `<span class="lock-info">🔒 Unlock at ${powerup.unlockDistance}m</span>`;
    } else {
      priceDiv.innerHTML = `<span class="diamond-icon">💎</span> ${powerup.price}`;
    }
    
    // Buy button
    const buyBtn = document.createElement('button');
    buyBtn.className = 'powerup-buy-btn';
    
    if (!isUnlocked) {
      buyBtn.textContent = 'LOCKED';
      buyBtn.classList.add('btn-locked');
      buyBtn.disabled = true;
    } else if (!canAfford) {
      buyBtn.textContent = 'BUY';
      buyBtn.classList.add('btn-disabled');
    } else {
      buyBtn.textContent = 'BUY';
      buyBtn.classList.add('btn-buy');
      buyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleBuyPowerup(powerup.id);
      });
    }
    
    // Assemble card
    card.appendChild(icon);
    card.appendChild(name);
    card.appendChild(desc);
    card.appendChild(keyHint);
    card.appendChild(owned);
    card.appendChild(priceDiv);
    card.appendChild(buyBtn);
    
    powerupGrid.appendChild(card);
  });
  
  updatePowerupDiamonds();
}

/**
 * Handle buying a powerup
 */
function handleBuyPowerup(powerupId) {
  const powerup = POWERUPS[powerupId];
  if (!powerup) return;
  
  if (purchasePowerup(powerupId, powerup.price)) {
    playSound('purchase');
    showPowerupNotification(`Purchased ${powerup.name}!`, 'success');
    renderPowerupGrid();
    updateMenuDiamonds();
  } else {
    playSound('error');
    showPowerupNotification(`Not enough diamonds!`, 'error');
  }
}

/**
 * Update diamond display in powerup shop
 */
function updatePowerupDiamonds() {
  if (powerupDiamondDisplay) {
    powerupDiamondDisplay.textContent = gameState.totalDiamonds;
  }
}

/**
 * Update menu diamond display
 */
function updateMenuDiamonds() {
  const menuDiamonds = document.getElementById('menuDiamonds');
  if (menuDiamonds) {
    menuDiamonds.textContent = gameState.totalDiamonds;
  }
}

/**
 * Show notification
 */
function showPowerupNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `powerup-notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => notification.classList.add('show'), 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

/**
 * Refresh the shop display
 */
export function refreshPowerupShop() {
  renderPowerupGrid();
  updatePowerupDiamonds();
}
