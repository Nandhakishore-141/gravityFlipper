/**
 * Event Listeners Setup
 */

import { playSound, unlockAudio, updateMusicVolume } from '../core/audio.js';
import { gameState, saveGameState, resetProgress } from '../core/state.js';
import * as dom from '../config/dom.js';
import { showScreen, updateSettingsUI, updateVolumeIcon } from './screens.js';
import * as engine from '../game/engine.js';

/**
 * Initialize all event listeners
 */
export function initEventListeners() {
  // Navigation buttons
  dom.settingsBtn.addEventListener('click', () => { 
    playSound('click'); 
    showScreen('settings'); 
  });
  dom.settingsBackBtn.addEventListener('click', () => { 
    playSound('click'); 
    showScreen('levels'); 
  });
  dom.storeBtn.addEventListener('click', () => { 
    playSound('click'); 
    showScreen('store'); 
  });
  dom.storeBackBtn.addEventListener('click', () => { 
    playSound('click'); 
    showScreen('levels'); 
  });

  // Settings volume sliders
  dom.soundVolume.addEventListener('input', (e) => {
    gameState.settings.soundVolume = parseInt(e.target.value);
    dom.soundValue.textContent = gameState.settings.soundVolume + '%';
    updateVolumeIcon(dom.soundIcon, gameState.settings.soundVolume);
    saveGameState();
  });

  dom.soundVolume.addEventListener('change', () => {
    playSound('click');
  });

  dom.musicVolume.addEventListener('input', (e) => {
    gameState.settings.musicVolume = parseInt(e.target.value);
    dom.musicValue.textContent = gameState.settings.musicVolume + '%';
    updateVolumeIcon(dom.musicIcon, gameState.settings.musicVolume);
    updateMusicVolume();
    saveGameState();
  });

  dom.particlesToggle.addEventListener('click', () => {
    playSound('click');
    gameState.settings.particles = !gameState.settings.particles;
    updateSettingsUI();
    saveGameState();
  });

  dom.shakeToggle.addEventListener('click', () => {
    playSound('click');
    gameState.settings.screenShake = !gameState.settings.screenShake;
    updateSettingsUI();
    saveGameState();
  });

  dom.resetBtn.addEventListener('click', () => {
    playSound('click');
    if (confirm('Are you sure you want to reset all progress?')) {
      resetProgress();
      showScreen('levels');
    }
  });

  // Game control buttons
  dom.pauseBtn.addEventListener('click', () => { 
    playSound('click'); 
    engine.pauseGame(); 
  });
  
  dom.resumeBtn.addEventListener('click', () => { 
    if (!dom.pauseOverlay.classList.contains('hidden')) {
      playSound('click'); 
      engine.resumeGame(); 
    }
  });
  
  dom.restartBtn.addEventListener('click', () => { 
    if (!dom.pauseOverlay.classList.contains('hidden')) {
      playSound('click'); 
      engine.restartLevel(); 
    }
  });
  
  dom.quitBtn.addEventListener('click', () => { 
    if (!dom.pauseOverlay.classList.contains('hidden')) {
      playSound('click'); 
      engine.quitToMenu(showScreen); 
    }
  });
  
  dom.retryBtn.addEventListener('click', () => { 
    if (!dom.gameOverOverlay.classList.contains('hidden')) {
      playSound('click'); 
      engine.restartLevel(); 
    }
  });
  
  dom.menuBtn.addEventListener('click', () => { 
    if (!dom.gameOverOverlay.classList.contains('hidden')) {
      playSound('click'); 
      engine.quitToMenu(showScreen); 
    }
  });
  
  dom.nextLevelBtn.addEventListener('click', () => { 
    if (!dom.levelCompleteOverlay.classList.contains('hidden')) {
      playSound('click'); 
      engine.nextLevel(); 
    }
  });
  
  dom.replayBtn.addEventListener('click', () => { 
    if (!dom.levelCompleteOverlay.classList.contains('hidden')) {
      playSound('click'); 
      engine.restartLevel(); 
    }
  });
  
  dom.lcMenuBtn.addEventListener('click', () => { 
    if (!dom.levelCompleteOverlay.classList.contains('hidden')) {
      playSound('click'); 
      engine.quitToMenu(showScreen); 
    }
  });

  // Touch support for buttons
  setupTouchListeners();

  // Keyboard controls
  window.addEventListener("keydown", handleKeyDown);

  // Touch/click controls for game
  dom.game.addEventListener("pointerdown", handleGamePointer);

  // Window resize
  window.addEventListener("resize", engine.handleResize);

  // Audio unlock
  document.addEventListener('click', unlockAudio);
  document.addEventListener('touchstart', unlockAudio);
  document.addEventListener('keydown', unlockAudio);
}

