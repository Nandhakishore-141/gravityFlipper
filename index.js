// ==================== DOM ELEMENTS ====================
const bgParticles = document.getElementById("bgParticles");
const menuScreen = document.getElementById("menuScreen");
const levelScreen = document.getElementById("levelScreen");
const settingsScreen = document.getElementById("settingsScreen");
const gameScreen = document.getElementById("gameScreen");
const game = document.getElementById("game");
const boxWrap = document.getElementById("boxWrap");
const box = document.getElementById("box");
const spikesTopContainer = document.getElementById("spikesTop");
const spikesBottomContainer = document.getElementById("spikesBottom");
const wallsContainer = document.getElementById("walls");
const collectiblesContainer = document.getElementById("collectibles");

// HUD Elements
const scoreDisplay = document.getElementById("scoreDisplay");
const currentLevelDisplay = document.getElementById("currentLevel");
const comboDisplay = document.getElementById("comboDisplay");
const comboValue = document.getElementById("comboValue");
const progressFill = document.getElementById("progressFill");
const speedBarFill = document.getElementById("speedBarFill");
const speedValue = document.getElementById("speedValue");
const distanceDisplay = document.getElementById("distanceDisplay");
const gameMessage = document.getElementById("gameMessage");
const messageText = document.getElementById("messageText");

// Menu Elements
const menuHighScore = document.getElementById("menuHighScore");
const totalDistanceDisplay = document.getElementById("totalDistance");
const settingsBtn = document.getElementById("settingsBtn");
const settingsBackBtn = document.getElementById("settingsBackBtn");
const levelGrid = document.getElementById("levelGrid");

// Settings Elements
const soundVolume = document.getElementById("soundVolume");
const soundValue = document.getElementById("soundValue");
const soundIcon = document.getElementById("soundIcon");
const musicVolume = document.getElementById("musicVolume");
const musicValue = document.getElementById("musicValue");
const musicIcon = document.getElementById("musicIcon");
const particlesToggle = document.getElementById("particlesToggle");
const shakeToggle = document.getElementById("shakeToggle");
const resetBtn = document.getElementById("resetBtn");

// Store Elements
const storeScreen = document.getElementById("storeScreen");
const storeBtn = document.getElementById("storeBtn");
const storeBackBtn = document.getElementById("storeBackBtn");
const colorGrid = document.getElementById("colorGrid");
const previewBox = document.getElementById("previewBox");
const previewName = document.getElementById("previewName");

// Available Colors
const BOX_COLORS = [
  { id: 'cyan', name: 'Cyan', color: '#00d4ff', glow: 'rgba(0, 212, 255, 0.8)' },
  { id: 'pink', name: 'Pink', color: '#ff69b4', glow: 'rgba(255, 105, 180, 0.8)' },
  { id: 'green', name: 'Lime', color: '#00ff88', glow: 'rgba(0, 255, 136, 0.8)' },
  { id: 'orange', name: 'Orange', color: '#ff8c00', glow: 'rgba(255, 140, 0, 0.8)' },
  { id: 'purple', name: 'Purple', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.8)' },
  { id: 'red', name: 'Red', color: '#ff4444', glow: 'rgba(255, 68, 68, 0.8)' },
  { id: 'yellow', name: 'Yellow', color: '#ffdd00', glow: 'rgba(255, 221, 0, 0.8)' },
  { id: 'white', name: 'White', color: '#ffffff', glow: 'rgba(255, 255, 255, 0.8)' },
  { id: 'gold', name: 'Gold', color: '#ffd700', glow: 'rgba(255, 215, 0, 0.8)' },
  { id: 'teal', name: 'Teal', color: '#20b2aa', glow: 'rgba(32, 178, 170, 0.8)' },
  { id: 'coral', name: 'Coral', color: '#ff7f50', glow: 'rgba(255, 127, 80, 0.8)' },
  { id: 'mint', name: 'Mint', color: '#98fb98', glow: 'rgba(152, 251, 152, 0.8)' }
];

// Overlay Elements
const pauseOverlay = document.getElementById("pauseOverlay");
const gameOverOverlay = document.getElementById("gameOverOverlay");
const levelCompleteOverlay = document.getElementById("levelCompleteOverlay");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const restartBtn = document.getElementById("restartBtn");
const quitBtn = document.getElementById("quitBtn");
const retryBtn = document.getElementById("retryBtn");
const menuBtn = document.getElementById("menuBtn");
const nextLevelBtn = document.getElementById("nextLevelBtn");
const replayBtn = document.getElementById("replayBtn");
const lcMenuBtn = document.getElementById("lcMenuBtn");
const pauseScore = document.getElementById("pauseScore");
const pauseLevel = document.getElementById("pauseLevel");
const finalScore = document.getElementById("finalScore");
const finalDistance = document.getElementById("finalDistance");
const bestScore = document.getElementById("bestScore");
const lcScore = document.getElementById("lcScore");
const lcDistance = document.getElementById("lcDistance");
const lcTime = document.getElementById("lcTime");

// ==================== GAME CONSTANTS ====================
const boundaryOffset = 14;
const boundaryThickness = 4;
const baseGravityForce = 0.62;
const cameraFollowX = 260;
const boxSize = 42;

