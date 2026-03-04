// ==================== UNIVERSE DEFINITIONS ====================
// 8 Universes, each with 12 levels = 96 total levels
// Each universe has unique theme and trap type

export const UNIVERSES = [
  {
    id: 1,
    name: "Nebula",
    description: "The beginning of your journey through space",
    icon: "🌌",
    trapType: "spike",
    trapName: "Stellar Spikes",
    theme: {
      primary: "#00d4ff",
      secondary: "#0088ff",
      background: "linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0d0d20 100%)",
      particleColor: "rgba(0, 212, 255, 0.8)",
      trapGradient: "linear-gradient(180deg, #00d4ff, #0088ff)",
      trapGlow: "rgba(0, 212, 255, 0.5)",
      wallGradient: "linear-gradient(135deg, #00d4ff, #0066cc)",
      wallGlow: "rgba(0, 150, 255, 0.4)"
    },
    preview: false
  },
  {
    id: 2,
    name: "Solar Flare",
    description: "Face the heat of a burning star",
    icon: "☀️",
    trapType: "flame",
    trapName: "Solar Flames",
    theme: {
      primary: "#ff6600",
      secondary: "#ff3300",
      background: "linear-gradient(135deg, #1a0800 0%, #3e1a0a 50%, #200a00 100%)",
      particleColor: "rgba(255, 100, 0, 0.8)",
      trapGradient: "linear-gradient(180deg, #ff6600, #ff0000)",
      trapGlow: "rgba(255, 100, 0, 0.6)",
      wallGradient: "linear-gradient(135deg, #ff8800, #ff4400)",
      wallGlow: "rgba(255, 100, 0, 0.5)"
    },
    preview: true
  },
  {
    id: 3,
    name: "Void Realm",
    description: "Enter the darkness between galaxies",
    icon: "🕳️",
    trapType: "portal",
    trapName: "Void Portals",
    theme: {
      primary: "#a855f7",
      secondary: "#7c3aed",
      background: "linear-gradient(135deg, #05050a 0%, #150a20 50%, #0a0510 100%)",
      particleColor: "rgba(168, 85, 247, 0.8)",
      trapGradient: "linear-gradient(180deg, #a855f7, #6b21a8)",
      trapGlow: "rgba(168, 85, 247, 0.6)",
      wallGradient: "linear-gradient(135deg, #a855f7, #581c87)",
      wallGlow: "rgba(147, 51, 234, 0.5)"
    },
    preview: true
  },
  {
    id: 4,
    name: "Crystal Dimension",
    description: "Navigate through crystalline structures",
    icon: "💎",
    trapType: "crystal",
    trapName: "Crystal Shards",
    theme: {
      primary: "#00ff88",
      secondary: "#00cc66",
      background: "linear-gradient(135deg, #051a0a 0%, #0a3e1a 50%, #05200a 100%)",
      particleColor: "rgba(0, 255, 136, 0.8)",
      trapGradient: "linear-gradient(180deg, #00ff88, #00aa55)",
      trapGlow: "rgba(0, 255, 136, 0.5)",
      wallGradient: "linear-gradient(135deg, #00ff88, #008855)",
      wallGlow: "rgba(0, 200, 100, 0.4)"
    },
    preview: true
  },
  {
    id: 5,
    name: "Plasma Storm",
    description: "Survive the chaotic energy storms",
    icon: "⚡",
    trapType: "bolt",
    trapName: "Plasma Bolts",
    theme: {
      primary: "#ffdd00",
      secondary: "#ffaa00",
      background: "linear-gradient(135deg, #1a1a05 0%, #3e3a0a 50%, #201a05 100%)",
      particleColor: "rgba(255, 221, 0, 0.8)",
      trapGradient: "linear-gradient(180deg, #ffee00, #ff8800)",
      trapGlow: "rgba(255, 220, 0, 0.6)",
      wallGradient: "linear-gradient(135deg, #ffcc00, #ff8800)",
      wallGlow: "rgba(255, 180, 0, 0.5)"
    },
    preview: true
  },
  {
    id: 6,
    name: "Frozen Cosmos",
    description: "Traverse the icy depths of space",
    icon: "❄️",
    trapType: "icicle",
    trapName: "Frost Spears",
    theme: {
      primary: "#88e0ff",
      secondary: "#55c8ff",
      background: "linear-gradient(135deg, #051520 0%, #0a2a3e 50%, #051a25 100%)",
      particleColor: "rgba(136, 224, 255, 0.8)",
      trapGradient: "linear-gradient(180deg, #aaeeff, #55ccff)",
      trapGlow: "rgba(136, 224, 255, 0.5)",
      wallGradient: "linear-gradient(135deg, #88e0ff, #3399cc)",
      wallGlow: "rgba(100, 200, 255, 0.4)"
    },
    preview: true
  },
  {
    id: 7,
    name: "Crimson Galaxy",
    description: "The red giant awaits the brave",
    icon: "🔴",
    trapType: "thorn",
    trapName: "Blood Thorns",
    theme: {
      primary: "#ff4466",
      secondary: "#cc2244",
      background: "linear-gradient(135deg, #1a0508 0%, #3e0a15 50%, #200510 100%)",
      particleColor: "rgba(255, 68, 102, 0.8)",
      trapGradient: "linear-gradient(180deg, #ff4466, #990033)",
      trapGlow: "rgba(255, 68, 102, 0.5)",
      wallGradient: "linear-gradient(135deg, #ff4466, #881133)",
      wallGlow: "rgba(255, 50, 80, 0.4)"
    },
    preview: true
  },
  {
    id: 8,
    name: "Infinity Core",
    description: "The ultimate challenge - master of all",
    icon: "♾️",
    trapType: "blade",
    trapName: "Golden Blades",
    theme: {
      primary: "#ffd700",
      secondary: "#ffaa00",
      background: "linear-gradient(135deg, #1a1505 0%, #3e2a0a 50%, #201805 100%)",
      particleColor: "rgba(255, 215, 0, 0.8)",
      trapGradient: "linear-gradient(180deg, #ffd700, #cc8800)",
      trapGlow: "rgba(255, 215, 0, 0.6)",
      wallGradient: "linear-gradient(135deg, #ffd700, #aa7700)",
      wallGlow: "rgba(255, 180, 0, 0.5)"
    },
    preview: true
  }
];

export const LEVELS_PER_UNIVERSE = 12;

// Get universe by ID
export function getUniverseById(universeId) {
  return UNIVERSES.find(u => u.id === universeId) || UNIVERSES[0];
}

// Check if universe is unlocked
export function isUniverseUnlocked(universeId, completedLevels) {
  if (universeId === 1) return true;
  
  // Check if previous universe is fully completed
  const prevUniverseStartLevel = (universeId - 2) * LEVELS_PER_UNIVERSE + 1;
  const prevUniverseEndLevel = (universeId - 1) * LEVELS_PER_UNIVERSE;
  
  for (let levelId = prevUniverseStartLevel; levelId <= prevUniverseEndLevel; levelId++) {
    if (!completedLevels[levelId]) {
      return false;
    }
  }
  return true;
}

// Get levels for a specific universe
export function getLevelsForUniverse(universeId) {
  const startLevel = (universeId - 1) * LEVELS_PER_UNIVERSE + 1;
  const endLevel = universeId * LEVELS_PER_UNIVERSE;
  return { startLevel, endLevel };
}
