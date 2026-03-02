/**
 * Powerups Configuration
 */

export const POWERUPS = {
  slowmo: {
    id: 'slowmo',
    name: 'Slow Motion',
    description: 'Slows down time for 7 seconds',
    icon: '⏱️',
    key: 'q',
    keyDisplay: 'Q',
    price: 25,
    unlockDistance: 2500,
    duration: 7000, // 7 seconds in ms
    speedMultiplier: 0.3, // 30% of normal speed
    color: '#00d4ff',
    glow: 'rgba(0, 212, 255, 0.8)'
  },
  shield: {
    id: 'shield',
    name: 'Shield',
    description: 'Protects from one hit',
    icon: '🛡️',
    key: 's',
    keyDisplay: 'S',
    price: 30,
    unlockDistance: 2000,
    duration: null, // Until hit
    color: '#ffd700',
    glow: 'rgba(255, 215, 0, 0.8)'
  },
  fastforward: {
    id: 'fastforward',
    name: 'Fast Forward',
    description: 'Instantly teleport 150m forward',
    icon: '⚡',
    key: 'f',
    keyDisplay: 'F',
    price: 20,
    unlockDistance: 2500,
    teleportDistance: 150, // meters
    color: '#ff4444',
    glow: 'rgba(255, 68, 68, 0.8)'
  }
};

// Get powerup by key
export function getPowerupByKey(key) {
  return Object.values(POWERUPS).find(p => p.key === key.toLowerCase());
}

// Get all powerups as array
export function getAllPowerups() {
  return Object.values(POWERUPS);
}