// ==================== LEVEL DEFINITIONS ====================
const LEVELS = [
  { id: 1, name: "Beginner", distance: 1500, minSpeed: 3.9, maxSpeed: 6.5, spikeGapMin: 450, spikeGapMax: 600, wallGapMin: 1200, wallGapMax: 1600, targetScore: 15, star1: 8, star2: 12, star3: 15, hasWalls: false, hasPowerups: false, hasCollectibles: true, collectibleRate: 0.3 },
  { id: 2, name: "Easy", distance: 1500, minSpeed: 4.16, maxSpeed: 7.15, spikeGapMin: 420, spikeGapMax: 560, wallGapMin: 1100, wallGapMax: 1500, targetScore: 20, star1: 10, star2: 16, star3: 20, hasWalls: true, hasPowerups: false, hasCollectibles: true, collectibleRate: 0.35 },
  { id: 3, name: "Warming Up", distance: 1500, minSpeed: 4.42, maxSpeed: 7.8, spikeGapMin: 400, spikeGapMax: 540, wallGapMin: 1050, wallGapMax: 1400, targetScore: 25, star1: 12, star2: 20, star3: 25, hasWalls: true, hasPowerups: true, hasCollectibles: true, collectibleRate: 0.4 },
  { id: 4, name: "Getting Tricky", distance: 1500, minSpeed: 4.68, maxSpeed: 8.45, spikeGapMin: 380, spikeGapMax: 520, wallGapMin: 1000, wallGapMax: 1350, targetScore: 30, star1: 15, star2: 24, star3: 30, hasWalls: true, hasPowerups: true, hasCollectibles: true, collectibleRate: 0.4 },
  { id: 5, name: "Speedy", distance: 1500, minSpeed: 4.94, maxSpeed: 9.1, spikeGapMin: 360, spikeGapMax: 500, wallGapMin: 950, wallGapMax: 1300, targetScore: 35, star1: 18, star2: 28, star3: 35, hasWalls: true, hasPowerups: true, hasCollectibles: true, collectibleRate: 0.45 },
  { id: 6, name: "Intense", distance: 1500, minSpeed: 5.2, maxSpeed: 9.75, spikeGapMin: 340, spikeGapMax: 480, wallGapMin: 900, wallGapMax: 1250, targetScore: 40, star1: 20, star2: 32, star3: 40, hasWalls: true, hasPowerups: true, hasCollectibles: true, collectibleRate: 0.45 },
  { id: 7, name: "Challenging", distance: 1500, minSpeed: 5.46, maxSpeed: 10.4, spikeGapMin: 320, spikeGapMax: 460, wallGapMin: 850, wallGapMax: 1200, targetScore: 45, star1: 22, star2: 36, star3: 45, hasWalls: true, hasPowerups: true, hasCollectibles: true, collectibleRate: 0.5 },
  { id: 8, name: "Hard", distance: 1500, minSpeed: 5.72, maxSpeed: 11.05, spikeGapMin: 300, spikeGapMax: 440, wallGapMin: 800, wallGapMax: 1150, targetScore: 50, star1: 25, star2: 40, star3: 50, hasWalls: true, hasPowerups: true, hasCollectibles: true, collectibleRate: 0.5 },
  { id: 9, name: "Expert", distance: 1500, minSpeed: 5.98, maxSpeed: 11.7, spikeGapMin: 280, spikeGapMax: 420, wallGapMin: 750, wallGapMax: 1100, targetScore: 60, star1: 30, star2: 48, star3: 60, hasWalls: true, hasPowerups: true, hasCollectibles: true, collectibleRate: 0.55 },
  { id: 10, name: "Master", distance: 1500, minSpeed: 6.5, maxSpeed: 13.0, spikeGapMin: 260, spikeGapMax: 400, wallGapMin: 700, wallGapMax: 1000, targetScore: 75, star1: 35, star2: 60, star3: 75, hasWalls: true, hasPowerups: true, hasCollectibles: true, collectibleRate: 0.6 },
  { id: 11, name: "Insane", distance: 1500, minSpeed: 7.15, maxSpeed: 14.3, spikeGapMin: 240, spikeGapMax: 380, wallGapMin: 650, wallGapMax: 950, targetScore: 90, star1: 40, star2: 72, star3: 90, hasWalls: true, hasPowerups: true, hasCollectibles: true, collectibleRate: 0.6 },
  { id: 12, name: "Impossible", distance: 1500, minSpeed: 7.8, maxSpeed: 15.6, spikeGapMin: 220, spikeGapMax: 360, wallGapMin: 600, wallGapMax: 900, targetScore: 100, star1: 50, star2: 80, star3: 100, hasWalls: true, hasPowerups: true, hasCollectibles: true, collectibleRate: 0.65 }
];

// ==================== GAME STATE ======================================
let gameState = {
  currentScreen: 'levels',
  currentLevel: 1,
  score: 0,
  highScore: 0,
  totalDistance: 0,
  levelCompleted: {},
  unlockedLevels: [1],
  selectedColor: 'cyan',
  settings: {
    soundVolume: 100,
    musicVolume: 100,
    particles: true,
    screenShake: true
  }
};

// ==================== GAME VARIABLES ====================
let playerX = 32;
let y = 0;
let vy = 0;
let gravity = baseGravityForce;
let currentHorizontalSpeed = 3.0;
let score = 0;
let minY = 0;
let maxY = 0;
let gameWidth = 0;
let gameHeight = 0;
let boxWidth = boxSize;
let boxHeight = boxSize;
let hitUntil = 0;
let cameraX = 0;
let farthestSpikeX = 620;
let farthestWallX = 1500;
let farthestCollectibleX = 400;
let lastTime = 0;
let flipped = false;
let runElapsedMs = 0;
let isPaused = false;
let isGameRunning = false;
let combo = 0;
let comboTimeout = null;
let levelStartTime = 0;
let currentDistance = 0;
let lastFlipTime = 0;
const flipCooldown = 500; // 250ms = max 4 flips per second

const spikeSizeChoices = [
  { width: 30, height: 30 },
  { width: 34, height: 36 },
  { width: 32, height: 34 },
  { width: 36, height: 38 }
];

const wallSizeChoices = [
  { width: 18, height: 90 },
  { width: 20, height: 105 },
  { width: 22, height: 120 }
];

const topSpikes = [];
const bottomSpikes = [];
const walls = [];
const collectibles = [];

// ==================== AUDIO SYSTEM ====================
let audioContext = null;
let bgMusicOscillator = null;
let bgMusicGain = null;
let isMusicPlaying = false;
let audioUnlocked = false;

function initAudio() {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      console.log('AudioContext created, state:', audioContext.state);
    }
    // Resume audio context if suspended (browser autoplay policy)
    if (audioContext.state === 'suspended') {
      audioContext.resume().then(() => {
        console.log('AudioContext resumed');
        audioUnlocked = true;
      });
    } else {
      audioUnlocked = true;
    }
    return audioContext;
  } catch(e) {
    console.error('Failed to create AudioContext:', e);
    return null;
  }
}

function playSound(type) {
  const volume = gameState.settings.soundVolume / 100;
  if (volume <= 0) {
    return;
  }
  
  try {
    const ctx = initAudio();
    if (!ctx) {
      return;
    }
    
    // Make sure context is running
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const volumeGain = ctx.createGain();
    volumeGain.gain.setValueAtTime(volume, ctx.currentTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(volumeGain);
    volumeGain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    
    switch(type) {
      case 'flip':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, now);
        oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.1);
        gainNode.gain.setValueAtTime(0.5, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        oscillator.start(now);
        oscillator.stop(now + 0.15);
        break;
        
      case 'collect':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, now);
        gainNode.gain.setValueAtTime(0.4, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        oscillator.start(now);
        oscillator.stop(now + 0.15);
        break;
        
      case 'powerup':
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(440, now);
        oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.2);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        oscillator.start(now);
        oscillator.stop(now + 0.25);
        break;
        
      case 'hit':
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(150, now);
        oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.2);
        gainNode.gain.setValueAtTime(0.5, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        oscillator.start(now);
        oscillator.stop(now + 0.25);
        break;
        
      case 'levelComplete':
        // Play a simple victory beep sequence
        [523, 659, 784, 1047].forEach((freq, i) => {
          setTimeout(() => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.2);
          }, i * 150);
        });
        return;
        
      case 'click':
      default:
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(1000, now);
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        oscillator.start(now);
        oscillator.stop(now + 0.05);
        break;
    }
    console.log('Sound played successfully');
  } catch(e) {
    console.error('Audio error:', e);
  }
}



