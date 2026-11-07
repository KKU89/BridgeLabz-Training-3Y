/**
 * Q6 - Real Time Table Filter
 * Concepts demonstrated:
 * 1. Listening to real-time 'input' events for immediate feedback
 * 2. Case-insensitive string matching using toLowerCase() and String.includes()
 * 3. DOM row visibility toggling (display: table-row vs display: none)
 * 4. Handling zero-match empty state dynamically
 */

// DOM Elements
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const tableBody = document.getElementById('tableBody');
const noResults = document.getElementById('noResults');
const matchStats = document.getElementById('matchStats');
const tableContainer = document.querySelector('.table-responsive');

// Extract all table rows
const rows = Array.from(tableBody.querySelectorAll('tr'));
const totalRows = rows.length;

/**
 * Initialize event listeners
 */
function initTableFilter() {
    // Real-time filtering on keystroke, paste, cut
    searchInput.addEventListener('input', handleFilter);

    // Clear search button
    clearBtn.addEventListener('click', handleClear);

    // Initial stats
    updateStats(totalRows);
}

/**
 * Filters table rows based on user input
 */
function handleFilter() {
    // Convert search input to lowercase and trim whitespace for case-insensitive matching
    const query = searchInput.value.trim().toLowerCase();

    // Toggle clear button
    if (query.length > 0) {
        clearBtn.classList.add('visible');
    } else {
        clearBtn.classList.remove('visible');
    }

    let matchCount = 0;

    rows.forEach(row => {
        // Retrieve cell contents
        const nameText = row.querySelector('.name-cell').textContent.toLowerCase();
        const branchText = row.querySelector('.badge').textContent.toLowerCase();
        const cgpaText = row.querySelector('.cgpa-cell').textContent.toLowerCase();

        // Check if query matches Name, Branch, or CGPA (case-insensitive)
        const isMatch = nameText.includes(query) || 
                        branchText.includes(query) || 
                        cgpaText.includes(query);

        if (isMatch) {
            row.style.display = ''; // Restore row display
            matchCount++;
        } else {
            row.style.display = 'none'; // Hide row
        }
    });

    // Handle zero matching results
    if (matchCount === 0) {
        tableContainer.style.display = 'none';
        noResults.classList.remove('hidden');
    } else {
        tableContainer.style.display = '';
        noResults.classList.add('hidden');
    }

    updateStats(matchCount);
}

/**
 * Clears the search input and restores all rows
 */
function handleClear() {
    searchInput.value = '';
    handleFilter();
    searchInput.focus();
}

/**
 * Updates the matching results counter text
 * @param {number} count 
 */
function updateStats(count) {
    matchStats.textContent = `Showing ${count} of ${totalRows} students`;
}

// Start filter
initTableFilter();
