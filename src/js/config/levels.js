// ==================== LEVEL DEFINITIONS ====================
// 8 Universes × 12 Levels = 96 Total Levels
// Each universe gets progressively harder

import { LEVELS_PER_UNIVERSE } from './universes.js';

// Base level templates for each universe
// Each universe has a special obstacle type
const UNIVERSE_CONFIGS = [
  // Universe 1: Nebula (Beginner friendly) - No special obstacles
  {
    universeId: 1,
    baseSpeed: { min: 4, max: 7 },
    spikeGap: { min: 850, max: 1100 },
    wallGap: { min: 2000, max: 2500 },
    hasWalls: false,
    hasPowerups: false,
    specialObstacle: null
  },
  // Universe 2: Solar Flare - Lava floor zones
  {
    universeId: 2,
    baseSpeed: { min: 4, max: 8 },
    spikeGap: { min: 750, max: 1000 },
    wallGap: { min: 1800, max: 2200 },
    hasWalls: false,
    hasPowerups: true,
    specialObstacle: 'lava'
  },
  // Universe 3: Void Realm - Teleport portals (send back)
  {
    universeId: 3,
    baseSpeed: { min: 4.5, max: 8.5 },
    spikeGap: { min: 700, max: 950 },
    wallGap: { min: 1600, max: 2000 },
    hasWalls: true,
    hasPowerups: true,
    specialObstacle: 'portal'
  },
  // Universe 4: Crystal Dimension - Moving crystal walls
  {
    universeId: 4,
    baseSpeed: { min: 5, max: 9 },
    spikeGap: { min: 650, max: 900 },
    wallGap: { min: 1400, max: 1800 },
    hasWalls: true,
    hasPowerups: true,
    specialObstacle: 'movingWall'
  },
  // Universe 5: Plasma Storm - Electric shooting hazards
  {
    universeId: 5,
    baseSpeed: { min: 5.5, max: 10 },
    spikeGap: { min: 600, max: 850 },
    wallGap: { min: 1200, max: 1600 },
    hasWalls: true,
    hasPowerups: true,
    specialObstacle: 'shooter'
  },
  // Universe 6: Frozen Cosmos - High gravity zones
  {
    universeId: 6,
    baseSpeed: { min: 6, max: 11 },
    spikeGap: { min: 550, max: 800 },
    wallGap: { min: 1000, max: 1400 },
    hasWalls: true,
    hasPowerups: true,
    specialObstacle: 'gravity'
  },
  // Universe 7: Crimson Galaxy - Alien shooters
  {
    universeId: 7,
    baseSpeed: { min: 6.5, max: 12 },
    spikeGap: { min: 500, max: 750 },
    wallGap: { min: 900, max: 1300 },
    hasWalls: true,
    hasPowerups: true,
    specialObstacle: 'alien'
  },
  // Universe 8: Infinity Core - All hazards combined
  {
    universeId: 8,
    baseSpeed: { min: 7, max: 14 },
    spikeGap: { min: 450, max: 700 },
    wallGap: { min: 800, max: 1200 },
    hasWalls: true,
    hasPowerups: true,
    specialObstacle: 'all'
  }
];

// Level names for each position in universe (1-12)
const LEVEL_NAMES = [
  "Awakening",
  "First Steps",
  "Rising",
  "Momentum",
  "Breakthrough",
  "Ascension",
  "Trials",
  "Tempest",
  "Crucible",
  "Apex",
  "Transcendence",
  "Finale"
];

// Generate all 96 levels
function generateLevels() {
  const levels = [];
  
  UNIVERSE_CONFIGS.forEach((config, universeIndex) => {
    for (let levelInUniverse = 0; levelInUniverse < LEVELS_PER_UNIVERSE; levelInUniverse++) {
      const globalLevelId = universeIndex * LEVELS_PER_UNIVERSE + levelInUniverse + 1;
      const progressInUniverse = levelInUniverse / (LEVELS_PER_UNIVERSE - 1); // 0 to 1
      
      // Gentle difficulty curve - first 3 levels are much easier
      let difficultyMod = 0;
      if (levelInUniverse >= 3) {
        difficultyMod = ((levelInUniverse - 3) / 8) * 0.3; // Gradual increase from level 4+
      }
      
      // Early level ease bonus (levels 1-3 get extra gaps)
      const earlyLevelBonus = levelInUniverse < 3 ? (3 - levelInUniverse) * 150 : 0;
      
      // Speed scales very gently for early levels
      const speedProgress = levelInUniverse < 3 ? 0 : (levelInUniverse - 3) / 9;
      
      const level = {
        id: globalLevelId,
        universeId: config.universeId,
        levelInUniverse: levelInUniverse + 1,
        name: LEVEL_NAMES[levelInUniverse],
        distance: 500 + (universeIndex * 100) + (levelInUniverse * 80), // Shorter distances
        minSpeed: config.baseSpeed.min + (speedProgress * 1.5),
        maxSpeed: config.baseSpeed.max + (speedProgress * 2),
        spikeGapMin: Math.round(config.spikeGap.min + earlyLevelBonus - (difficultyMod * 80)),
        spikeGapMax: Math.round(config.spikeGap.max + earlyLevelBonus - (difficultyMod * 80)),
        wallGapMin: Math.round(config.wallGap.min + earlyLevelBonus - (difficultyMod * 150)),
        wallGapMax: Math.round(config.wallGap.max + earlyLevelBonus - (difficultyMod * 150)),
        targetScore: 5 + (universeIndex * 5) + (levelInUniverse * 3),
        star1: Math.round((5 + (universeIndex * 5) + (levelInUniverse * 3)) * 0.4),
        star2: Math.round((5 + (universeIndex * 5) + (levelInUniverse * 3)) * 0.7),
        star3: 5 + (universeIndex * 5) + (levelInUniverse * 3),
        hasWalls: config.hasWalls && levelInUniverse >= 5, // Walls only from level 6+
        hasPowerups: config.hasPowerups || levelInUniverse >= 4,
        hasCollectibles: true,
        collectibleRate: 0.6 + (universeIndex * 0.03) + (progressInUniverse * 0.08),
        specialObstacle: levelInUniverse >= 3 ? config.specialObstacle : null // Special obstacles from level 4+
      };
      
      levels.push(level);
    }
  });
  
  return levels;
}

export const LEVELS = generateLevels();

// Helper function to get level by ID
export function getLevelById(levelId) {
  return LEVELS.find(l => l.id === levelId) || LEVELS[0];
}

// Get levels for a specific universe
export function getLevelsByUniverse(universeId) {
  return LEVELS.filter(l => l.universeId === universeId);
}