function startBackgroundMusic(initialIntensity = 0.7, initialBeatCount = 0) {
  if (gameState.settings.musicVolume <= 0 || isMusicPlaying) return;
  
  try {
    const ctx = initAudio();
    if (!ctx) return;
    
    // Resume if needed
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    // Create master gain and effects chain
    const musicVolume = gameState.settings.musicVolume / 100;
    bgMusicGain = ctx.createGain();
    bgMusicGain.gain.setValueAtTime(0.25 * musicVolume, ctx.currentTime);
    bgMusicGain.connect(ctx.destination);
    
    // Create a filter for sweeping effect
    const masterFilter = ctx.createBiquadFilter();
    masterFilter.type = 'lowpass';
    masterFilter.frequency.setValueAtTime(2500, ctx.currentTime);
    masterFilter.Q.setValueAtTime(1, ctx.currentTime);
    masterFilter.connect(bgMusicGain);
    
    // Musical constants - A minor / C major progression
    const bassNotes = [55, 65.41, 73.42, 82.41]; // A1, C2, D2, E2
    const chordProgressions = [
      [220, 261.63, 329.63], // Am (A, C, E)
      [196, 246.94, 293.66], // G (G, B, D)
      [174.61, 220, 261.63], // F (F, A, C)
      [164.81, 196, 246.94]  // Em (E, G, B)
    ];
    const arpNotes = [440, 523.25, 659.25, 783.99, 659.25, 523.25]; // A4, C5, E5, G5, E5, C5
    
    let beatInterval = 400; // Start at ~150 BPM feel (faster from the beginning)
    let beatCount = initialBeatCount;
    let intensity = initialIntensity; // Start at 0.7 for full sound from the beginning
    let chordIndex = 0;
    let arpIndex = 0;
    
    // Helper to create noise for hi-hats/snares
    const createNoise = (duration) => {
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      return noise;
    };
    
    // Helper to play a soft pad note
    const playPad = (freq, duration, vol) => {
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      
      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(masterFilter);
      
      osc.type = 'sine';
      osc2.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc2.frequency.setValueAtTime(freq * 1.002, ctx.currentTime); // Slight detune for richness
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(vol * 0.3, ctx.currentTime + 0.1);
      gain.gain.linearRampToValueAtTime(vol * 0.2, ctx.currentTime + duration * 0.7);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
      
      osc.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
      osc2.stop(ctx.currentTime + duration);
    };
    
    // Helper to play bass note
    const playBass = (freq, duration, vol) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      filter.Q.setValueAtTime(2, ctx.currentTime);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterFilter);
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(vol * 0.6, ctx.currentTime + duration * 0.3);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    };
    
    // Helper to play arpeggio note
    const playArp = (freq, vol) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(masterFilter);
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(vol * 0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    };
    
    // Helper to play kick
    const playKick = (vol) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(bgMusicGain);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.15);
      
      gain.gain.setValueAtTime(vol * 0.7, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    };
    
    // Helper to play snare
    const playSnare = (vol) => {
      const noise = createNoise(0.15);
      const noiseGain = ctx.createGain();
      const noiseFilter = ctx.createBiquadFilter();
      
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.setValueAtTime(1000, ctx.currentTime);
      
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(bgMusicGain);
      
      noiseGain.gain.setValueAtTime(vol * 0.3, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      
      noise.start(ctx.currentTime);
      noise.stop(ctx.currentTime + 0.15);
      
      // Add tonal component
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.connect(oscGain);
      oscGain.connect(bgMusicGain);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.05);
      oscGain.gain.setValueAtTime(vol * 0.3, ctx.currentTime);
      oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    };
    
    // Helper to play hi-hat
    const playHiHat = (vol, open = false) => {
      const noise = createNoise(open ? 0.2 : 0.05);
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(7000, ctx.currentTime);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(bgMusicGain);
      
      const duration = open ? 0.15 : 0.04;
      gain.gain.setValueAtTime(vol * 0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      noise.start(ctx.currentTime);
      noise.stop(ctx.currentTime + duration + 0.01);
    };
    
    const playBeat = () => {
      if (!isMusicPlaying || gameState.settings.musicVolume <= 0) return;
      if (bgMusicOscillator && bgMusicOscillator.isPaused) return;
      
      // Save current state
      if (bgMusicOscillator) {
        bgMusicOscillator.intensity = intensity;
        bgMusicOscillator.beatCount = beatCount;
      }
      
      const beatInBar = beatCount % 16;
      const bar = Math.floor(beatCount / 16);
      
      // Update filter sweep based on intensity
      masterFilter.frequency.linearRampToValueAtTime(800 + intensity * 3000, ctx.currentTime + 0.1);
      
      // === DRUMS ===
      // Kick on 1, 5, 9, 13 (four-on-the-floor at higher intensity)
      if (beatInBar === 0 || beatInBar === 4 || beatInBar === 8 || beatInBar === 12) {
        playKick(0.5 + intensity * 0.3);
      } else if (intensity > 0.6 && (beatInBar === 2 || beatInBar === 6 || beatInBar === 10 || beatInBar === 14)) {
        playKick(0.3); // Extra kicks at high intensity
      }
      
      // Snare on 4 and 12
      if (intensity > 0.2 && (beatInBar === 4 || beatInBar === 12)) {
        playSnare(0.4 + intensity * 0.2);
      }
      
      // Hi-hats - more frequent as intensity builds
      if (intensity > 0.15) {
        if (beatInBar % 2 === 0) {
          playHiHat(intensity * 0.8, beatInBar === 8);
        }
        if (intensity > 0.5 && beatInBar % 2 === 1) {
          playHiHat(intensity * 0.4);
        }
        if (intensity > 0.8) {
          // 16th note hi-hats at max intensity
          setTimeout(() => playHiHat(intensity * 0.25), beatInterval / 2);
        }
      }
      
      // === BASS ===
      // Bass plays on beat 1 of each 4-beat group
      if (beatInBar % 4 === 0) {
        const bassNote = bassNotes[chordIndex];
        const bassDuration = beatInterval * 3.5 / 1000;
        playBass(bassNote, bassDuration, 0.35 + intensity * 0.15);
        
        // Sub-bass for extra depth at higher intensity
        if (intensity > 0.4) {
          playBass(bassNote / 2, bassDuration, 0.2 * intensity);
        }
      }
      
      // === PADS (chords) ===
      // Chord changes every 16 beats
      if (beatInBar === 0 && intensity > 0.1) {
        const chord = chordProgressions[chordIndex];
        const padDuration = beatInterval * 15 / 1000;
        chord.forEach((note, i) => {
          setTimeout(() => playPad(note, padDuration - i * 0.1, intensity * 0.6), i * 30);
        });
        chordIndex = (chordIndex + 1) % chordProgressions.length;
      }
      
      // === ARPEGGIO ===
      // Arpeggios come in at medium-high intensity
      if (intensity > 0.45) {
        playArp(arpNotes[arpIndex], intensity);
        arpIndex = (arpIndex + 1) % arpNotes.length;
      }
      
      // === MELODIC ACCENT ===
      // Occasional melodic hits for interest
      if (intensity > 0.6 && beatInBar === 0 && bar % 2 === 0) {
        const melodyNote = arpNotes[Math.floor(Math.random() * arpNotes.length)] * 2;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, ctx.currentTime);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterFilter);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(melodyNote, ctx.currentTime);
        
        gain.gain.setValueAtTime(0.15 * intensity, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.5);
      }
      
      beatCount++;
      
      // Gradually increase intensity based on distance progress
      // Music intensity is tied to currentDistance / level.distance
      const level = LEVELS[gameState.currentLevel - 1];
      const distanceProgress = Math.min(currentDistance / level.distance, 1);
      intensity = 0.7 + (distanceProgress * 0.3); // Goes from 0.7 to 1.0
      
      // BPM increases from ~150 (400ms) to ~180 (333ms) as you progress through the level
      beatInterval = Math.max(200, 400 - (distanceProgress * 200));
      
      // Schedule next beat
      if (bgMusicOscillator) {
        bgMusicOscillator.timeoutId = setTimeout(playBeat, beatInterval);
      }
    };
    
    // Store reference for cleanup
    bgMusicOscillator = { timeoutId: null, isPaused: false, intensity: intensity, beatCount: beatCount };
    isMusicPlaying = true;
    
    // Start the beat
    playBeat();
    
    console.log('Dynamic music started');
  } catch(e) {
    console.log('Music error:', e);
  }
}

