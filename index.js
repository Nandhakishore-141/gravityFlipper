/**
 * Gravity Flipper - Main Entry Point
 * 
 * This file serves as the entry point for the game.
 * All game logic is organized in modular files under src/js/
 * 
 * Structure:
 * - src/js/config/    - Configuration (constants, levels, colors, DOM elements)
 * - src/js/core/      - Core systems (state management, audio)
 * - src/js/game/      - Game logic (engine, controls, obstacles, collisions, render)
 * - src/js/ui/        - UI systems (screens, events, particles)
 * - src/js/store/     - Store functionality
 * - src/js/utils/     - Utility functions
 */

import { initApp } from './src/js/app.js';

// Initialize the game when the script loads
initApp();
