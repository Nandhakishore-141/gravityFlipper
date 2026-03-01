// ==================== GAME STATE MANAGEMENT ====================
import { BOX_COLORS } from '../config/colors.js';

// Default game state
const DEFAULT_STATE = {
  currentScreen: 'levels',
  currentLevel: 1,
  score: 0,
  highScore: 0,
  totalDistance: 0,
  totalDiamonds: 0,
  levelCompleted: {},
  unlockedLevels: [1],
  selectedColor: 'cyan',
  equippedColor: 'cyan',
  purchasedColors: ['cyan'], // Cyan is free by default
  settings: {
    soundVolume: 100,
    musicVolume: 100,
    particles: true,
    screenShake: true
  }
};

// Current game state (mutable)
export const gameState = { ...DEFAULT_STATE };

// Load game state from localStorage
export function loadGameState() {
  try {
    const saved = localStorage.getItem('gravityFlipperSave');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(gameState, { ...DEFAULT_STATE, ...parsed });
      
      // Ensure purchasedColors array exists and has cyan
      if (!gameState.purchasedColors) {
        gameState.purchasedColors = ['cyan'];
      }
      if (!gameState.purchasedColors.includes('cyan')) {
        gameState.purchasedColors.push('cyan');
      }
      
      // Ensure equippedColor exists
      if (!gameState.equippedColor) {
        gameState.equippedColor = gameState.selectedColor || 'cyan';
      }
      
      // Ensure totalDiamonds exists
      if (typeof gameState.totalDiamonds !== 'number') {
        gameState.totalDiamonds = 0;
      }
    }
    return gameState;
  } catch (e) {
    console.error('Failed to load game state:', e);
    return gameState;
  }
}

// Save game state to localStorage
export function saveGameState() {
  try {
    localStorage.setItem('gravityFlipperSave', JSON.stringify(gameState));
  } catch (e) {
    console.error('Failed to save game state:', e);
  }
}

// Reset all progress
export function resetProgress() {
  Object.assign(gameState, { ...DEFAULT_STATE });
  saveGameState();
  return gameState;
}

// Add diamonds to total
export function addDiamonds(amount) {
  gameState.totalDiamonds += amount;
  saveGameState();
  return gameState.totalDiamonds;
}

// Spend diamonds (returns true if successful)
export function spendDiamonds(amount) {
  if (gameState.totalDiamonds >= amount) {
    gameState.totalDiamonds -= amount;
    saveGameState();
    return true;
  }
  return false;
}

// Check if a color is purchased
export function isColorPurchased(colorId) {
  return gameState.purchasedColors.includes(colorId);
}

// Purchase a color (returns true if successful)
export function purchaseColor(colorId) {
  const color = BOX_COLORS.find(c => c.id === colorId);
  if (!color) return false;
  
  // Already purchased
  if (isColorPurchased(colorId)) return true;
  
  // Free colors
  if (color.isFree || color.price === 0) {
    gameState.purchasedColors.push(colorId);
    saveGameState();
    return true;
  }
  
  // Try to spend diamonds
  if (spendDiamonds(color.price)) {
    gameState.purchasedColors.push(colorId);
    saveGameState();
    return true;
  }
  
  return false;
}

// Equip a color (must be purchased first)
export function equipColor(colorId) {
  if (!isColorPurchased(colorId)) return false;
  
  gameState.equippedColor = colorId;
  gameState.selectedColor = colorId;
  saveGameState();
  return true;
}

// Get equipped color
export function getEquippedColor() {
  return gameState.equippedColor || 'cyan';
}

// Update settings
export function updateSettings(key, value) {
  if (gameState.settings.hasOwnProperty(key)) {
    gameState.settings[key] = value;
    saveGameState();
  }
}

// Unlock a level
export function unlockLevel(levelId) {
  if (!gameState.unlockedLevels.includes(levelId)) {
    gameState.unlockedLevels.push(levelId);
    saveGameState();
  }
}

// Mark level as completed
export function completeLevel(levelId, stars, score) {
  const existing = gameState.levelCompleted[levelId];
  if (!existing || stars > existing.stars || score > existing.score) {
    gameState.levelCompleted[levelId] = { stars, score };
    saveGameState();
  }
}

// Update high score
export function updateHighScore(newScore) {
  if (newScore > gameState.highScore) {
    gameState.highScore = newScore;
    saveGameState();
  }
}

// Update total distance
export function updateTotalDistance(distance) {
  gameState.totalDistance += distance;
  saveGameState();
}
