/**
 * Q9 - Form Submit Blocker
 * Concepts demonstrated:
 * 1. Form submission interception using event.preventDefault()
 * 2. Field-level validation rules (required, substring check '@', length check >= 6)
 * 3. Dynamic inline error presentation and removal
 * 4. Automatic error clearance upon input correction (real-time 'input' listener)
 * 5. Success confirmation state
 */

// DOM Elements
const authForm = document.getElementById('authForm');
const successBanner = document.getElementById('successBanner');
const resetBtn = document.getElementById('resetBtn');

// Inputs
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');

// Error Containers
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

/**
 * Initializes form validation event listeners
 */
function initFormValidation() {
    // 1. Intercept form submit event
    authForm.addEventListener('submit', handleFormSubmit);

    // 2. Real-time validation: Automatically remove errors as the user types valid input
    nameInput.addEventListener('input', () => validateName(false));
    emailInput.addEventListener('input', () => validateEmail(false));
    passwordInput.addEventListener('input', () => validatePassword(false));

    // Also validate on blur for better user experience
    nameInput.addEventListener('blur', () => validateName(true));
    emailInput.addEventListener('blur', () => validateEmail(true));
    passwordInput.addEventListener('blur', () => validatePassword(true));

    // Reset button handler
    resetBtn.addEventListener('click', handleReset);
}

/**
 * Handles form submission
 * @param {SubmitEvent} event 
 */
function handleFormSubmit(event) {
    // Core requirement: preventDefault() stops default browser form submission
    event.preventDefault();

    // Validate all fields (with showError = true)
    const isNameValid = validateName(true);
    const isEmailValid = validateEmail(true);
    const isPasswordValid = validatePassword(true);

    const isFormValid = isNameValid && isEmailValid && isPasswordValid;

    if (!isFormValid) {
        // Submission BLOCKED due to validation failure
        hideSuccessBanner();

        // Focus the first invalid field for accessibility
        if (!isNameValid) {
            nameInput.focus();
        } else if (!isEmailValid) {
            emailInput.focus();
        } else if (!isPasswordValid) {
            passwordInput.focus();
        }
        return;
    }

    // Submission SUCCESSFUL
    showSuccessBanner();
}

/**
 * Validates Full Name (Required)
 * @param {boolean} triggerErrorDisplay 
 * @returns {boolean}
 */
function validateName(triggerErrorDisplay) {
    const value = nameInput.value.trim();

    if (value.length === 0) {
        if (triggerErrorDisplay) {
            showInlineError(nameInput, nameError, 'Name is required.');
        }
        return false;
    }

    // Automatically remove error when valid
    clearInlineError(nameInput, nameError);
    return true;
}

/**
 * Validates Email Address (Required and must contain '@')
 * @param {boolean} triggerErrorDisplay 
 * @returns {boolean}
 */
function validateEmail(triggerErrorDisplay) {
    const value = emailInput.value.trim();

    if (value.length === 0) {
        if (triggerErrorDisplay) {
            showInlineError(emailInput, emailError, 'Email is required.');
        }
        return false;
    }

    // Requirement: Email must contain '@'
    if (!value.includes('@')) {
        if (triggerErrorDisplay) {
            showInlineError(emailInput, emailError, "Email must contain an '@' character.");
        }
        return false;
    }

    // Check for domain part after '@'
    const parts = value.split('@');
    if (parts[1].length === 0) {
        if (triggerErrorDisplay) {
            showInlineError(emailInput, emailError, "Please enter a valid domain after '@'.");
        }
        return false;
    }

    // Automatically remove error when valid
    clearInlineError(emailInput, emailError);
    return true;
}

/**
 * Validates Password (Required and at least 6 characters)
 * @param {boolean} triggerErrorDisplay 
 * @returns {boolean}
 */
function validatePassword(triggerErrorDisplay) {
    const value = passwordInput.value;

    if (value.length === 0) {
        if (triggerErrorDisplay) {
            showInlineError(passwordInput, passwordError, 'Password is required.');
        }
        return false;
    }

    // Requirement: Password must have at least 6 characters
    if (value.length < 6) {
        if (triggerErrorDisplay) {
            showInlineError(passwordInput, passwordError, 'Password must have at least 6 characters.');
        }
        return false;
    }

    // Automatically remove error when valid
    clearInlineError(passwordInput, passwordError);
    return true;
}

/**
 * Displays an inline error message and flags the input as invalid
 * @param {HTMLInputElement} input 
 * @param {HTMLElement} errorSpan 
 * @param {string} message 
 */
function showInlineError(input, errorSpan, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    errorSpan.textContent = message;
}

/**
 * Clears the inline error message and restores valid state
 * @param {HTMLInputElement} input 
 * @param {HTMLElement} errorSpan 
 */
function clearInlineError(input, errorSpan) {
    input.classList.remove('is-invalid');
    if (input.value.trim().length > 0) {
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
    }
    errorSpan.textContent = '';
}

/**
 * Displays the success notification banner
 */
function showSuccessBanner() {
    successBanner.classList.remove('hidden');
    successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Hides the success notification banner
 */
function hideSuccessBanner() {
    successBanner.classList.add('hidden');
}

/**
 * Resets the entire form and validation state
 */
function handleReset() {
    authForm.reset();
    clearInlineError(nameInput, nameError);
    clearInlineError(emailInput, emailError);
    clearInlineError(passwordInput, passwordError);
    nameInput.classList.remove('is-valid');
    emailInput.classList.remove('is-valid');
    passwordInput.classList.remove('is-valid');
    hideSuccessBanner();
    nameInput.focus();
}

// Start form validation
initFormValidation();