// Helper function to start music with saved state
function startBackgroundMusicWithState(intensity, beatCount) {
  startBackgroundMusic(intensity, beatCount);
}

function stopBackgroundMusic() {
  if (bgMusicOscillator) {
    try {
      if (bgMusicOscillator.timeoutId) {
        clearTimeout(bgMusicOscillator.timeoutId);
      }
      if (bgMusicOscillator.stop) {
        bgMusicOscillator.stop();
      }
      if (bgMusicOscillator.extraOscillators) {
        bgMusicOscillator.extraOscillators.forEach(osc => osc.stop());
      }
    } catch(e) {}
    bgMusicOscillator = null;
  }
  isMusicPlaying = false;
}

function pauseBackgroundMusic() {
  if (bgMusicOscillator && bgMusicOscillator.timeoutId) {
    clearTimeout(bgMusicOscillator.timeoutId);
    bgMusicOscillator.timeoutId = null;
    bgMusicOscillator.isPaused = true;
  }
}

function resumeBackgroundMusic() {
  if (gameState.settings.musicVolume <= 0 || !isMusicPlaying) return;
  
  // If music was paused, we need to restart it to continue the beat
  // Since our beat is dynamic, we'll restart from current intensity
  if (bgMusicOscillator && bgMusicOscillator.isPaused) {
    bgMusicOscillator.isPaused = false;
    // Restart the beat loop
    const ctx = initAudio();
    if (ctx) {
      const savedIntensity = bgMusicOscillator.intensity || 0;
      const savedBeatCount = bgMusicOscillator.beatCount || 0;
      stopBackgroundMusic();
      // Restart with saved state
      startBackgroundMusicWithState(savedIntensity, savedBeatCount);
    }
  }
}

function restartBackgroundMusic() {
  stopBackgroundMusic();
  if (gameState.settings.musicVolume > 0) {
    startBackgroundMusic();
  }
}

function toggleMusic() {
  if (gameState.settings.musicVolume > 0 && isGameRunning) {
    if (!bgMusicGain) {
      startBackgroundMusic();
    } else {
      updateMusicVolume();
    }
  } else if (gameState.settings.musicVolume === 0) {
    stopBackgroundMusic();
  }
}

// ==================== UTILITY FUNCTIONS ====================
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFrom(list) {
  return list[randInt(0, list.length - 1)];
}

function randomSpikeSize() {
  return randomFrom(spikeSizeChoices);
}

function randomWallSize() {
  return randomFrom(wallSizeChoices);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// ==================== SAVE/LOAD ====================
function saveGameState() {
  localStorage.setItem('gravityFlipperSave', JSON.stringify(gameState));
}

function loadGameState() {
  const saved = localStorage.getItem('gravityFlipperSave');
  if (saved) {
    const parsed = JSON.parse(saved);
    // Properly merge settings to ensure defaults aren't lost
    const defaultSettings = {
      soundVolume: 100,
      musicVolume: 100,
      particles: true,
      screenShake: true
    };
    // Handle migration from old boolean settings
    if (parsed.settings) {
      if (typeof parsed.settings.sound === 'boolean') {
        parsed.settings.soundVolume = parsed.settings.sound ? 100 : 0;
        delete parsed.settings.sound;
      }
      if (typeof parsed.settings.music === 'boolean') {
        parsed.settings.musicVolume = parsed.settings.music ? 100 : 0;
        delete parsed.settings.music;
      }
    }
    gameState = { 
      ...gameState, 
      ...parsed,
      settings: { ...defaultSettings, ...(parsed.settings || {}) }
    };
  }
  console.log('Loaded gameState:', gameState);
  updateHomeStats();
  renderLevelGrid();
}

function resetProgress() {
  gameState = {
    currentScreen: 'levels',
    currentLevel: 1,
    score: 0,
    highScore: 0,
    totalDistance: 0,
    levelCompleted: {},
    unlockedLevels: [1],
    selectedColor: 'cyan',
    settings: {
      soundVolume: 100,
      musicVolume: 100,
      particles: true,
      screenShake: true
    }
  };
  saveGameState();
  updateHomeStats();
  renderLevelGrid();
  updateSettingsUI();
  applyBoxColor();
}

// ==================== BACKGROUND PARTICLES ====================
function createBackgroundParticles() {
  if (!gameState.settings.particles) return;
  
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      createParticle();
    }, i * 500);
  }
}

function createParticle() {
  if (!gameState.settings.particles) return;
  
  const particle = document.createElement('div');
  particle.className = 'bg-particle';
  const size = randInt(2, 6);
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  particle.style.left = randInt(0, 100) + '%';
  particle.style.animationDuration = randInt(8, 15) + 's';
  particle.style.animationDelay = '0s';
  bgParticles.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
    createParticle();
  }, parseInt(particle.style.animationDuration) * 1000);
}

// ==================== SCREEN MANAGEMENT ====================
function showScreen(screenName) {
  levelScreen.classList.remove('active');
  settingsScreen.classList.remove('active');
  storeScreen.classList.remove('active');
  gameScreen.classList.remove('active');
  
  gameState.currentScreen = screenName;
  
  switch(screenName) {
    case 'levels':
      levelScreen.classList.add('active');
      updateHomeStats();
      renderLevelGrid();
      break;
    case 'settings':
      settingsScreen.classList.add('active');
      updateSettingsUI();
      break;
    case 'store':
      storeScreen.classList.add('active');
      renderColorGrid();
      break;
    case 'game':
      gameScreen.classList.add('active');
      break;
  }
}

function updateHomeStats() {
  menuHighScore.textContent = gameState.highScore;
  totalDistanceDisplay.textContent = Math.floor(gameState.totalDistance) + 'm';
}

function renderLevelGrid() {
  levelGrid.innerHTML = '';
  
  LEVELS.forEach(level => {
    const card = document.createElement('div');
    card.className = 'level-card';
    
    const isCompleted = gameState.levelCompleted[level.id] || false;
    // A level is unlocked if it's in unlockedLevels OR if it's been completed
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
      
      // Add both click and touch support for level selection
      const handleLevelSelect = (e) => {
        e.preventDefault();
        e.stopPropagation();
        playSound('click');
        startLevel(level.id);
      };
      card.addEventListener('click', handleLevelSelect);
      card.addEventListener('touchend', handleLevelSelect);
    }
    
    levelGrid.appendChild(card);
  });
}

function updateSettingsUI() {
  // Volume sliders
  soundVolume.value = gameState.settings.soundVolume;
  soundValue.textContent = gameState.settings.soundVolume + '%';
  updateVolumeIcon(soundIcon, gameState.settings.soundVolume);
  
  musicVolume.value = gameState.settings.musicVolume;
  musicValue.textContent = gameState.settings.musicVolume + '%';
  updateVolumeIcon(musicIcon, gameState.settings.musicVolume);
  
  // Toggle buttons
  particlesToggle.classList.toggle('active', gameState.settings.particles);
  particlesToggle.textContent = gameState.settings.particles ? 'ON' : 'OFF';
  
  shakeToggle.classList.toggle('active', gameState.settings.screenShake);
  shakeToggle.textContent = gameState.settings.screenShake ? 'ON' : 'OFF';
}

