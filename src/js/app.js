/**
 * Application Entry Point
 * Initializes all game modules and starts the app
 */

import { loadGameState } from './core/state.js';
import { unlockAudio } from './core/audio.js';
import * as dom from './config/dom.js';
import { showScreen, setCallbacks as setScreenCallbacks, updateHomeStats, renderLevelGrid } from './ui/screens.js';
import { createBackgroundParticles } from './ui/particles.js';
import { initEventListeners } from './ui/events.js';
import { startLevel, setCallbacks as setEngineCallbacks } from './game/engine.js';
import { initStore, applyBoxColor } from './store/store.js';

/**
 * Initialize the application
 */
export function initApp() {
  // Load saved game state
  loadGameState();
  
  // Set up screen callbacks
  setScreenCallbacks({
    onStartLevel: (levelId) => {
      showScreen('game');
      startLevel(levelId);
    }
  });
  
  // Set up engine callbacks
  setEngineCallbacks({
    onGameOver: () => {},
    onLevelComplete: () => {}
  });
  
  // Initialize store
  initStore({
    colorGrid: dom.colorGrid,
    previewBox: dom.previewBox,
    previewName: dom.previewName,
    diamondDisplay: document.getElementById('storeDiamonds'),
    box: dom.box
  });
  
  // Apply equipped box color
  applyBoxColor();
  
  // Initialize event listeners
  initEventListeners();
  
  // Create background particles
  createBackgroundParticles();
  
  // Update home stats
  updateHomeStats();
  renderLevelGrid();
  
  // Show initial screen
  showScreen('levels');
  
  console.log('Gravity Flipper initialized');
}
