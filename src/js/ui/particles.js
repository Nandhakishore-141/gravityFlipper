/**
 * Background Particles System
 */

import { gameState } from '../core/state.js';
import * as dom from '../config/dom.js';
import { randInt } from '../utils/helpers.js';

/**
 * Create initial background particles
 */
export function createBackgroundParticles() {
  if (!gameState.settings.particles) return;
  
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      createParticle();
    }, i * 500);
  }
}

/**
 * Create a single particle
 */
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
  dom.bgParticles.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
    createParticle();
  }, parseInt(particle.style.animationDuration) * 1000);
}
