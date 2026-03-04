/**
 * Screen Management
 */

import { gameState, saveGameState, setCurrentUniverse, isUniverseUnlocked } from '../core/state.js';
import { LEVELS, getLevelsByUniverse } from '../config/levels.js';
import { UNIVERSES, LEVELS_PER_UNIVERSE, getUniverseById } from '../config/universes.js';
import { playSound } from '../core/audio.js';
import * as dom from '../config/dom.js';
import { renderColorGrid } from '../store/store.js';
import { renderPowerupGrid } from '../store/powerupShop.js';

// Callbacks
let onStartLevel = null;
let displayedUniverse = 1;

/**
 * Set screen callbacks
 */
export function setCallbacks(callbacks) {
  onStartLevel = callbacks.onStartLevel;
}

/**
 * Initialize universe navigation
 */
export function initUniverseNavigation() {
  displayedUniverse = gameState.currentUniverse || 1;
  
  // Initial render
  updateUniverseDisplay();
  renderLevelGrid();
  
  if (dom.prevUniverseBtn) {
    dom.prevUniverseBtn.addEventListener('click', () => {
      if (displayedUniverse > 1) {
        displayedUniverse--;
        updateUniverseDisplay();
        renderLevelGrid();
        playSound('click');
      }
    });
  }
  
  if (dom.nextUniverseBtn) {
    dom.nextUniverseBtn.addEventListener('click', () => {
      if (displayedUniverse < UNIVERSES.length) {
        displayedUniverse++;
        updateUniverseDisplay();
        renderLevelGrid();
        playSound('click');
      }
    });
  }
}

/**
 * Update universe display
 */
export function updateUniverseDisplay() {
  const universe = getUniverseById(displayedUniverse);
  const isUnlocked = isUniverseUnlocked(displayedUniverse);
  
  if (dom.universeIcon) dom.universeIcon.textContent = universe.icon;
  if (dom.universeName) dom.universeName.textContent = universe.name;
  if (dom.universeDesc) dom.universeDesc.textContent = universe.description;
  
  // Calculate progress
  const universeLevels = getLevelsByUniverse(displayedUniverse);
  let completed = 0;
  universeLevels.forEach(level => {
    if (gameState.levelCompleted[level.id]) completed++;
  });
  
  if (dom.universeProgress) {
    dom.universeProgress.textContent = `${completed}/${LEVELS_PER_UNIVERSE} completed`;
  }
  if (dom.universeProgressFill) {
    dom.universeProgressFill.style.width = `${(completed / LEVELS_PER_UNIVERSE) * 100}%`;
  }
  
  // Update navigation buttons
  if (dom.prevUniverseBtn) {
    dom.prevUniverseBtn.style.visibility = displayedUniverse > 1 ? 'visible' : 'hidden';
  }
  if (dom.nextUniverseBtn) {
    dom.nextUniverseBtn.style.visibility = displayedUniverse < UNIVERSES.length ? 'visible' : 'hidden';
  }
  
  // Update selector appearance based on locked state
  if (dom.universeSelector) {
    dom.universeSelector.classList.toggle('locked', !isUnlocked);
    dom.universeSelector.classList.toggle('preview', !isUnlocked);
  }
  
  // Update level hint
  if (dom.levelHint) {
    if (!isUnlocked) {
      dom.levelHint.textContent = `🔒 Complete Universe ${displayedUniverse - 1} to unlock`;
      dom.levelHint.classList.add('locked-hint');
    } else {
      dom.levelHint.textContent = 'Select a level to play';
      dom.levelHint.classList.remove('locked-hint');
    }
  }
}

/**
 * Show a specific screen
 */
export function showScreen(screenName) {
  dom.levelScreen.classList.remove('active');
  dom.settingsScreen.classList.remove('active');
  dom.storeScreen.classList.remove('active');
  dom.powerupShopScreen.classList.remove('active');
  dom.gameScreen.classList.remove('active');
  
  gameState.currentScreen = screenName;
  
  switch(screenName) {
    case 'levels':
      dom.levelScreen.classList.add('active');
      updateHomeStats();
      updateUniverseDisplay();
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
    case 'powerupShop':
      dom.powerupShopScreen.classList.add('active');
      renderPowerupGrid();
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
 * Render level selection grid for current universe
 */
export function renderLevelGrid() {
  if (!dom.levelGrid) {
    console.error('levelGrid element not found');
    return;
  }
  
  dom.levelGrid.innerHTML = '';
  
  const universeLevels = getLevelsByUniverse(displayedUniverse);
  const universeUnlocked = isUniverseUnlocked(displayedUniverse);
  
  if (!universeLevels || universeLevels.length === 0) {
    console.error('No levels found for universe', displayedUniverse);
    return;
  }
  
  universeLevels.forEach(level => {
    const card = document.createElement('div');
    card.className = 'level-card';
    
    const isCompleted = gameState.levelCompleted[level.id] || false;
    const isUnlocked = universeUnlocked && (gameState.unlockedLevels.includes(level.id) || isCompleted);
    
    // Safely calculate current level
    let currentLevelId = 0;
    try {
      const unlockedInUniverse = gameState.unlockedLevels.filter(l => {
        const lvl = LEVELS.find(ll => ll.id === l);
        return lvl && lvl.universeId === displayedUniverse;
      });
      currentLevelId = unlockedInUniverse.length > 0 ? Math.max(...unlockedInUniverse) : 0;
    } catch (e) {
      console.error('Error calculating current level:', e);
    }
    const isCurrent = universeUnlocked && level.id === currentLevelId;
    
    if (!universeUnlocked) {
      // Universe is locked - show preview
      card.classList.add('locked', 'preview');
      card.innerHTML = `
        <span class="level-number preview">${level.levelInUniverse}</span>
        <span class="level-name preview">${level.name}</span>
        <span class="level-lock-overlay">🔒</span>
      `;
    } else if (!isUnlocked) {
      card.classList.add('locked');
      card.innerHTML = `<span class="level-lock">🔒</span>`;
    } else {
      if (isCompleted) {
        card.classList.add('completed');
      } else if (isCurrent) {
        card.classList.add('current');
      }
      
      card.innerHTML = `
        <span class="level-number">${level.levelInUniverse}</span>
        <span class="level-name">${level.name}</span>
        ${isCompleted ? '<span class="level-check">✓</span>' : ''}
      `;
      
      const handleLevelSelect = (e) => {
        e.preventDefault();
        e.stopPropagation();
        playSound('click');
        setCurrentUniverse(displayedUniverse);
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
