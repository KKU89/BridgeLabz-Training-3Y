/**
 * Q4 - Theme Switcher
 * Concepts demonstrated:
 * 1. DOM selection & event handling
 * 2. Manipulating element attributes using setAttribute()
 * 3. CSS attribute selector integration via data-theme
 * 4. State persistence using localStorage
 */

// Available supported themes
const VALID_THEMES = ['light', 'dark', 'blue'];
const DEFAULT_THEME = 'light';

// DOM Elements
const themeButtons = document.querySelectorAll('.theme-btn');
const currentThemeDisplay = document.getElementById('currentThemeDisplay');

/**
 * Initializes theme switcher
 */
function initThemeSwitcher() {
    // 1. Retrieve previously saved theme or fallback to default
    const savedTheme = getSavedTheme();
    applyTheme(savedTheme);

    // 2. Attach click handlers to theme buttons
    themeButtons.forEach(button => {
        button.addEventListener('click', handleThemeButtonClick);
    });
}

/**
 * Handles click event on a theme button
 * @param {MouseEvent} event 
 */
function handleThemeButtonClick(event) {
    const selectedTheme = event.currentTarget.getAttribute('data-theme-target');

    if (VALID_THEMES.includes(selectedTheme)) {
        applyTheme(selectedTheme);
        saveThemePreference(selectedTheme);
    }
}

/**
 * Applies the selected theme using setAttribute()
 * @param {string} themeName 
 */
function applyTheme(themeName) {
    // Core requirement: Apply theme using setAttribute on body
    document.body.setAttribute('data-theme', themeName);

    // Also set theme class using setAttribute
    document.body.setAttribute('class', `theme-${themeName}`);

    // Update the live status indicator
    currentThemeDisplay.textContent = `data-theme="${themeName}"`;

    // Update active button state
    updateActiveButton(themeName);
}

/**
 * Updates button active styling based on currently selected theme
 * @param {string} activeTheme 
 */
function updateActiveButton(activeTheme) {
    themeButtons.forEach(btn => {
        const targetTheme = btn.getAttribute('data-theme-target');
        if (targetTheme === activeTheme) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        }
    });
}

/**
 * Persists theme preference to localStorage
 * @param {string} themeName 
 */
function saveThemePreference(themeName) {
    try {
        localStorage.setItem('preferred-theme', themeName);
    } catch (e) {
        // Fallback gracefully if localStorage is disabled in browser
        console.warn('LocalStorage unavailable:', e);
    }
}

/**
 * Reads theme preference from localStorage
 * @returns {string}
 */
function getSavedTheme() {
    try {
        const saved = localStorage.getItem('preferred-theme');
        if (saved && VALID_THEMES.includes(saved)) {
            return saved;
        }
    } catch (e) {
        console.warn('LocalStorage unavailable:', e);
    }
    return DEFAULT_THEME;
}

// Start theme switcher
initThemeSwitcher();
