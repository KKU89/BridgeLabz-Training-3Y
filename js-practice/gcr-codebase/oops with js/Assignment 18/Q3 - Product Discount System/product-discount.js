/**
 * Question 3: Product Discount System
 * 
 * Requirements:
 * - Create a Product constructor function with name and price.
 * - Add applyDiscount(percent) to Product.prototype.
 * - Create 3 products and apply different discounts.
 * - Demonstrate abstraction through a simple operation.
 */

/**
 * 1. Product Constructor Function
 * Represents a product with a name and base price.
 * 
 * @param {string} name - Name of the product
 * @param {number} price - Original price of the product
 */
function Product(name, price) {
    this.name = name;
    this.price = price;
}

/**
 * 2. Adding applyDiscount to Product.prototype
 * 
 * What is Abstraction here?
 * Abstraction is an Object-Oriented Programming (OOP) principle where complex internal 
 * implementation details (percentage validation, discount math, rounding, and state update)
 * are hidden inside the method. The consumer of the object interacts with a simple, high-level
 * interface `product.applyDiscount(percent)` without needing to manually calculate prices
 * or understand the underlying formula.
 * 
 * @param {number} percent - Discount percentage (e.g., 10 for 10%)
 * @returns {number} The final price after discount
 */
Product.prototype.applyDiscount = function (percent) {
    // Validate discount percentage
    if (typeof percent !== "number" || percent < 0 || percent > 100) {
        throw new Error("Discount percentage must be a number between 0 and 100.");
    }

    // Abstracted internal calculation:
    // User doesn't need to perform discount formula: discountAmount = price * (percent / 100)
    const discountAmount = (this.price * percent) / 100;
    const discountedPrice = this.price - discountAmount;

    // Return the calculated final price (rounded to 2 decimals)
    return Number(discountedPrice.toFixed(2));
};

/**
 * Helper method on prototype to display product information cleanly.
 * This further provides abstraction by presenting formatted output.
 */
Product.prototype.displayDetails = function (discountPercent = 0) {
    const finalPrice = discountPercent > 0 
        ? this.applyDiscount(discountPercent) 
        : this.price;

    console.log(`-----------------------------------------`);
    console.log(`Product Name     : ${this.name}`);
    console.log(`Original Price   : Rs. ${this.price}`);
    if (discountPercent > 0) {
        console.log(`Discount Applied : ${discountPercent}%`);
        console.log(`Final Price      : Rs. ${finalPrice}`);
        console.log(`You Saved        : Rs. ${(this.price - finalPrice).toFixed(2)}`);
    } else {
        console.log(`Final Price      : Rs. ${finalPrice} (No discount applied)`);
    }
};

// ==========================================
// Creating 3 Products & Applying Discounts
// ==========================================

console.log("=== Product Discount System (Demonstrating Abstraction) ===\n");

// Creating 3 instances of Product using the constructor function
const product1 = new Product("Gaming Laptop", 75000);
const product2 = new Product("Wireless Headphones", 4500);
const product3 = new Product("Mechanical Keyboard", 3200);

// Applying different discount percentages to each product
// Notice how clean and simple the client interaction is:
// The caller just supplies a percentage, abstracting all mathematical details.
console.log("Applying discounts to products:");

product1.displayDetails(15); // 15% discount on Laptop
product2.displayDetails(20); // 20% discount on Headphones
product3.displayDetails(10); // 10% discount on Keyboard

console.log(`-----------------------------------------`);
