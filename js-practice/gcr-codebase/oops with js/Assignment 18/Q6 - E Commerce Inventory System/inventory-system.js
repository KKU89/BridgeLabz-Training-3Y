/**
 * Question 6: E-Commerce Inventory System
 * 
 * Requirements:
 * - Create multiple product objects with id, name, category, price, and stock.
 * - Implement:
 *   1. getLowStockProducts() using filter()
 *   2. sortProductsByPrice() using sort()
 *   3. calculateTotalInventoryValue() using reduce()
 *   4. groupByCategory() using reduce() and object grouping
 * - Test with multiple categories.
 */

// 1. Array of product objects with multiple categories
const inventory = [
    { id: 101, name: "Wireless Mouse", category: "Electronics", price: 650, stock: 15 },
    { id: 102, name: "Mechanical Keyboard", category: "Electronics", price: 2800, stock: 3 },
    { id: 103, name: "Noise Cancelling Headphones", category: "Electronics", price: 7999, stock: 2 },
    { id: 104, name: "Denim Jacket", category: "Clothing", price: 2199, stock: 12 },
    { id: 105, name: "Cotton T-Shirt", category: "Clothing", price: 499, stock: 25 },
    { id: 106, name: "Running Shoes", category: "Footwear", price: 3499, stock: 4 },
    { id: 107, name: "Casual Sneakers", category: "Footwear", price: 1899, stock: 8 },
    { id: 108, name: "Clean Code Book", category: "Books", price: 850, stock: 10 },
    { id: 109, name: "JavaScript: The Good Parts", category: "Books", price: 550, stock: 1 }
];

/**
 * 1. Filter products that have stock less than a given threshold (default = 5)
 * Uses Array.prototype.filter()
 * 
 * @param {Array} products 
 * @param {number} threshold 
 * @returns {Array} List of low stock products
 */
function getLowStockProducts(products, threshold = 5) {
    return products.filter((product) => product.stock < threshold);
}

/**
 * 2. Sort products by price in ascending or descending order
 * Uses Array.prototype.sort() on a cloned copy to avoid mutating the original array
 * 
 * @param {Array} products 
 * @param {"asc" | "desc"} order 
 * @returns {Array} Sorted list of products
 */
function sortProductsByPrice(products, order = "asc") {
    // Creating a shallow copy with spread operator [...] to keep original inventory intact
    return [...products].sort((a, b) => {
        return order === "asc" ? a.price - b.price : b.price - a.price;
    });
}

/**
 * 3. Calculate total inventory valuation: sum of (price * stock) across all products
 * Uses Array.prototype.reduce()
 * 
 * @param {Array} products 
 * @returns {number} Total monetary value of inventory
 */
function calculateTotalInventoryValue(products) {
    return products.reduce((accumulator, product) => {
        const itemTotal = product.price * product.stock;
        return accumulator + itemTotal;
    }, 0);
}

/**
 * 4. Group products by their category
 * Uses Array.prototype.reduce() to accumulate products into an object keyed by category
 * 
 * @param {Array} products 
 * @returns {Object} Object with category names as keys and arrays of products as values
 */
function groupByCategory(products) {
    return products.reduce((grouped, product) => {
        const categoryKey = product.category;

        // If category key doesn't exist yet, initialize it as an empty array
        if (!grouped[categoryKey]) {
            grouped[categoryKey] = [];
        }

        // Push current product into its category array
        grouped[categoryKey].push(product);

        return grouped;
    }, {});
}

// ==========================================
// Executing and Displaying Operations
// ==========================================

console.log("=== E-Commerce Inventory System ===\n");

// Display All Products
console.log("All Products in Inventory:");
console.table(inventory);

// 1. Low Stock Products (< 5 units)
console.log("\n-----------------------------------------------------------");
console.log("1. Low Stock Products (Stock < 5 units) [Using filter()]:");
const lowStock = getLowStockProducts(inventory, 5);
console.table(lowStock);

// 2. Products Sorted by Price (Ascending)
console.log("\n-----------------------------------------------------------");
console.log("2. Products Sorted by Price (Lowest to Highest) [Using sort()]:");
const sortedByPrice = sortProductsByPrice(inventory, "asc");
sortedByPrice.forEach((prod) => {
    console.log(`- ${prod.name.padEnd(28)} | Rs. ${prod.price.toString().padStart(5)} | Stock: ${prod.stock}`);
});

// 3. Total Inventory Value
console.log("\n-----------------------------------------------------------");
console.log("3. Total Inventory Valuation [Using reduce()]:");
const totalValue = calculateTotalInventoryValue(inventory);
console.log(`Total Monetary Value of all Stock: Rs. ${totalValue.toLocaleString("en-IN")}`);

// 4. Products Grouped by Category
console.log("\n-----------------------------------------------------------");
console.log("4. Products Grouped by Category [Using reduce()]:");
const groupedProducts = groupByCategory(inventory);

for (const [category, items] of Object.entries(groupedProducts)) {
    console.log(`\nCategory: [${category}] (${items.length} items)`);
    items.forEach((item) => {
        console.log(`   * ${item.name} - Price: Rs. ${item.price}, Stock: ${item.stock}`);
    });
}
