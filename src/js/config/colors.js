// ==================== COLOR DEFINITIONS ====================
// Each color has a price - cyan is free (starter), others cost diamonds
// Animations are based on price tiers: Free, Basic (100), Standard (120), Premium (150-200), Elite (250+), Legendary (500+)

export const BOX_COLORS = [
  // FREE TIER - Basic glow animation
  { 
    id: 'cyan', 
    name: 'Cyan', 
    color: '#00d4ff', 
    glow: 'rgba(0, 212, 255, 0.8)', 
    price: 0, 
    isFree: true,
    tier: 'free',
    animation: 'pulse'  // Simple pulse glow
  },
  
  // BASIC TIER (100 diamonds) - Shimmer effect
  { 
    id: 'pink', 
    name: 'Pink', 
    color: '#ff69b4', 
    glow: 'rgba(255, 105, 180, 0.8)', 
    price: 100,
    tier: 'basic',
    animation: 'shimmer'  // Subtle shimmer
  },
  { 
    id: 'green', 
    name: 'Lime', 
    color: '#00ff88', 
    glow: 'rgba(0, 255, 136, 0.8)', 
    price: 100,
    tier: 'basic',
    animation: 'shimmer'
  },
  { 
    id: 'orange', 
    name: 'Orange', 
    color: '#ff8c00', 
    glow: 'rgba(255, 140, 0, 0.8)', 
    price: 100,
    tier: 'basic',
    animation: 'shimmer'
  },
  
  // STANDARD TIER (120 diamonds) - Wave effect
  { 
    id: 'purple', 
    name: 'Purple', 
    color: '#a855f7', 
    glow: 'rgba(168, 85, 247, 0.8)', 
    price: 120,
    tier: 'standard',
    animation: 'wave'  // Wavy glow effect
  },
  { 
    id: 'red', 
    name: 'Red', 
    color: '#ff4444', 
    glow: 'rgba(255, 68, 68, 0.8)', 
    price: 120,
    tier: 'standard',
    animation: 'wave'
  },
  
  // PREMIUM TIER (150-200 diamonds) - Sparkle effect
  { 
    id: 'yellow', 
    name: 'Yellow', 
    color: '#ffdd00', 
    glow: 'rgba(255, 221, 0, 0.8)', 
    price: 150,
    tier: 'premium',
    animation: 'sparkle'  // Sparkling particles
  },
  { 
    id: 'white', 
    name: 'White', 
    color: '#ffffff', 
    glow: 'rgba(255, 255, 255, 0.8)', 
    price: 150,
    tier: 'premium',
    animation: 'sparkle'
  },
  { 
    id: 'gold', 
    name: 'Gold', 
    color: '#ffd700', 
    glow: 'rgba(255, 215, 0, 0.8)', 
    price: 200,
    tier: 'premium',
    animation: 'sparkle'
  },
  { 
    id: 'teal', 
    name: 'Teal', 
    color: '#20b2aa', 
    glow: 'rgba(32, 178, 170, 0.8)', 
    price: 200,
    tier: 'premium',
    animation: 'sparkle'
  },
  
  // ELITE TIER (250 diamonds) - Aura effect
  { 
    id: 'coral', 
    name: 'Coral', 
    color: '#ff7f50', 
    glow: 'rgba(255, 127, 80, 0.8)', 
    price: 250,
    tier: 'elite',
    animation: 'aura'  // Expanding aura rings
  },
  { 
    id: 'mint', 
    name: 'Mint', 
    color: '#98fb98', 
    glow: 'rgba(152, 251, 152, 0.8)', 
    price: 250,
    tier: 'elite',
    animation: 'aura'
  },
  
  // LEGENDARY TIER (500+ diamonds) - Rainbow cycle + special effects
  { 
    id: 'rainbow', 
    name: 'Rainbow', 
    color: '#ff0000', // Starting color, will animate
    glow: 'rgba(255, 0, 0, 0.8)', 
    price: 500, 
    isRainbow: true,
    isSpecial: true,
    tier: 'legendary',
    animation: 'rainbow'  // Full rainbow cycle with particles
  }
];

// Animation tier definitions with CSS class names
export const ANIMATION_TIERS = {
  free: {
    className: 'anim-pulse',
    description: 'Basic Glow'
  },
  basic: {
    className: 'anim-shimmer',
    description: 'Shimmer Effect'
  },
  standard: {
    className: 'anim-wave',
    description: 'Wave Glow'
  },
  premium: {
    className: 'anim-sparkle',
    description: 'Sparkle Effect'
  },
  elite: {
    className: 'anim-aura',
    description: 'Aura Rings'
  },
  legendary: {
    className: 'anim-rainbow',
    description: 'Rainbow Cycle'
  }
};

// Rainbow color animation colors
export const RAINBOW_COLORS = [
  { color: '#ff0000', glow: 'rgba(255, 0, 0, 0.8)' },     // Red
  { color: '#ff8c00', glow: 'rgba(255, 140, 0, 0.8)' },   // Orange
  { color: '#ffdd00', glow: 'rgba(255, 221, 0, 0.8)' },   // Yellow
  { color: '#00ff88', glow: 'rgba(0, 255, 136, 0.8)' },   // Green
  { color: '#00d4ff', glow: 'rgba(0, 212, 255, 0.8)' },   // Cyan
  { color: '#a855f7', glow: 'rgba(168, 85, 247, 0.8)' },  // Purple
  { color: '#ff69b4', glow: 'rgba(255, 105, 180, 0.8)' }, // Pink
];

// Helper function to get color by ID
export function getColorById(colorId) {
  return BOX_COLORS.find(c => c.id === colorId) || BOX_COLORS[0];
}

// Get animation class for a color
export function getAnimationClass(colorId) {
  const color = getColorById(colorId);
  return ANIMATION_TIERS[color.tier]?.className || 'anim-pulse';
}

// Helper function to adjust color brightness
export function adjustColor(hex, amount) {
  let color = hex.replace('#', '');
  let num = parseInt(color, 16);
  let r = Math.min(255, Math.max(0, (num >> 16) + amount));
  let g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  let b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
}