function updateVolumeIcon(iconElement, volume) {
  if (volume === 0) {
    iconElement.textContent = '🔇';
  } else if (volume < 50) {
    iconElement.textContent = '🔉';
  } else {
    iconElement.textContent = '🔊';
  }
}

function updateMusicVolume() {
  if (bgMusicGain && audioContext) {
    const volume = gameState.settings.musicVolume / 100;
    bgMusicGain.gain.setTargetAtTime(0.25 * volume, audioContext.currentTime, 0.1);
  }
}

// ==================== STORE FUNCTIONS ====================
function renderColorGrid() {
  colorGrid.innerHTML = '';
  
  BOX_COLORS.forEach(colorData => {
    const colorItem = document.createElement('div');
    colorItem.className = 'color-item';
    if (gameState.selectedColor === colorData.id) {
      colorItem.classList.add('selected');
    }
    colorItem.style.background = colorData.color;
    colorItem.style.boxShadow = `0 4px 15px ${colorData.glow}`;
    colorItem.dataset.colorId = colorData.id;
    
    colorItem.addEventListener('click', () => selectColor(colorData.id));
    
    colorGrid.appendChild(colorItem);
  });
  
  updateColorPreview();
}

function selectColor(colorId) {
  playSound('click');
  gameState.selectedColor = colorId;
  saveGameState();
  
  // Update UI
  document.querySelectorAll('.color-item').forEach(item => {
    item.classList.toggle('selected', item.dataset.colorId === colorId);
  });
  
  updateColorPreview();
  applyBoxColor();
}

function updateColorPreview() {
  const colorData = BOX_COLORS.find(c => c.id === gameState.selectedColor) || BOX_COLORS[0];
  previewBox.style.background = colorData.color;
  previewBox.style.boxShadow = `0 0 15px ${colorData.glow}`;
  previewName.textContent = colorData.name;
}

function applyBoxColor() {
  const colorData = BOX_COLORS.find(c => c.id === gameState.selectedColor) || BOX_COLORS[0];
  box.style.background = `linear-gradient(135deg, ${colorData.color}, ${adjustColor(colorData.color, -30)})`;
  box.style.boxShadow = `
    0 0 20px ${colorData.glow},
    0 0 40px ${colorData.glow.replace('0.8', '0.4')},
    inset 0 0 15px rgba(255, 255, 255, 0.3)
  `;
}

function adjustColor(hex, amount) {
  // Adjust color brightness
  let color = hex.replace('#', '');
  let num = parseInt(color, 16);
  let r = Math.min(255, Math.max(0, (num >> 16) + amount));
  let g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  let b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
}

// ==================== GAME INITIALIZATION ====================
function startLevel(levelId) {
  gameState.currentLevel = levelId;
  showScreen('game');
  initWorld();
  isPaused = false;
  isGameRunning = true;
  lastTime = 0;
  levelStartTime = performance.now();
  
  // Always start background music fresh from the beginning
  stopBackgroundMusic();
  startBackgroundMusic(0, 0);
  
  requestAnimationFrame(loop);
}

function startEndlessMode() {
  gameState.currentLevel = 1;
  showScreen('game');
  initWorld();
  isPaused = false;
  isGameRunning = true;
  lastTime = 0;
  levelStartTime = performance.now();
  requestAnimationFrame(loop);
}

function resizeGame() {
  const gameRect = game.getBoundingClientRect();
  gameWidth = gameRect.width;
  gameHeight = gameRect.height;
  boxWidth = boxSize;
  boxHeight = boxSize;

  minY = boundaryOffset + boundaryThickness;
  maxY = gameHeight - boundaryOffset - boundaryThickness - boxHeight;

  if (y < minY || y > maxY || y === 0) {
    y = (minY + maxY) / 2;
  }
}

function initWorld() {
  resizeGame();
  
  const level = LEVELS[gameState.currentLevel - 1];

  spikesTopContainer.innerHTML = "";
  spikesBottomContainer.innerHTML = "";
  wallsContainer.innerHTML = "";
  collectiblesContainer.innerHTML = "";
  topSpikes.length = 0;
  bottomSpikes.length = 0;
  walls.length = 0;
  collectibles.length = 0;

  farthestSpikeX = 620 - randInt(120, 240);
  for (let i = 0; i < 36; i++) {
    addSpikePairGroup();
  }

  if (level.hasWalls) {
    farthestWallX = 1500 - randInt(220, 340);
    for (let i = 0; i < 8; i++) {
      addWallGroup();
    }
  }

  if (level.hasCollectibles) {
    farthestCollectibleX = 300;
    for (let i = 0; i < 15; i++) {
      addCollectible();
    }
  }

  cameraX = 0;
  y = (minY + maxY) / 2;
  vy = 0;
  gravity = baseGravityForce;
  score = 0;
  runElapsedMs = 0;
  currentHorizontalSpeed = level.minSpeed;
  flipped = false;
  combo = 0;
  currentDistance = 0;
  lastFlipTime = 0;
  
  updateScore();
  updateLevelDisplay();
  updateDistance();
  updateProgress();
  updateSpeedDisplay();
  hideCombo();
  hideMessage();
  
  box.className = 'box';
  box.style.transform = 'rotate(0deg)';
  applyBoxColor();
}

// ==================== SPIKE MANAGEMENT ====================
function applySpikeSize(spike, side) {
  const size = randomSpikeSize();
  spike.width = size.width;
  spike.height = size.height;
  spike.side = side;
  spike.el.style.width = size.width + "px";
  spike.el.style.height = size.height + "px";
}

function createSpike(container, side, x) {
  const el = document.createElement("div");
  el.className = "spike";
  container.appendChild(el);

  const spike = {
    side,
    x,
    width: 30,
    height: 30,
    passed: false,
    el
  };

  applySpikeSize(spike, side);
  return spike;
}

let spikeAlternate = true; // Alternates between top and bottom spikes

function addSpikePairGroup() {
  const level = LEVELS[gameState.currentLevel - 1];
  farthestSpikeX += randInt(level.spikeGapMin, level.spikeGapMax);
  const jitter = randInt(-24, 24);
  const groupX = farthestSpikeX + jitter;
  
  // Alternate spikes - don't place both top and bottom at same X
  // One side gets the spike, other side is offset or skipped
  spikeAlternate = !spikeAlternate;
  
  const topX = spikeAlternate ? groupX : groupX + randInt(80, 150);
  const bottomX = spikeAlternate ? groupX + randInt(80, 150) : groupX;
  
  const top = createSpike(spikesTopContainer, "top", topX);
  const bottom = createSpike(spikesBottomContainer, "bottom", bottomX);
  topSpikes.push(top);
  bottomSpikes.push(bottom);
}

// Removed syncTopBottomPosition - spikes are now independent

