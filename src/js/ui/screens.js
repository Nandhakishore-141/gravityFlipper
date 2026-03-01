/**
 * Screen Management
 */

import { gameState, saveGameState } from '../core/state.js';
import { LEVELS } from '../config/levels.js';
import { playSound } from '../core/audio.js';
import * as dom from '../config/dom.js';
import { renderColorGrid } from '../store/store.js';

// Callbacks
let onStartLevel = null;

/**
 * Set screen callbacks
 */
export function setCallbacks(callbacks) {
  onStartLevel = callbacks.onStartLevel;
}

/**
 * Show a specific screen
 */
export function showScreen(screenName) {
  dom.levelScreen.classList.remove('active');
  dom.settingsScreen.classList.remove('active');
  dom.storeScreen.classList.remove('active');
  dom.gameScreen.classList.remove('active');
  
  gameState.currentScreen = screenName;
  
  switch(screenName) {
    case 'levels':
      dom.levelScreen.classList.add('active');
      updateHomeStats();
      renderLevelGrid();
      break;
    case 'settings':
      dom.settingsScreen.classList.add('active');
      updateSettingsUI();
      break;
    case 'store':
      dom.storeScreen.classList.add('active');
      renderColorGrid();
      break;
    case 'game':
      dom.gameScreen.classList.add('active');
      break;
  }
}

/**
 * Update home screen stats
 */
export function updateHomeStats() {
  dom.menuHighScore.textContent = gameState.highScore;
  dom.totalDistanceDisplay.textContent = gameState.totalDistance || 0;
  
  const menuDiamondsEl = document.getElementById('menuDiamonds');
  if (menuDiamondsEl) {
    menuDiamondsEl.textContent = gameState.totalDiamonds || 0;
  }
}

/**
 * Render level selection grid
 */
export function renderLevelGrid() {
  dom.levelGrid.innerHTML = '';
  
  LEVELS.forEach(level => {
    const card = document.createElement('div');
    card.className = 'level-card';
    
    const isCompleted = gameState.levelCompleted[level.id] || false;
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
      
      const handleLevelSelect = (e) => {
        e.preventDefault();
        e.stopPropagation();
        playSound('click');
        if (onStartLevel) onStartLevel(level.id);
      };
      card.addEventListener('click', handleLevelSelect);
      card.addEventListener('touchend', handleLevelSelect);
    }
    
    dom.levelGrid.appendChild(card);
  });
}

/**
 * Update settings UI
 */
export function updateSettingsUI() {
  dom.soundVolume.value = gameState.settings.soundVolume;
  dom.soundValue.textContent = gameState.settings.soundVolume + '%';
  updateVolumeIcon(dom.soundIcon, gameState.settings.soundVolume);
  
  dom.musicVolume.value = gameState.settings.musicVolume;
  dom.musicValue.textContent = gameState.settings.musicVolume + '%';
  updateVolumeIcon(dom.musicIcon, gameState.settings.musicVolume);
  
  dom.particlesToggle.classList.toggle('active', gameState.settings.particles);
  dom.particlesToggle.textContent = gameState.settings.particles ? 'ON' : 'OFF';
  
  dom.shakeToggle.classList.toggle('active', gameState.settings.screenShake);
  dom.shakeToggle.textContent = gameState.settings.screenShake ? 'ON' : 'OFF';
}

/**
 * Update volume icon based on level
 */
function updateVolumeIcon(iconElement, volume) {
  if (volume === 0) {
    iconElement.textContent = '🔇';
  } else if (volume < 50) {
    iconElement.textContent = '🔉';
  } else {
    iconElement.textContent = '🔊';
  }
}

export { updateVolumeIcon };
