// ==================== STORE MODULE ====================
import { BOX_COLORS, RAINBOW_COLORS, getColorById, adjustColor } from '../config/colors.js';
import { RAINBOW_INTERVAL } from '../config/constants.js';
import { 
  gameState, 
  saveGameState, 
  isColorPurchased, 
  purchaseColor, 
  equipColor, 
  getEquippedColor 
} from '../core/state.js';
import { playSound } from '../core/audio.js';

// DOM Elements
let colorGrid = null;
let previewBox = null;
let previewName = null;
let diamondDisplay = null;
let box = null;

// Rainbow animation
let rainbowIntervalId = null;
let currentRainbowIndex = 0;

// Initialize store with DOM elements
export function initStore(elements) {
  colorGrid = elements.colorGrid;
  previewBox = elements.previewBox;
  previewName = elements.previewName;
  diamondDisplay = elements.diamondDisplay;
  box = elements.box;
}

// Render the color grid with buy/equip buttons
export function renderColorGrid() {
  if (!colorGrid) return;
  
  colorGrid.innerHTML = '';
  
  BOX_COLORS.forEach(colorData => {
    const colorItem = document.createElement('div');
    colorItem.className = 'color-item';
    colorItem.dataset.colorId = colorData.id;
    
    // Check states
    const isPurchased = isColorPurchased(colorData.id);
    const isEquipped = getEquippedColor() === colorData.id;
    
    // Add classes
    if (isEquipped) {
      colorItem.classList.add('equipped');
    }
    if (isPurchased) {
      colorItem.classList.add('owned');
    }
    if (colorData.isSpecial) {
      colorItem.classList.add('special');
    }
    
    // Create color preview
    const colorPreview = document.createElement('div');
    colorPreview.className = 'color-preview';
    
    // Rainbow animation for preview
    if (colorData.isRainbow) {
      colorPreview.classList.add('rainbow-preview');
      animateRainbowPreview(colorPreview);
    } else {
      colorPreview.style.background = colorData.color;
      colorPreview.style.boxShadow = `0 4px 15px ${colorData.glow}`;
    }
    
    // Color name
    const colorName = document.createElement('span');
    colorName.className = 'color-name';
    colorName.textContent = colorData.name;
    
    // Price or status
    const priceOrStatus = document.createElement('div');
    priceOrStatus.className = 'color-price';
    
    if (isEquipped) {
      priceOrStatus.innerHTML = '<span class="equipped-badge">✓ EQUIPPED</span>';
    } else if (isPurchased) {
      priceOrStatus.innerHTML = '<span class="owned-badge">OWNED</span>';
    } else if (colorData.isFree) {
      priceOrStatus.innerHTML = '<span class="free-badge">FREE</span>';
    } else {
      priceOrStatus.innerHTML = `<span class="diamond-icon">💎</span> ${colorData.price}`;
    }
    
    // Action button
    const actionBtn = document.createElement('button');
    actionBtn.className = 'color-action-btn';
    
    if (isEquipped) {
      actionBtn.textContent = 'EQUIPPED';
      actionBtn.classList.add('btn-equipped');
      actionBtn.disabled = true;
    } else if (isPurchased) {
      actionBtn.textContent = 'EQUIP';
      actionBtn.classList.add('btn-equip');
      actionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleEquip(colorData.id);
      });
    } else {
      actionBtn.textContent = 'BUY';
      actionBtn.classList.add('btn-buy');
      
      // Check if can afford
      if (gameState.totalDiamonds < colorData.price && !colorData.isFree) {
        actionBtn.classList.add('btn-disabled');
      }
      
      actionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleBuy(colorData.id);
      });
    }
    
    // Assemble
    colorItem.appendChild(colorPreview);
    colorItem.appendChild(colorName);
    colorItem.appendChild(priceOrStatus);
    colorItem.appendChild(actionBtn);
    
    // Click on item to preview
    colorItem.addEventListener('click', () => previewColor(colorData.id));
    
    colorGrid.appendChild(colorItem);
  });
  
  updateColorPreview();
  updateDiamondDisplay();
}

