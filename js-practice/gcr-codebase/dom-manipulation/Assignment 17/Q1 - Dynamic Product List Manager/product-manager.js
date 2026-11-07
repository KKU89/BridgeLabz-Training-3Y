/**
 * Q1 - Dynamic Product List Manager
 * Concepts demonstrated:
 * 1. DOM selection & manipulation
 * 2. Event Delegation on parent <ul>
 * 3. Inline editing with input swap
 * 4. Document-level outside click detection to auto-save edits
 */

// DOM Elements
const productForm = document.getElementById('productForm');
const productInput = document.getElementById('productInput');
const productList = document.getElementById('productList');
const productCount = document.getElementById('productCount');
const emptyState = document.getElementById('emptyState');
const errorMessage = document.getElementById('errorMessage');

// Tracks the list item currently being edited
let activeEditItem = null;

// Initial sample data
const initialProducts = ['Wireless Mechanical Keyboard', 'Ultra-HD 4K Monitor', 'Noise-Cancelling Headphones'];

/**
 * Initializes the application with sample data and event listeners
 */
function init() {
    initialProducts.forEach(name => addProductItem(name));
    updateListStats();

    // Event listener for adding new products
    productForm.addEventListener('submit', handleAddProduct);

    // Event Delegation: single listener on parent <ul> handles Edit and Delete
    productList.addEventListener('click', handleListClick);

    // Document-level listener: auto-save inline edits when clicking outside the active item
    document.addEventListener('click', handleOutsideClick);
}

/**
 * Creates and appends a product <li> to the list
 * @param {string} name - Name of the product
 */
function addProductItem(name) {
    const li = document.createElement('li');
    li.className = 'product-item';
    li.dataset.productName = name;

    li.innerHTML = `
        <span class="product-name">${escapeHTML(name)}</span>
        <div class="btn-group">
            <button type="button" class="btn btn-edit" data-action="edit">Edit</button>
            <button type="button" class="btn btn-delete" data-action="delete">Delete</button>
        </div>
    `;

    productList.appendChild(li);
}

/**
 * Handles product form submission
 * @param {Event} e 
 */
function handleAddProduct(e) {
    e.preventDefault();
    const name = productInput.value.trim();

    if (!name) {
        showError('Please enter a valid product name.');
        productInput.focus();
        return;
    }

    clearError();

    // If an item is currently being edited, save it before adding a new item
    if (activeEditItem) {
        saveInlineEdit(activeEditItem);
    }

    addProductItem(name);
    productInput.value = '';
    productInput.focus();
    updateListStats();
}

/**
 * Handles clicks inside the parent <ul> using Event Delegation
 * @param {Event} e 
 */
function handleListClick(e) {
    // Find the clicked button with data-action
    const button = e.target.closest('button[data-action]');
    if (!button) return;

    const action = button.dataset.action;
    const li = button.closest('.product-item');
    if (!li) return;

    if (action === 'delete') {
        // If the item being deleted is currently being edited, reset tracker
        if (activeEditItem === li) {
            activeEditItem = null;
        }
        li.remove();
        updateListStats();
    } else if (action === 'edit') {
        // If another item is being edited, save it first
        if (activeEditItem && activeEditItem !== li) {
            saveInlineEdit(activeEditItem);
        }
        enterEditMode(li);
    } else if (action === 'save') {
        saveInlineEdit(li);
    } else if (action === 'cancel') {
        cancelInlineEdit(li);
    }
}

/**
 * Converts a product item into inline editing mode
 * @param {HTMLLIElement} li 
 */
function enterEditMode(li) {
    const currentName = li.dataset.productName;
    activeEditItem = li;
    li.classList.add('editing');

    li.innerHTML = `
        <input type="text" class="edit-input" value="${escapeHTML(currentName)}" />
        <div class="btn-group">
            <button type="button" class="btn btn-save" data-action="save">Save</button>
            <button type="button" class="btn btn-cancel" data-action="cancel">Cancel</button>
        </div>
    `;

    const input = li.querySelector('.edit-input');
    input.focus();
    input.select();

    // Keyboard shortcuts inside the edit input
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveInlineEdit(li);
        } else if (e.key === 'Escape') {
            cancelInlineEdit(li);
        }
    });
}

/**
 * Saves the inline edit and restores standard display mode
 * @param {HTMLLIElement} li 
 */
function saveInlineEdit(li) {
    if (!li) return;
    const input = li.querySelector('.edit-input');
    if (!input) return;

    const newName = input.value.trim();
    // If user cleared the input, retain old name or validate
    const finalName = newName.length > 0 ? newName : li.dataset.productName;

    li.dataset.productName = finalName;
    renderStandardItem(li, finalName);

    if (activeEditItem === li) {
        activeEditItem = null;
    }
}

/**
 * Cancels the inline edit and restores previous name
 * @param {HTMLLIElement} li 
 */
function cancelInlineEdit(li) {
    if (!li) return;
    renderStandardItem(li, li.dataset.productName);

    if (activeEditItem === li) {
        activeEditItem = null;
    }
}

/**
 * Restores <li> HTML back to regular display mode
 * @param {HTMLLIElement} li 
 * @param {string} name 
 */
function renderStandardItem(li, name) {
    li.classList.remove('editing');
    li.innerHTML = `
        <span class="product-name">${escapeHTML(name)}</span>
        <div class="btn-group">
            <button type="button" class="btn btn-edit" data-action="edit">Edit</button>
            <button type="button" class="btn btn-delete" data-action="delete">Delete</button>
        </div>
    `;
}

/**
 * Automatically saves edits when clicking outside the currently edited item
 * @param {MouseEvent} e 
 */
function handleOutsideClick(e) {
    // If no item is currently being edited, do nothing
    if (!activeEditItem) return;

    // Check if the click occurred outside the active editing item
    if (!activeEditItem.contains(e.target)) {
        saveInlineEdit(activeEditItem);
    }
}

/**
 * Updates product count badge and toggles empty state message
 */
function updateListStats() {
    const total = productList.children.length;
    productCount.textContent = `${total} ${total === 1 ? 'product' : 'products'}`;

    if (total === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
}

/**
 * Utility: Shows error text
 * @param {string} msg 
 */
function showError(msg) {
    errorMessage.textContent = msg;
}

/**
 * Utility: Clears error text
 */
function clearError() {
    errorMessage.textContent = '';
}

/**
 * Utility: Escapes HTML to prevent XSS injection
 * @param {string} str 
 * @returns {string}
 */
function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Start application
init();
