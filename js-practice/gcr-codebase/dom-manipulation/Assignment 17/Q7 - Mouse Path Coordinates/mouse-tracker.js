/**
 * Q7 - Mouse Path and Coordinates Logger
 * Concepts demonstrated:
 * 1. Listening to 'mousemove', 'mouseenter', 'mouseleave', and 'dblclick' events
 * 2. Reading viewport-based MouseEvent properties (clientX, clientY)
 * 3. Computing local coordinates using Element.getBoundingClientRect()
 * 4. Dynamic element creation and absolute positioning based on event coordinates
 */

// DOM Elements
const trackingBox = document.getElementById('trackingBox');
const clientXVal = document.getElementById('clientXVal');
const clientYVal = document.getElementById('clientYVal');
const localCoordVal = document.getElementById('localCoordVal');
const crosshairX = document.getElementById('crosshairX');
const crosshairY = document.getElementById('crosshairY');
const trackerStatus = document.getElementById('trackerStatus');
const dotCount = document.getElementById('dotCount');
const clearDotsBtn = document.getElementById('clearDotsBtn');

let placedDots = 0;

/**
 * Initialize event listeners
 */
function initMouseTracker() {
    // Track mouse movement inside the 400x400 box
    trackingBox.addEventListener('mousemove', handleMouseMove);

    // Track mouse entering and leaving box boundaries
    trackingBox.addEventListener('mouseenter', handleMouseEnter);
    trackingBox.addEventListener('mouseleave', handleMouseLeave);

    // Place a red dot marker on double-click
    trackingBox.addEventListener('dblclick', handleDoubleClick);

    // Clear placed markers
    clearDotsBtn.addEventListener('click', clearAllDots);
}

/**
 * Tracks mouse coordinates and updates UI readouts
 * @param {MouseEvent} event 
 */
function handleMouseMove(event) {
    // Core requirement: Display live clientX and clientY
    const clientX = event.clientX;
    const clientY = event.clientY;

    clientXVal.textContent = clientX;
    clientYVal.textContent = clientY;

    // Calculate relative coordinates inside the 400x400 box
    const rect = trackingBox.getBoundingClientRect();
    const localX = Math.round(clientX - rect.left);
    const localY = Math.round(clientY - rect.top);

    localCoordVal.textContent = `(${localX}, ${localY})`;

    // Position dynamic crosshair guidelines
    crosshairX.style.top = `${localY}px`;
    crosshairY.style.left = `${localX}px`;
}

/**
 * Triggered when cursor enters the tracking box
 */
function handleMouseEnter() {
    trackingBox.classList.add('active');
    trackerStatus.textContent = 'Status: Tracking Active';
    trackerStatus.className = 'tracker-status status-tracking';
}

/**
 * Triggered when cursor leaves the tracking box
 */
function handleMouseLeave() {
    trackingBox.classList.remove('active');
    trackerStatus.textContent = 'Status: Idle (Outside Box)';
    trackerStatus.className = 'tracker-status status-idle';
}

/**
 * Places a persistent red dot at the double-clicked position inside the box
 * @param {MouseEvent} event 
 */
function handleDoubleClick(event) {
    const rect = trackingBox.getBoundingClientRect();
    
    // Calculate click coordinates relative to the 400x400 tracking box
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Create the red dot element
    const dot = document.createElement('div');
    dot.className = 'red-dot';
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.setAttribute('title', `Marker at client: (${event.clientX}, ${event.clientY}), local: (${Math.round(x)}, ${Math.round(y)})`);

    // Append marker inside tracking box
    trackingBox.appendChild(dot);

    // Update count
    placedDots++;
    updateDotCount();
}

/**
 * Clears all placed red dots from the tracking box
 */
function clearAllDots() {
    const dots = trackingBox.querySelectorAll('.red-dot');
    dots.forEach(dot => dot.remove());
    placedDots = 0;
    updateDotCount();
}

/**
 * Updates the dot count badge
 */
function updateDotCount() {
    dotCount.textContent = placedDots;
}

// Start tracking application
initMouseTracker();