function recycleSpikes() {
  const level = LEVELS[gameState.currentLevel - 1];
  const offscreenLeft = cameraX - 140;

  // Recycle top spikes
  for (let i = 0; i < topSpikes.length; i++) {
    const top = topSpikes[i];

    if (top.x < offscreenLeft) {
      farthestSpikeX += randInt(level.spikeGapMin, level.spikeGapMax);
      const jitter = randInt(-20, 20);
      spikeAlternate = !spikeAlternate;
      top.x = spikeAlternate ? farthestSpikeX + jitter : farthestSpikeX + jitter + randInt(80, 150);
      applySpikeSize(top, "top");
      top.passed = false;
    }

    if (!top.passed && top.x + top.width < cameraX + playerX) {
      top.passed = true;
      addScore(1);
    }
  }

  // Recycle bottom spikes independently
  for (let i = 0; i < bottomSpikes.length; i++) {
    const bottom = bottomSpikes[i];

    if (bottom.x < offscreenLeft) {
      const offsetX = randInt(level.spikeGapMin / 2, level.spikeGapMax / 2);
      bottom.x = topSpikes[i].x + randInt(60, 140);
      applySpikeSize(bottom, "bottom");
    }
  }
}

// ==================== WALL MANAGEMENT ====================
function createWall(x) {
  const size = randomWallSize();
  const el = document.createElement("div");
  el.className = "wall";
  el.style.width = size.width + "px";
  el.style.height = size.height + "px";
  wallsContainer.appendChild(el);

  // Wall sticks to ceiling (top) or floor (bottom)
  const isTop = Math.random() > 0.5;
  return {
    x,
    width: size.width,
    height: size.height,
    isTop: isTop,
    y: isTop ? minY : maxY - size.height,
    el
  };
}

function addWallGroup() {
  const level = LEVELS[gameState.currentLevel - 1];
  farthestWallX += randInt(level.wallGapMin, level.wallGapMax);
  walls.push(createWall(farthestWallX));
}

function recycleWalls() {
  const level = LEVELS[gameState.currentLevel - 1];
  if (!level.hasWalls) return;
  
  const offscreenLeft = cameraX - 200;

  for (let i = 0; i < walls.length; i++) {
    const wall = walls[i];

    if (wall.x < offscreenLeft) {
      farthestWallX += randInt(level.wallGapMin, level.wallGapMax);
      const size = randomWallSize();
      wall.x = farthestWallX;
      wall.width = size.width;
      wall.height = size.height;
      wall.isTop = Math.random() > 0.5;
      wall.el.style.width = size.width + "px";
      wall.el.style.height = size.height + "px";
    }

    // Wall sticks to ceiling or floor
    wall.y = wall.isTop ? minY : maxY - wall.height;
  }
}

// ==================== COLLECTIBLE MANAGEMENT ====================
function createCollectible(x) {
  const el = document.createElement("div");
  const isGem = Math.random() > 0.5;
  el.className = `collectible ${isGem ? 'gem' : 'coin'}`;
  collectiblesContainer.appendChild(el);

  return {
    x,
    y: randInt(minY + 40, maxY - 40),
    width: 24,
    height: 24,
    collected: false,
    value: isGem ? 3 : 1,
    el
  };
}

function addCollectible() {
  const level = LEVELS[gameState.currentLevel - 1];
  if (Math.random() > level.collectibleRate) {
    farthestCollectibleX += randInt(200, 400);
    return;
  }
  farthestCollectibleX += randInt(150, 350);
  collectibles.push(createCollectible(farthestCollectibleX));
}

function recycleCollectibles() {
  const level = LEVELS[gameState.currentLevel - 1];
  if (!level.hasCollectibles) return;
  
  const offscreenLeft = cameraX - 100;

  for (let i = collectibles.length - 1; i >= 0; i--) {
    const c = collectibles[i];
    
    if (c.collected || c.x < offscreenLeft) {
      c.el.remove();
      collectibles.splice(i, 1);
      addCollectible();
    }
  }
}

// ==================== SCORING ====================
function addScore(points) {
  combo++;
  const multiplier = Math.min(combo, 5);
  const finalPoints = points * multiplier;
  score += finalPoints;
  updateScore();
  
  if (combo >= 2) {
    showCombo(multiplier);
  }
  
  clearTimeout(comboTimeout);
  comboTimeout = setTimeout(() => {
    combo = 0;
    hideCombo();
  }, 2000);
  
  updateProgress();
  checkLevelComplete();
}

function updateScore() {
  scoreDisplay.textContent = score;
}

function updateDistance() {
  // Convert camera position to meters (1 unit = 0.1m)
  currentDistance = Math.floor(cameraX * 0.1);
  distanceDisplay.textContent = currentDistance;
}

function updateSpeedDisplay() {
  const level = LEVELS[gameState.currentLevel - 1];
  // Convert game speed to MPH (scale factor for visual appeal)
  const minMPH = 15;
  const maxMPH = 120;
  const speedPercent = (currentHorizontalSpeed - level.minSpeed) / (level.maxSpeed - level.minSpeed);
  const mph = Math.round(minMPH + (maxMPH - minMPH) * speedPercent);
  
  speedValue.textContent = mph;
  speedBarFill.style.width = (speedPercent * 100) + '%';
}

function showCombo(multiplier) {
  comboValue.textContent = 'x' + multiplier;
  comboDisplay.classList.remove('hidden');
}

function hideCombo() {
  comboDisplay.classList.add('hidden');
}

function updateLevelDisplay() {
  currentLevelDisplay.textContent = gameState.currentLevel;
}

function updateProgress() {
  const level = LEVELS[gameState.currentLevel - 1];
  // Update progress bar based on distance towards target
  const progress = Math.min((currentDistance / level.distance) * 100, 100);
  progressFill.style.width = progress + '%';
}

function checkLevelComplete() {
  const level = LEVELS[gameState.currentLevel - 1];
  if (currentDistance >= level.distance) {
    levelComplete();
  }
}

// ==================== COLLISION DETECTION ====================
function intersects(ax, ay, aw, ah, bx, by, bw, bh) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

function checkCollisions() {
  const px = Math.max(playerX, cameraFollowX);
  const py = y;

  // Check spike collisions
  for (let i = 0; i < topSpikes.length; i++) {
    const s = topSpikes[i];
    const sx = s.x - cameraX;
    const sy = boundaryOffset;
    if (intersects(px, py, boxWidth, boxHeight, sx, sy, s.width, s.height)) {
      triggerHit();
      return;
    }
  }

  for (let i = 0; i < bottomSpikes.length; i++) {
    const s = bottomSpikes[i];
    const sx = s.x - cameraX;
    const sy = gameHeight - boundaryOffset - s.height;
    if (intersects(px, py, boxWidth, boxHeight, sx, sy, s.width, s.height)) {
      triggerHit();
      return;
    }
  }

  // Check wall collisions
  for (let i = 0; i < walls.length; i++) {
    const wall = walls[i];
    const wx = wall.x - cameraX;
    if (intersects(px, py, boxWidth, boxHeight, wx, wall.y, wall.width, wall.height)) {
      triggerHit();
      return;
    }
  }

  // Check collectible collisions
  for (let i = 0; i < collectibles.length; i++) {
    const c = collectibles[i];
    if (c.collected) continue;
    
    const cx = c.x - cameraX;
    
    if (intersects(px, py, boxWidth, boxHeight, cx, c.y, c.width, c.height)) {
      c.collected = true;
      c.el.style.transform = 'scale(0)';
      playSound('collect');
      addScore(c.value);
    }
  }
}

