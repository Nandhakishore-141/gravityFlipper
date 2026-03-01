// ==================== AUDIO SYSTEM ====================
import { gameState } from './state.js';

let audioContext = null;
let bgMusicGain = null;
let isMusicPlaying = false;
let audioUnlocked = false;
let bgMusicIntervalId = null;

// Initialize audio context
export function initAudio() {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume().then(() => {
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

// Unlock audio (call on first user interaction)
export function unlockAudio() {
  initAudio();
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
}

// Play sound effect
export function playSound(type) {
  const volume = gameState.settings.soundVolume / 100;
  if (volume <= 0) return;
  
  try {
    const ctx = initAudio();
    if (!ctx) return;
    
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
        
      case 'purchase':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523, now);
        oscillator.frequency.exponentialRampToValueAtTime(1047, now + 0.15);
        gainNode.gain.setValueAtTime(0.4, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        oscillator.start(now);
        oscillator.stop(now + 0.2);
        break;
        
      case 'error':
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(200, now);
        oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.15);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        oscillator.start(now);
        oscillator.stop(now + 0.2);
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
        [523, 659, 784, 1047].forEach((freq, i) => {
          setTimeout(() => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(0.3 * volume, ctx.currentTime);
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
  } catch(e) {
    console.error('Audio error:', e);
  }
}

// Update music volume
export function updateMusicVolume() {
  if (bgMusicGain && audioContext) {
    const volume = gameState.settings.musicVolume / 100;
    bgMusicGain.gain.setTargetAtTime(0.25 * volume, audioContext.currentTime, 0.1);
  }
}

// Background music state
let bgMusicOscillator = null;

// Start background music
export function startBackgroundMusic(initialIntensity = 0.7, initialBeatCount = 0) {
  if (gameState.settings.musicVolume <= 0 || isMusicPlaying) return;
  
  try {
    const ctx = initAudio();
    if (!ctx) return;
    
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const musicVolume = gameState.settings.musicVolume / 100;
    bgMusicGain = ctx.createGain();
    bgMusicGain.gain.setValueAtTime(0.25 * musicVolume, ctx.currentTime);
    bgMusicGain.connect(ctx.destination);
    
    let intensity = initialIntensity;
    let beatCount = initialBeatCount;
    let beatInterval = 400;
    
    const playBeat = () => {
      if (!isMusicPlaying || gameState.settings.musicVolume <= 0) return;
      if (bgMusicOscillator && bgMusicOscillator.isPaused) return;
      
      // Simple kick drum
      if (beatCount % 4 === 0) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(bgMusicGain);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
      }
      
      beatCount++;
      
      if (bgMusicOscillator) {
        bgMusicOscillator.timeoutId = setTimeout(playBeat, beatInterval);
      }
    };
    
    bgMusicOscillator = { timeoutId: null, isPaused: false, intensity, beatCount };
    isMusicPlaying = true;
    playBeat();
  } catch(e) {
    console.log('Music error:', e);
  }
}

// Stop background music
export function stopBackgroundMusic() {
  if (bgMusicOscillator) {
    if (bgMusicOscillator.timeoutId) {
      clearTimeout(bgMusicOscillator.timeoutId);
    }
    bgMusicOscillator = null;
  }
  if (bgMusicIntervalId) {
    clearInterval(bgMusicIntervalId);
    bgMusicIntervalId = null;
  }
  isMusicPlaying = false;
}

// Pause background music
export function pauseBackgroundMusic() {
  if (bgMusicOscillator && bgMusicOscillator.timeoutId) {
    clearTimeout(bgMusicOscillator.timeoutId);
    bgMusicOscillator.timeoutId = null;
    bgMusicOscillator.isPaused = true;
  }
}

// Resume background music
export function resumeBackgroundMusic() {
  if (gameState.settings.musicVolume <= 0 || !isMusicPlaying) return;
  
  if (bgMusicOscillator && bgMusicOscillator.isPaused) {
    bgMusicOscillator.isPaused = false;
    const savedIntensity = bgMusicOscillator.intensity || 0.7;
    const savedBeatCount = bgMusicOscillator.beatCount || 0;
    stopBackgroundMusic();
    startBackgroundMusic(savedIntensity, savedBeatCount);
  }
}

// Export audio context getter
export function getAudioContext() {
  return audioContext;
}

export function isAudioUnlocked() {
  return audioUnlocked;
}
