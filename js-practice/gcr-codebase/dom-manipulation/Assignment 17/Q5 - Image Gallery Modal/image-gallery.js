/**
 * Q5 - Image Gallery Modal
 * Concepts demonstrated:
 * 1. Event bubbling and event propagation model
 * 2. event.stopPropagation() to isolate clicks inside the modal card
 * 3. Handling backdrop clicks to dismiss dialogs
 * 4. Keyboard accessibility (Escape key to close)
 */

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const imageModal = document.getElementById('imageModal');
const modalDialog = document.getElementById('modalDialog');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');

/**
 * Initializes the image gallery and modal listeners
 */
function initGallery() {
    // 1. Open modal when clicking any gallery item
    galleryGrid.addEventListener('click', handleGalleryItemClick);

    // 2. Close modal when clicking outside (on the modal backdrop)
    imageModal.addEventListener('click', handleBackdropClick);

    // 3. CORE REQUIREMENT: Stop event bubbling inside modal dialog
    // Without this, clicks inside the modal dialog would bubble up to imageModal and close it!
    modalDialog.addEventListener('click', handleModalDialogClick);

    // 4. Close modal when clicking the dedicated close button
    modalCloseBtn.addEventListener('click', closeModal);

    // 5. Close modal on Escape key press for keyboard accessibility
    document.addEventListener('keydown', handleDocumentKeyDown);

    // Add image error fallback handlers
    setupImageErrorFallbacks();
}

/**
 * Handles clicking an image in the gallery
 * @param {MouseEvent} event 
 */
function handleGalleryItemClick(event) {
    const item = event.target.closest('.gallery-item');
    if (!item) return;

    const fullSrc = item.getAttribute('data-full');
    const title = item.getAttribute('data-title');
    const imgEl = item.querySelector('img');

    // Use current image src if full image fails or loads slowly
    openModal(fullSrc || imgEl.src, title);
}

/**
 * Opens the modal and displays the selected image
 * @param {string} src 
 * @param {string} title 
 */
function openModal(src, title) {
    modalImg.src = src;
    modalImg.alt = title;
    modalTitle.textContent = title;

    imageModal.classList.add('open');
    imageModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

/**
 * Closes the modal
 */
function closeModal() {
    imageModal.classList.remove('open');
    imageModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore background scrolling
    modalImg.src = ''; // Clean up image source
}

/**
 * Handles clicks on the outer backdrop to close the modal
 * @param {MouseEvent} event 
 */
function handleBackdropClick(event) {
    // If the click occurred directly on the backdrop (not inside modalDialog)
    closeModal();
}

/**
 * Intercepts clicks inside the modal card to prevent closing
 * @param {MouseEvent} event 
 */
function handleModalDialogClick(event) {
    // CRITICAL: Stop propagation so that click event does not bubble up to imageModal
    event.stopPropagation();
}

/**
 * Handles Escape key to dismiss modal
 * @param {KeyboardEvent} event 
 */
function handleDocumentKeyDown(event) {
    if (event.key === 'Escape' && imageModal.classList.contains('open')) {
        closeModal();
    }
}

/**
 * Fallback to programmatic SVG data URL if offline or network blocks image
 */
function setupImageErrorFallbacks() {
    const images = document.querySelectorAll('.gallery-item img');
    images.forEach((img, idx) => {
        img.addEventListener('error', () => {
            const colors = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
            const color = colors[idx % colors.length];
            const title = img.alt || `Photo ${idx + 1}`;
            const svg = `
                <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
                    <rect width="600" height="400" fill="${color}" />
                    <text x="50%" y="50%" fill="#ffffff" font-size="24" font-family="sans-serif" font-weight="bold" dominant-baseline="middle" text-anchor="middle">
                        ${title}
                    </text>
                </svg>
            `.trim();
            img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
        });
    });
}

// Start gallery
initGallery();
