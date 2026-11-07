/**
 * Question 2: Online Food Ordering System
 * 
 * Requirements:
 * - Create a menu array containing items and prices.
 * - Write calculateBill(orderItems).
 * - Use map() to get prices and reduce() to calculate total.
 * - Throw an error for invalid items.
 * - Handle errors using try-catch.
 */

// 1. Menu array containing food items and their respective prices
const menu = [
    { name: "Burger", price: 150 },
    { name: "Pizza", price: 350 },
    { name: "Pasta", price: 220 },
    { name: "French Fries", price: 90 },
    { name: "Cold Coffee", price: 120 },
    { name: "Garlic Bread", price: 110 }
];

/**
 * Calculates total bill for a given list of ordered item names.
 * 
 * Logic:
 * - map() is used to look up each item in the menu and extract its price.
 * - If an item is not present in the menu, it throws an Error.
 * - reduce() is used to sum all the extracted prices into a final bill amount.
 * 
 * @param {string[]} orderItems - Array of food item names ordered by the customer
 * @returns {number} The total bill amount
 */
function calculateBill(orderItems) {
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
        throw new Error("Order cannot be empty. Please select at least one item.");
    }

    // Step A: Use map() to find corresponding prices for each ordered item
    const prices = orderItems.map((orderedItemName) => {
        // Find matching item in menu (case-insensitive check)
        const menuItem = menu.find(
            (item) => item.name.toLowerCase() === orderedItemName.trim().toLowerCase()
        );

        // If item does not exist in the menu, throw an error
        if (!menuItem) {
            throw new Error(`Invalid item: "${orderedItemName}" is not available on the menu.`);
        }

        return menuItem.price;
    });

    // Step B: Use reduce() to calculate the total bill from the mapped prices
    const totalBill = prices.reduce((accumulator, currentPrice) => {
        return accumulator + currentPrice;
    }, 0);

    return totalBill;
}

/**
 * Helper function to place an order and handle potential errors with try-catch
 * @param {string} customerName 
 * @param {string[]} orderItems 
 */
function processOrder(customerName, orderItems) {
    console.log(`\nProcessing order for: ${customerName}`);
    console.log(`Items ordered: [${orderItems.join(", ")}]`);

    try {
        const total = calculateBill(orderItems);
        console.log(`Order Status: SUCCESS`);
        console.log(`Total Bill   : Rs. ${total}`);
    } catch (error) {
        // Handle error gracefully
        console.log(`Order Status: FAILED`);
        console.log(`Error Caught : ${error.message}`);
    }
}

// ==========================================
// Display Menu & Testing with Different Orders
// ==========================================

console.log("=== Online Food Ordering System ===");
console.log("\nAvailable Menu:");
menu.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name.padEnd(15)} - Rs. ${item.price}`);
});

// Test Case 1: Valid Order with multiple items
processOrder("Rahul Sharma", ["Pizza", "Cold Coffee", "French Fries"]);

// Test Case 2: Another Valid Order
processOrder("Sneha Patel", ["Burger", "Garlic Bread"]);

// Test Case 3: Invalid Order containing an item not on the menu (triggers error & catch)
processOrder("Amit Verma", ["Burger", "Sushi", "Cold Coffee"]);

// Test Case 4: Invalid Order with empty array
processOrder("Pooja Nair", []);