// ==================== HIT & GAME OVER ====================
function triggerHit() {
  const now = performance.now();
  if (now < hitUntil) return;

  // Play hit sound
  playSound('hit');
  
  hitUntil = now + 260;
  box.classList.add("hit");
  
  if (gameState.settings.screenShake) {
    game.style.animation = 'hitShake 200ms ease';
    setTimeout(() => game.style.animation = '', 200);
  }
  
  setTimeout(() => box.classList.remove("hit"), 220);
  
  gameOver();
}

function gameOver() {
  isGameRunning = false;
  isPaused = true;
  
  // Update high score
  if (score > gameState.highScore) {
    gameState.highScore = score;
  }
  
  // Update total distance
  gameState.totalDistance += currentDistance;
  
  saveGameState();
  
  // Show game over modal
  finalScore.textContent = score;
  finalDistance.textContent = currentDistance + 'm';
  bestScore.textContent = gameState.highScore;
  
  gameOverOverlay.classList.remove('hidden');
}

function levelComplete() {
  isGameRunning = false;
  isPaused = true;
  
  // Play level complete sound
  playSound('levelComplete');
  
  const elapsedTime = (performance.now() - levelStartTime) / 1000;
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = Math.floor(elapsedTime % 60);
  
  // Mark level as completed
  gameState.levelCompleted[gameState.currentLevel] = true;
  
  // Ensure current level is in unlockedLevels (safeguard)
  if (!gameState.unlockedLevels.includes(gameState.currentLevel)) {
    gameState.unlockedLevels.push(gameState.currentLevel);
  }
  
  // Update total distance
  gameState.totalDistance += currentDistance;
  
  // Unlock next level
  const nextLevel = gameState.currentLevel + 1;
  if (nextLevel <= LEVELS.length && !gameState.unlockedLevels.includes(nextLevel)) {
    gameState.unlockedLevels.push(nextLevel);
  }
  
  if (score > gameState.highScore) {
    gameState.highScore = score;
  }
  
  saveGameState();
  
  // Show level complete modal
  lcScore.textContent = score;
  lcDistance.textContent = currentDistance + 'm';
  lcTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  if (gameState.currentLevel >= LEVELS.length) {
    nextLevelBtn.style.display = 'none';
  } else {
    nextLevelBtn.style.display = '';
  }
  
  levelCompleteOverlay.classList.remove('hidden');
}

// ==================== GAME CONTROLS ====================
function flipGravity() {
  if (isPaused || !isGameRunning) return;
  
  // Cooldown check - limit to 2 flips per second
  const now = performance.now();
  if (now - lastFlipTime < flipCooldown) return;
  lastFlipTime = now;
  
  // Play flip sound
  playSound('flip');
  
  // Create trail effect
  createTrailGhost();
  
  gravity *= -1;
  flipped = !flipped;
  vy += flipped ? -2.8 : 2.8;

  box.classList.remove("flip-pop");
  void box.offsetWidth;
  box.classList.add("flip-pop");
  box.style.transform = flipped ? "rotate(180deg)" : "rotate(0deg)";
}

function createTrailGhost() {
  const visualX = Math.max(playerX, cameraFollowX);
  const currentFlipped = flipped;
  const direction = currentFlipped ? -1 : 1;
  
  // Create initial burst of trails
  for (let i = 0; i <= 6; i++) {
    setTimeout(() => {
      const trailGhost = document.createElement('div');
      trailGhost.className = 'trail-ghost';
      trailGhost.style.left = visualX + 'px';
      trailGhost.style.top = (y + direction * i * 10) + 'px';
      trailGhost.style.opacity = (0.8 - i * 0.1);
      const scale = 1 - i * 0.06;
      trailGhost.style.transform = currentFlipped ? 'rotate(180deg) scale(' + scale + ')' : 'rotate(0deg) scale(' + scale + ')';
      game.appendChild(trailGhost);
      
      setTimeout(() => trailGhost.remove(), 200);
    }, i * 20);
  }
  
  // Continue spawning trails as player moves
  for (let wave = 1; wave <= 3; wave++) {
    setTimeout(() => {
      for (let i = 0; i <= 4; i++) {
        const trailGhost = document.createElement('div');
        trailGhost.className = 'trail-ghost trail-secondary';
        trailGhost.style.left = visualX + 'px';
        trailGhost.style.top = (y + direction * i * 8) + 'px';
        trailGhost.style.opacity = (0.5 - i * 0.08);
        const scale = 0.8 - i * 0.08;
        trailGhost.style.transform = currentFlipped ? 'rotate(180deg) scale(' + scale + ')' : 'rotate(0deg) scale(' + scale + ')';
        game.appendChild(trailGhost);
        
        setTimeout(() => trailGhost.remove(), 180);
      }
    }, wave * 60);
  }
}

function triggerLandingSqueeze(isTop) {
  box.classList.remove('squeeze-land');
  void box.offsetWidth;
  box.classList.add('squeeze-land');
  setTimeout(() => box.classList.remove('squeeze-land'), 200);
}

function pauseGame() {
  if (!isGameRunning) return;
  
  isPaused = true;
  pauseScore.textContent = score;
  pauseLevel.textContent = gameState.currentLevel;
  pauseOverlay.classList.remove('hidden');
  
  // Pause the background music
  pauseBackgroundMusic();
}

function resumeGame() {
  isPaused = false;
  pauseOverlay.classList.add('hidden');
  lastTime = 0;
  
  // Resume the background music
  resumeBackgroundMusic();
  
  requestAnimationFrame(loop);
}

function restartLevel() {
  pauseOverlay.classList.add('hidden');
  gameOverOverlay.classList.add('hidden');
  levelCompleteOverlay.classList.add('hidden');
  
  startLevel(gameState.currentLevel);
}

function quitToMenu() {
  // Hide all overlays first
  pauseOverlay.classList.add('hidden');
  gameOverOverlay.classList.add('hidden');
  levelCompleteOverlay.classList.add('hidden');
  
  // Stop the game completely
  isGameRunning = false;
  isPaused = false;
  
  // Stop background music
  stopBackgroundMusic();
  
  // Remove active class from game screen to fully hide it
  gameScreen.classList.remove('active');
  
  // Save any progress and show level selection
  saveGameState();
  showScreen('levels');
}

function nextLevel() {
  levelCompleteOverlay.classList.add('hidden');
  if (gameState.currentLevel < LEVELS.length) {
    startLevel(gameState.currentLevel + 1);
  }
}

// ==================== MESSAGE DISPLAY ====================
function showMessage(text) {
  messageText.textContent = text;
  gameMessage.classList.remove('hidden');
  setTimeout(() => hideMessage(), 1000);
}

function hideMessage() {
  gameMessage.classList.add('hidden');
}