/**
 * Setup touch listeners for mobile
 */
function setupTouchListeners() {
  dom.pauseBtn.addEventListener('touchend', (e) => { 
    e.preventDefault(); 
    playSound('click'); 
    engine.pauseGame(); 
  });
  
  dom.resumeBtn.addEventListener('touchend', (e) => { 
    e.preventDefault(); 
    if (!dom.pauseOverlay.classList.contains('hidden')) {
      playSound('click'); 
      engine.resumeGame(); 
    }
  });
  
  dom.restartBtn.addEventListener('touchend', (e) => { 
    e.preventDefault(); 
    if (!dom.pauseOverlay.classList.contains('hidden')) {
      playSound('click'); 
      engine.restartLevel(); 
    }
  });
  
  dom.quitBtn.addEventListener('touchend', (e) => { 
    e.preventDefault(); 
    if (!dom.pauseOverlay.classList.contains('hidden')) {
      playSound('click'); 
      engine.quitToMenu(showScreen); 
    }
  });
  
  dom.retryBtn.addEventListener('touchend', (e) => { 
    e.preventDefault(); 
    if (!dom.gameOverOverlay.classList.contains('hidden')) {
      playSound('click'); 
      engine.restartLevel(); 
    }
  });
  
  dom.menuBtn.addEventListener('touchend', (e) => { 
    e.preventDefault(); 
    if (!dom.gameOverOverlay.classList.contains('hidden')) {
      playSound('click'); 
      engine.quitToMenu(showScreen); 
    }
  });
  
  dom.nextLevelBtn.addEventListener('touchend', (e) => { 
    e.preventDefault(); 
    if (!dom.levelCompleteOverlay.classList.contains('hidden')) {
      playSound('click'); 
      engine.nextLevel(); 
    }
  });
  
  dom.replayBtn.addEventListener('touchend', (e) => { 
    e.preventDefault(); 
    if (!dom.levelCompleteOverlay.classList.contains('hidden')) {
      playSound('click'); 
      engine.restartLevel(); 
    }
  });
  
  dom.lcMenuBtn.addEventListener('touchend', (e) => { 
    e.preventDefault(); 
    if (!dom.levelCompleteOverlay.classList.contains('hidden')) {
      playSound('click'); 
      engine.quitToMenu(showScreen); 
    }
  });
}

/**
 * Check if event is space key
 */
function isSpaceInput(event) {
  return event.code === "Space" || event.key === " " || event.key === "Spacebar";
}

/**
 * Handle keyboard input
 */
function handleKeyDown(event) {
  if (isSpaceInput(event) && !event.repeat) {
    event.preventDefault();
    
    const state = engine.getGameState();
    
    if (gameState.currentScreen === 'levels') {
      const highestLevel = Math.max(...gameState.unlockedLevels);
      showScreen('game');
      engine.startLevel(highestLevel);
    } else if (gameState.currentScreen === 'game') {
      const anyOverlayVisible = !dom.pauseOverlay.classList.contains('hidden') ||
                                !dom.gameOverOverlay.classList.contains('hidden') ||
                                !dom.levelCompleteOverlay.classList.contains('hidden');
                                
      if (state.isPaused && !dom.pauseOverlay.classList.contains('hidden')) {
        engine.resumeGame();
      } else if (!anyOverlayVisible && state.isGameRunning) {
        engine.handleFlip();
      }
    }
  }
  
  if (event.key === 'Escape') {
    const state = engine.getGameState();
    
    if (gameState.currentScreen === 'game' && state.isGameRunning) {
      if (state.isPaused) {
        engine.resumeGame();
      } else {
        engine.pauseGame();
      }
    } else if (gameState.currentScreen === 'settings' || gameState.currentScreen === 'store') {
      showScreen('levels');
    }
  }
}

/**
 * Handle game area pointer input
 */
function handleGamePointer(e) {
  if (e.target.closest('.game-hud') || e.target.closest('.pause-btn')) return;
  if (e.target.closest('.overlay')) return;
  
  const anyOverlayVisible = !dom.pauseOverlay.classList.contains('hidden') ||
                            !dom.gameOverOverlay.classList.contains('hidden') ||
                            !dom.levelCompleteOverlay.classList.contains('hidden');
  if (anyOverlayVisible) return;
  
  engine.handleFlip();
}