// Handle buying a color
function handleBuy(colorId) {
  const color = getColorById(colorId);
  
  if (isColorPurchased(colorId)) {
    handleEquip(colorId);
    return;
  }
  
  // Check if free
  if (color.isFree || color.price === 0) {
    if (purchaseColor(colorId)) {
      playSound('purchase');
      handleEquip(colorId);
      renderColorGrid();
    }
    return;
  }
  
  // Check if can afford
  if (gameState.totalDiamonds < color.price) {
    playSound('error');
    showNotification(`Need ${color.price - gameState.totalDiamonds} more diamonds!`, 'error');
    return;
  }
  
  // Purchase
  if (purchaseColor(colorId)) {
    playSound('purchase');
    showNotification(`Purchased ${color.name}!`, 'success');
    handleEquip(colorId);
    renderColorGrid();
  }
}

// Handle equipping a color
function handleEquip(colorId) {
  if (!isColorPurchased(colorId)) {
    handleBuy(colorId);
    return;
  }
  
  if (equipColor(colorId)) {
    playSound('click');
    renderColorGrid();
    applyBoxColor();
    
    // Start rainbow animation if rainbow is equipped
    if (colorId === 'rainbow') {
      startRainbowAnimation();
    } else {
      stopRainbowAnimation();
    }
  }
}

// Preview a color
function previewColor(colorId) {
  const colorData = getColorById(colorId);
  
  if (previewBox) {
    if (colorData.isRainbow) {
      animateRainbowPreview(previewBox);
    } else {
      previewBox.style.background = colorData.color;
      previewBox.style.boxShadow = `0 0 15px ${colorData.glow}`;
    }
  }
  
  if (previewName) {
    previewName.textContent = colorData.name;
    if (colorData.isSpecial) {
      previewName.classList.add('special-name');
    } else {
      previewName.classList.remove('special-name');
    }
  }
}

// Update color preview to show equipped color
export function updateColorPreview() {
  const colorId = getEquippedColor();
  previewColor(colorId);
}

// Update diamond display
function updateDiamondDisplay() {
  if (diamondDisplay) {
    diamondDisplay.textContent = gameState.totalDiamonds;
  }
  
  // Also update menu diamond display
  const menuDiamonds = document.getElementById('menuDiamonds');
  if (menuDiamonds) {
    menuDiamonds.textContent = gameState.totalDiamonds;
  }
}

// Apply box color (including rainbow animation)
export function applyBoxColor() {
  if (!box) return;
  
  const colorId = getEquippedColor();
  const colorData = getColorById(colorId);
  
  if (colorData.isRainbow) {
    startRainbowAnimation();
  } else {
    stopRainbowAnimation();
    setBoxColor(colorData.color, colorData.glow);
  }
}

// Set box color
function setBoxColor(color, glow) {
  if (!box) return;
  
  box.style.background = `linear-gradient(135deg, ${color}, ${adjustColor(color, -30)})`;
  box.style.boxShadow = `
    0 0 20px ${glow},
    0 0 40px ${glow.replace('0.8', '0.4')},
    inset 0 0 15px rgba(255, 255, 255, 0.3)
  `;
}

// Rainbow animation for the player box
export function startRainbowAnimation() {
  stopRainbowAnimation();
  
  currentRainbowIndex = 0;
  updateRainbowColor();
  
  rainbowIntervalId = setInterval(() => {
    currentRainbowIndex = (currentRainbowIndex + 1) % RAINBOW_COLORS.length;
    updateRainbowColor();
  }, RAINBOW_INTERVAL);
}

function updateRainbowColor() {
  const rainbowColor = RAINBOW_COLORS[currentRainbowIndex];
  setBoxColor(rainbowColor.color, rainbowColor.glow);
}

export function stopRainbowAnimation() {
  if (rainbowIntervalId) {
    clearInterval(rainbowIntervalId);
    rainbowIntervalId = null;
  }
}

// Animate rainbow preview element
function animateRainbowPreview(element) {
  let index = 0;
  
  const updatePreview = () => {
    const rainbowColor = RAINBOW_COLORS[index];
    element.style.background = rainbowColor.color;
    element.style.boxShadow = `0 4px 15px ${rainbowColor.glow}`;
    index = (index + 1) % RAINBOW_COLORS.length;
  };
  
  updatePreview();
  
  // Store interval ID on element for cleanup
  if (element._rainbowInterval) {
    clearInterval(element._rainbowInterval);
  }
  element._rainbowInterval = setInterval(updatePreview, RAINBOW_INTERVAL);
}

// Show notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `store-notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => notification.classList.add('show'), 10);
  
  // Remove after delay
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Update store when diamonds change
export function refreshStore() {
  renderColorGrid();
  updateDiamondDisplay();
}

// Check if rainbow is currently equipped
export function isRainbowEquipped() {
  return getEquippedColor() === 'rainbow';
}
