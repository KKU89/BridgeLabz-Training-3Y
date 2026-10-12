let purchaseAmount = 12500;
let discountRate = 0;

if (purchaseAmount >= 10000) {
    discountRate = 0.25;
} else if (purchaseAmount >= 5000) {
    discountRate = 0.15;
} else if (purchaseAmount >= 2000) {
    discountRate = 0.05;
} else {
    discountRate = 0;
}

let discountAmount = purchaseAmount * discountRate;
let finalPrice = Math.round(purchaseAmount - discountAmount);

console.log(`Original Total: ₹${purchaseAmount}`);
console.log(`Discount Percentage: ${discountRate * 100}%`);
console.log(`Final Price after discount: ₹${finalPrice}`);
