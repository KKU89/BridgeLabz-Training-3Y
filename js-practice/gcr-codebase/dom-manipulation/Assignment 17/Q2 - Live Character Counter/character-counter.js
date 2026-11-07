/**
 * Q2 - Live Character Counter
 * Concepts demonstrated:
 * 1. Listening to keydown, input, and paste events
 * 2. Character length calculation and remaining count
 * 3. Conditional class toggling based on thresholds (<= 20: yellow, 0: red)
 * 4. Using event.preventDefault() to block typing when limit is reached
 * 5. State resetting
 */

// Configuration constant
const MAX_CHARACTERS = 100;
const WARNING_THRESHOLD = 20;

// DOM Elements
const messageInput = document.getElementById('messageInput');
const remainingCount = document.getElementById('remainingCount');
const progressBar = document.getElementById('progressBar');
const limitAlert = document.getElementById('limitAlert');
const resetBtn = document.getElementById('resetBtn');

/**
 * Initialize event listeners
 */
function init() {
    // Intercept keys BEFORE they are inserted to prevent exceeding the limit
    messageInput.addEventListener('keydown', handleKeyDown);

    // Update counter on any value change (typing, cut, paste, undo)
    messageInput.addEventListener('input', updateCounter);

    // Handle pasting gracefully to not exceed 100 characters
    messageInput.addEventListener('paste', handlePaste);

    // Reset button functionality
    resetBtn.addEventListener('click', handleReset);

    // Initial calculation
    updateCounter();
}

/**
 * Prevents further typing if the character limit is reached
 * @param {KeyboardEvent} e 
 */
function handleKeyDown(e) {
    const currentLength = messageInput.value.length;
    const isTextSelected = messageInput.selectionStart !== messageInput.selectionEnd;

    // Allowed navigation and editing control keys
    const allowedKeys = [
        'Backspace',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
        'Tab',
        'Escape'
    ];

    // Allow keyboard shortcuts (Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z, etc.)
    const isModifierKey = e.ctrlKey || e.metaKey || e.altKey;

    if (allowedKeys.includes(e.key) || isModifierKey) {
        return; // Allow the operation
    }

    // If text is selected, typing will replace the selected text, so allow it
    if (isTextSelected) {
        return;
    }

    // If limit is reached, prevent additional character typing
    if (currentLength >= MAX_CHARACTERS) {
        // Prevent default browser behavior (inserting the character)
        e.preventDefault();
        showLimitWarning('Character limit reached (100/100). Cannot type more.');
    }
}

/**
 * Handles paste event to prevent exceeding 100 characters
 * @param {ClipboardEvent} e 
 */
function handlePaste(e) {
    const pasteData = (e.clipboardData || window.clipboardData).getData('text');
    const currentLength = messageInput.value.length;
    const selectedLength = messageInput.selectionEnd - messageInput.selectionStart;
    const availableSpace = MAX_CHARACTERS - (currentLength - selectedLength);

    if (pasteData.length > availableSpace) {
        e.preventDefault();

        // Truncate pasted text to fill whatever space is remaining
        const truncatedText = pasteData.slice(0, availableSpace);
        const start = messageInput.selectionStart;
        const end = messageInput.selectionEnd;
        const currentValue = messageInput.value;

        messageInput.value = currentValue.slice(0, start) + truncatedText + currentValue.slice(end);
        
        // Move cursor to end of inserted text
        const newCursorPos = start + truncatedText.length;
        messageInput.setSelectionRange(newCursorPos, newCursorPos);

        updateCounter();
        showLimitWarning('Pasted text was trimmed to fit the 100-character limit.');
    }
}

/**
 * Updates the remaining character count, colors, and progress bar
 */
function updateCounter() {
    let currentLength = messageInput.value.length;

    // Safety guard: clamp string to MAX_CHARACTERS if somehow bypassed
    if (currentLength > MAX_CHARACTERS) {
        messageInput.value = messageInput.value.slice(0, MAX_CHARACTERS);
        currentLength = MAX_CHARACTERS;
    }

    const remaining = MAX_CHARACTERS - currentLength;
    remainingCount.textContent = remaining;

    // Update Progress Bar
    const percentUsed = (currentLength / MAX_CHARACTERS) * 100;
    progressBar.style.width = `${percentUsed}%`;

    // Remove all state classes first
    remainingCount.classList.remove('counter-normal', 'counter-warning', 'counter-danger');
    progressBar.classList.remove('bar-warning', 'bar-danger');
    messageInput.classList.remove('input-warning', 'input-danger');

    // Apply color states based on remaining count
    if (remaining === 0) {
        // 0 remaining -> RED
        remainingCount.classList.add('counter-danger');
        progressBar.classList.add('bar-danger');
        messageInput.classList.add('input-danger');
        showLimitWarning('Maximum limit reached: 0 characters remaining.');
    } else if (remaining <= WARNING_THRESHOLD) {
        // 20 or fewer remaining -> YELLOW
        remainingCount.classList.add('counter-warning');
        progressBar.classList.add('bar-warning');
        messageInput.classList.add('input-warning');
        limitAlert.textContent = '';
    } else {
        // Default -> NORMAL
        remainingCount.classList.add('counter-normal');
        limitAlert.textContent = '';
    }
}

/**
 * Displays temporary warning message
 * @param {string} msg 
 */
function showLimitWarning(msg) {
    limitAlert.textContent = msg;
}

/**
 * Clears the textarea and resets the counter to 100
 */
function handleReset() {
    messageInput.value = '';
    limitAlert.textContent = '';
    updateCounter();
    messageInput.focus();
}

// Start application
init();