// ==================== RENDER ====================
function render() {
  const visualX = Math.max(playerX, cameraFollowX);
  boxWrap.style.transform = "translate(" + visualX + "px, " + y + "px)";

  for (let i = 0; i < topSpikes.length; i++) {
    const spike = topSpikes[i];
    spike.el.style.transform = "translateX(" + (spike.x - cameraX) + "px)";
  }

  for (let i = 0; i < bottomSpikes.length; i++) {
    const spike = bottomSpikes[i];
    spike.el.style.transform = "translateX(" + (spike.x - cameraX) + "px)";
  }

  for (let i = 0; i < walls.length; i++) {
    const wall = walls[i];
    wall.el.style.transform = "translate(" + (wall.x - cameraX) + "px, " + wall.y + "px)";
  }

  for (let i = 0; i < collectibles.length; i++) {
    const c = collectibles[i];
    if (!c.collected) {
      c.el.style.transform = "translate(" + (c.x - cameraX) + "px, " + c.y + "px)";
    }
  }
}

// ==================== GAME LOOP ====================
function loop(timestamp) {
  if (!isGameRunning || isPaused) return;
  
  
  if (!lastTime) {
    lastTime = timestamp;
  }

  const level = LEVELS[gameState.currentLevel - 1];
  const frameDelta = Math.min(34, timestamp - lastTime);
  let dt = frameDelta / 16.6667;
  lastTime = timestamp;

  runElapsedMs += frameDelta;
  const speedProgress = Math.min(runElapsedMs / 60000, 1);
  currentHorizontalSpeed = level.minSpeed + (level.maxSpeed - level.minSpeed) * speedProgress;
  
  // Update speed display (convert to MPH - game units to visualized speed)
  updateSpeedDisplay();
  
  cameraX += currentHorizontalSpeed * dt;

  vy += gravity * dt;
  y += vy * dt;

  if (y < minY) {
    y = minY;
    if (vy < 0) {
      triggerLandingSqueeze(true);
      vy = 0;
    }
  } else if (y > maxY) {
    y = maxY;
    if (vy > 0) {
      triggerLandingSqueeze(false);
      vy = 0;
    }
  }

  recycleSpikes();
  recycleWalls();
  recycleCollectibles();
  updateDistance();
  updateProgress();
  checkCollisions();
  render();

  requestAnimationFrame(loop);
}

// ==================== EVENT LISTENERS ====================
// Level screen buttons
settingsBtn.addEventListener('click', () => { playSound('click'); showScreen('settings'); });
settingsBackBtn.addEventListener('click', () => { playSound('click'); showScreen('levels'); });
storeBtn.addEventListener('click', () => { playSound('click'); showScreen('store'); });
storeBackBtn.addEventListener('click', () => { playSound('click'); showScreen('levels'); });

// Settings volume sliders
soundVolume.addEventListener('input', (e) => {
  gameState.settings.soundVolume = parseInt(e.target.value);
  soundValue.textContent = gameState.settings.soundVolume + '%';
  updateVolumeIcon(soundIcon, gameState.settings.soundVolume);
  saveGameState();
});

soundVolume.addEventListener('change', () => {
  playSound('click');
});

musicVolume.addEventListener('input', (e) => {
  gameState.settings.musicVolume = parseInt(e.target.value);
  musicValue.textContent = gameState.settings.musicVolume + '%';
  updateVolumeIcon(musicIcon, gameState.settings.musicVolume);
  updateMusicVolume();
  saveGameState();
});

particlesToggle.addEventListener('click', () => {
  playSound('click');
  gameState.settings.particles = !gameState.settings.particles;
  updateSettingsUI();
  saveGameState();
});

shakeToggle.addEventListener('click', () => {
  playSound('click');
  gameState.settings.screenShake = !gameState.settings.screenShake;
  updateSettingsUI();
  saveGameState();
});

resetBtn.addEventListener('click', () => {
  playSound('click');
  if (confirm('Are you sure you want to reset all progress?')) {
    resetProgress();
  }
});

// Game controls
pauseBtn.addEventListener('click', () => { playSound('click'); pauseGame(); });
resumeBtn.addEventListener('click', () => { playSound('click'); resumeGame(); });
restartBtn.addEventListener('click', () => { playSound('click'); restartLevel(); });
quitBtn.addEventListener('click', () => { playSound('click'); quitToMenu(); });
retryBtn.addEventListener('click', () => { playSound('click'); restartLevel(); });
menuBtn.addEventListener('click', () => { playSound('click'); quitToMenu(); });
nextLevelBtn.addEventListener('click', () => { playSound('click'); nextLevel(); });
replayBtn.addEventListener('click', () => { playSound('click'); restartLevel(); });
lcMenuBtn.addEventListener('click', () => { playSound('click'); quitToMenu(); });

// Touch support for buttons (ensures mobile compatibility)
pauseBtn.addEventListener('touchend', (e) => { e.preventDefault(); playSound('click'); pauseGame(); });
resumeBtn.addEventListener('touchend', (e) => { e.preventDefault(); playSound('click'); resumeGame(); });
restartBtn.addEventListener('touchend', (e) => { e.preventDefault(); playSound('click'); restartLevel(); });
quitBtn.addEventListener('touchend', (e) => { e.preventDefault(); playSound('click'); quitToMenu(); });
retryBtn.addEventListener('touchend', (e) => { e.preventDefault(); playSound('click'); restartLevel(); });
menuBtn.addEventListener('touchend', (e) => { e.preventDefault(); playSound('click'); quitToMenu(); });
nextLevelBtn.addEventListener('touchend', (e) => { e.preventDefault(); playSound('click'); nextLevel(); });
replayBtn.addEventListener('touchend', (e) => { e.preventDefault(); playSound('click'); restartLevel(); });
lcMenuBtn.addEventListener('touchend', (e) => { e.preventDefault(); playSound('click'); quitToMenu(); });

// Keyboard controls
function isSpaceInput(event) {
  return event.code === "Space" || event.key === " " || event.key === "Spacebar";
}

window.addEventListener("keydown", (event) => {
  if (isSpaceInput(event) && !event.repeat) {
    event.preventDefault();
    
    if (gameState.currentScreen === 'levels') {
      // Start the highest unlocked level
      const highestLevel = Math.max(...gameState.unlockedLevels);
      startLevel(highestLevel);
    } else if (gameState.currentScreen === 'game') {
      if (isPaused && pauseOverlay.classList.contains('hidden') === false) {
        resumeGame();
      } else {
        flipGravity();
      }
    }
  }
  
  if (event.key === 'Escape') {
    if (gameState.currentScreen === 'game' && isGameRunning) {
      if (isPaused) {
        resumeGame();
      } else {
        pauseGame();
      }
    } else if (gameState.currentScreen === 'settings') {
      showScreen('levels');
    }
  }
});

// Touch/click controls
game.addEventListener("pointerdown", (e) => {
  if (e.target.closest('.game-hud') || e.target.closest('.pause-btn')) return;
  flipGravity();
});

// Window resize
window.addEventListener("resize", resizeGame);

// ==================== INITIALIZATION ==================== 
// Unlock audio on first user interaction (required by browser autoplay policy)
function unlockAudio() {
  initAudio();
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
  // Remove listeners after first interaction
  document.removeEventListener('click', unlockAudio);
  document.removeEventListener('touchstart', unlockAudio);
  document.removeEventListener('keydown', unlockAudio);
}
document.addEventListener('click', unlockAudio);
document.addEventListener('touchstart', unlockAudio);
document.addEventListener('keydown', unlockAudio);

loadGameState();
applyBoxColor();
createBackgroundParticles();
showScreen('levels');





