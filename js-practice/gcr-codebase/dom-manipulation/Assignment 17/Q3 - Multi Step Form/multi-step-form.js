/**
 * Q3 - Multi Step Form
 * Concepts demonstrated:
 * 1. Multi-step wizard state management (currentStep: 1 -> 2 -> 3)
 * 2. Step-by-step input validation
 * 3. Conditional UI rendering & step indicators
 * 4. Back/Forward navigation with state preservation
 * 5. Data aggregation & Summary view generation
 */

// Application State
let currentStep = 1;
const totalSteps = 3;

const formData = {
    fullName: '',
    email: '',
    password: ''
};

// DOM Elements
const multiStepForm = document.getElementById('multiStepForm');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const summaryCard = document.getElementById('summaryCard');
const restartBtn = document.getElementById('restartBtn');

// Inputs
const nameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Errors
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Summary elements
const summaryName = document.getElementById('summaryName');
const summaryEmail = document.getElementById('summaryEmail');
const summaryPassword = document.getElementById('summaryPassword');

/**
 * Initializes form events
 */
function init() {
    // Next / Submit navigation
    nextBtn.addEventListener('click', handleNext);

    // Back navigation
    prevBtn.addEventListener('click', handleBack);

    // Restart form
    restartBtn.addEventListener('click', handleRestart);

    // Real-time error clearing on input change
    nameInput.addEventListener('input', () => validateName(false));
    emailInput.addEventListener('input', () => validateEmail(false));
    passwordInput.addEventListener('input', () => validatePassword(false));

    // Allow Enter key to advance step
    multiStepForm.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleNext();
        }
    });

    updateStepUI();
}

/**
 * Validates the current step before advancing
 */
function handleNext() {
    let isValid = false;

    if (currentStep === 1) {
        isValid = validateName(true);
        if (isValid) {
            formData.fullName = nameInput.value.trim();
        }
    } else if (currentStep === 2) {
        isValid = validateEmail(true);
        if (isValid) {
            formData.email = emailInput.value.trim();
        }
    } else if (currentStep === 3) {
        isValid = validatePassword(true);
        if (isValid) {
            formData.password = passwordInput.value;
        }
    }

    if (!isValid) return;

    if (currentStep < totalSteps) {
        currentStep++;
        updateStepUI();
    } else {
        // All steps completed successfully -> show summary
        showSummary();
    }
}

/**
 * Handles going back to the previous step
 */
function handleBack() {
    if (currentStep > 1) {
        currentStep--;
        updateStepUI();
    }
}

/**
 * Validates Full Name
 * @param {boolean} showError 
 * @returns {boolean}
 */
function validateName(showError) {
    const val = nameInput.value.trim();
    const nameRegex = /^[a-zA-Z\s'-]+$/;

    if (!val) {
        if (showError) displayError(nameInput, nameError, 'Full name is required.');
        return false;
    }

    if (val.length < 2) {
        if (showError) displayError(nameInput, nameError, 'Name must be at least 2 characters.');
        return false;
    }

    if (!nameRegex.test(val)) {
        if (showError) displayError(nameInput, nameError, 'Name can only contain letters and spaces.');
        return false;
    }

    clearError(nameInput, nameError);
    return true;
}

/**
 * Validates Email Address
 * @param {boolean} showError 
 * @returns {boolean}
 */
function validateEmail(showError) {
    const val = emailInput.value.trim();
    // Standard robust email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!val) {
        if (showError) displayError(emailInput, emailError, 'Email address is required.');
        return false;
    }

    if (!emailRegex.test(val)) {
        if (showError) displayError(emailInput, emailError, 'Please enter a valid email address (e.g. name@example.com).');
        return false;
    }

    clearError(emailInput, emailError);
    return true;
}

/**
 * Validates Password
 * @param {boolean} showError 
 * @returns {boolean}
 */
function validatePassword(showError) {
    const val = passwordInput.value;

    if (!val) {
        if (showError) displayError(passwordInput, passwordError, 'Password is required.');
        return false;
    }

    if (val.length < 6) {
        if (showError) displayError(passwordInput, passwordError, 'Password must be at least 6 characters.');
        return false;
    }

    clearError(passwordInput, passwordError);
    return true;
}

/**
 * Helper to show input error state
 */
function displayError(input, errorSpan, message) {
    input.classList.add('invalid');
    errorSpan.textContent = message;
}

/**
 * Helper to clear input error state
 */
function clearError(input, errorSpan) {
    input.classList.remove('invalid');
    errorSpan.textContent = '';
}

/**
 * Synchronizes visible form steps, buttons, and progress indicators with currentStep
 */
function updateStepUI() {
    // 1. Toggle Step Panels
    for (let i = 1; i <= totalSteps; i++) {
        const stepEl = document.getElementById(`step${i}`);
        if (i === currentStep) {
            stepEl.classList.add('active');
        } else {
            stepEl.classList.remove('active');
        }
    }

    // 2. Update Progress Indicators
    for (let i = 1; i <= totalSteps; i++) {
        const indicator = document.getElementById(`indicator${i}`);
        indicator.classList.remove('active', 'completed');

        if (i === currentStep) {
            indicator.classList.add('active');
        } else if (i < currentStep) {
            indicator.classList.add('completed');
        }
    }

    // 3. Update Connecting Lines
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    line1.classList.toggle('completed', currentStep > 1);
    line2.classList.toggle('completed', currentStep > 2);

    // 4. Update Navigation Buttons
    prevBtn.disabled = currentStep === 1;

    if (currentStep === totalSteps) {
        nextBtn.textContent = 'Complete Registration';
    } else {
        nextBtn.textContent = 'Next Step';
    }

    // 5. Auto focus active step's input
    if (currentStep === 1) nameInput.focus();
    if (currentStep === 2) emailInput.focus();
    if (currentStep === 3) passwordInput.focus();
}

/**
 * Shows the completion summary view
 */
function showSummary() {
    multiStepForm.style.display = 'none';
    summaryCard.classList.remove('hidden');

    summaryName.textContent = formData.fullName;
    summaryEmail.textContent = formData.email;
    // Mask password for security display
    summaryPassword.textContent = '•'.repeat(formData.password.length);
}

/**
 * Restarts the form process
 */
function handleRestart() {
    formData.fullName = '';
    formData.email = '';
    formData.password = '';

    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';

    clearError(nameInput, nameError);
    clearError(emailInput, emailError);
    clearError(passwordInput, passwordError);

    currentStep = 1;
    summaryCard.classList.add('hidden');
    multiStepForm.style.display = 'block';

    updateStepUI();
}

// Start application
init();
