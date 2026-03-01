/**
 * Main Module Exports
 * Re-exports all modules for easy importing
 */

// Configuration
export * from './config/colors.js';
export * from './config/levels.js';
export * from './config/constants.js';
export * from './config/dom.js';

// Core
export * from './core/state.js';
export * from './core/audio.js';

// Store
export * from './store/store.js';

// Utils
export * from './utils/helpers.js';

// Game
export * from './game/obstacles.js';
export * from './game/collisions.js';
export * from './game/render.js';
export * from './game/controls.js';
export * from './game/engine.js';

// UI
export * from './ui/screens.js';
export * from './ui/particles.js';
export * from './ui/events.js';

// App initialization
export { initApp } from './app.js';
