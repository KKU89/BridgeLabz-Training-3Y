/**
 * Q8 - Custom JavaScript Dropdown
 * Concepts demonstrated:
 * 1. Building a custom accessible dropdown without HTML <select>
 * 2. Event Capturing Phase (useCapture = true) vs Bubbling Phase
 * 3. Outside click dismissal using event.target containment
 * 4. Keyboard navigation & ARIA attributes
 */

// DOM Elements
const customDropdown = document.getElementById('customDropdown');
const dropdownTrigger = document.getElementById('dropdownTrigger');
const dropdownMenu = document.getElementById('dropdownMenu');
const selectedText = document.getElementById('selectedText');
const feedbackValue = document.getElementById('feedbackValue');
const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');

// Dropdown State
let isOpen = false;

/**
 * Initializes dropdown event handlers
 */
function initCustomDropdown() {
    // 1. Toggle dropdown menu when clicking the trigger button
    dropdownTrigger.addEventListener('click', toggleDropdown);

    // 2. Select option when an item in the menu is clicked
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => handleOptionSelect(item));
    });

    // 3. CORE REQUIREMENT: Use capturing phase (`true`) for outside-click dismissal
    // Passing `true` as the third argument binds the listener to the Capturing (Trickling) Phase.
    // The browser evaluates this listener on the way DOWN the DOM tree before reaching the target element.
    document.addEventListener('click', handleOutsideClick, true);

    // 4. Keyboard accessibility (Escape key closes dropdown)
    document.addEventListener('keydown', handleKeyDown);
}

/**
 * Toggles the open/closed state of the custom dropdown
 * @param {MouseEvent} event 
 */
function toggleDropdown(event) {
    if (isOpen) {
        closeDropdown();
    } else {
        openDropdown();
    }
}

/**
 * Opens the dropdown menu
 */
function openDropdown() {
    isOpen = true;
    customDropdown.classList.add('open');
    dropdownTrigger.setAttribute('aria-expanded', 'true');
}

/**
 * Closes the dropdown menu
 */
function closeDropdown() {
    isOpen = false;
    customDropdown.classList.remove('open');
    dropdownTrigger.setAttribute('aria-expanded', 'false');
}

/**
 * Handles selecting an option from the menu
 * @param {HTMLElement} item 
 */
function handleOptionSelect(item) {
    // Extract text content from the selected option (excluding icon)
    const optionLabel = item.textContent.trim();

    // Requirement: Update button text with selected option
    selectedText.textContent = optionLabel;
    feedbackValue.textContent = optionLabel;

    // Update active highlight classes
    dropdownItems.forEach(el => el.classList.remove('selected'));
    item.classList.add('selected');

    // Close dropdown after selection
    closeDropdown();
    dropdownTrigger.focus();
}

/**
 * Outside-click detection handler bound to the Capturing Phase
 * @param {MouseEvent} event 
 */
function handleOutsideClick(event) {
    // If the dropdown is currently open and the click target is OUTSIDE the dropdown container
    if (isOpen && !customDropdown.contains(event.target)) {
        closeDropdown();
    }
}

/**
 * Keyboard navigation support
 * @param {KeyboardEvent} event 
 */
function handleKeyDown(event) {
    if (event.key === 'Escape' && isOpen) {
        closeDropdown();
        dropdownTrigger.focus();
    }
}

// Start custom dropdown
initCustomDropdown();
