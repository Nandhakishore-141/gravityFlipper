// ==================== GAME STATE MANAGEMENT ====================
import { BOX_COLORS } from '../config/colors.js';

// Default game state
const DEFAULT_STATE = {
  currentScreen: 'levels',
  currentLevel: 1,
  currentUniverse: 1,
  score: 0,
  highScore: 0,
  totalDistance: 0,
  totalDiamonds: 0,
  levelCompleted: {},
  unlockedLevels: [1],
  unlockedUniverses: [1], // Track unlocked universes
  levelAttempts: {}, // Track attempts per level
  selectedColor: 'cyan',
  equippedColor: 'cyan',
  purchasedColors: ['cyan'], // Cyan is free by default
  // Powerups inventory (count of each powerup owned)
  powerups: {
    slowmo: 0,
    shield: 0,
    fastforward: 0
  },
  // Powerups unlocked (based on total distance)
  unlockedPowerups: [],
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
      
      // Ensure powerups object exists
      if (!gameState.powerups) {
        gameState.powerups = { slowmo: 0, shield: 0, fastforward: 0 };
      }
      
      // Ensure unlockedPowerups array exists
      if (!gameState.unlockedPowerups) {
        gameState.unlockedPowerups = [];
      }
      
      // Ensure levelAttempts object exists
      if (!gameState.levelAttempts) {
        gameState.levelAttempts = {};
      }
      
      // Ensure unlockedUniverses array exists
      if (!gameState.unlockedUniverses) {
        gameState.unlockedUniverses = [1];
      }
      
      // Ensure currentUniverse exists
      if (!gameState.currentUniverse) {
        gameState.currentUniverse = 1;
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

// ==================== POWERUP MANAGEMENT ====================

// Check if powerup is unlocked (based on total distance)
export function isPowerupUnlocked(powerupId, unlockDistance) {
  return gameState.totalDistance >= unlockDistance || 
         (gameState.unlockedPowerups && gameState.unlockedPowerups.includes(powerupId));
}

// Unlock a powerup
export function unlockPowerup(powerupId) {
  if (!gameState.unlockedPowerups) {
    gameState.unlockedPowerups = [];
  }
  if (!gameState.unlockedPowerups.includes(powerupId)) {
    gameState.unlockedPowerups.push(powerupId);
    saveGameState();
  }
}

// Get powerup count
export function getPowerupCount(powerupId) {
  if (!gameState.powerups) {
    gameState.powerups = { slowmo: 0, shield: 0, fastforward: 0 };
  }
  return gameState.powerups[powerupId] || 0;
}

// Purchase a powerup (returns true if successful)
export function purchasePowerup(powerupId, price) {
  if (gameState.totalDiamonds < price) {
    return false;
  }
  
  if (!gameState.powerups) {
    gameState.powerups = { slowmo: 0, shield: 0, fastforward: 0 };
  }
  
  gameState.totalDiamonds -= price;
  gameState.powerups[powerupId] = (gameState.powerups[powerupId] || 0) + 1;
  saveGameState();
  return true;
}

// Use a powerup (returns true if successful)
export function usePowerup(powerupId) {
  if (!gameState.powerups || gameState.powerups[powerupId] <= 0) {
    return false;
  }
  
  gameState.powerups[powerupId]--;
  saveGameState();
  return true;
}

// ==================== LEVEL ATTEMPTS MANAGEMENT ====================

// Get attempts for a level
export function getLevelAttempts(levelId) {
  if (!gameState.levelAttempts) {
    gameState.levelAttempts = {};
  }
  return gameState.levelAttempts[levelId] || 0;
}

// Increment attempts for a level
export function incrementLevelAttempts(levelId) {
  if (!gameState.levelAttempts) {
    gameState.levelAttempts = {};
  }
  gameState.levelAttempts[levelId] = (gameState.levelAttempts[levelId] || 0) + 1;
  saveGameState();
  return gameState.levelAttempts[levelId];
}

// ==================== UNIVERSE MANAGEMENT ====================

// Set current universe
export function setCurrentUniverse(universeId) {
  gameState.currentUniverse = universeId;
  saveGameState();
}

// Get current universe
export function getCurrentUniverse() {
  return gameState.currentUniverse || 1;
}

// Unlock a universe
export function unlockUniverse(universeId) {
  if (!gameState.unlockedUniverses) {
    gameState.unlockedUniverses = [1];
  }
  if (!gameState.unlockedUniverses.includes(universeId)) {
    gameState.unlockedUniverses.push(universeId);
    saveGameState();
  }
}

// Check if universe is unlocked
export function isUniverseUnlocked(universeId) {
  if (!gameState.unlockedUniverses) {
    gameState.unlockedUniverses = [1];
  }
  return gameState.unlockedUniverses.includes(universeId);
}

// Check and unlock next universe if all levels in current universe are completed
export function checkUniverseCompletion() {
  const LEVELS_PER_UNIVERSE = 12;
  const currentLevel = gameState.currentLevel;
  const universeId = Math.ceil(currentLevel / LEVELS_PER_UNIVERSE);
  
  const startLevel = (universeId - 1) * LEVELS_PER_UNIVERSE + 1;
  const endLevel = universeId * LEVELS_PER_UNIVERSE;
  
  let allCompleted = true;
  for (let levelId = startLevel; levelId <= endLevel; levelId++) {
    if (!gameState.levelCompleted[levelId]) {
      allCompleted = false;
      break;
    }
  }
  
  if (allCompleted && universeId < 8) {
    unlockUniverse(universeId + 1);
    return universeId + 1; // Return newly unlocked universe
  }
  return null;
}
