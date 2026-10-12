let expenses = [4500, 2500, 8000, 1500, 2000];
let total = expenses[0] + expenses[1] + expenses[2] + expenses[3] + expenses[4];
let average = total / expenses.length;

let tax = total * 0.10;
let finalAmount = total + tax;

console.log(`Total Monthly Expense: ₹${total.toFixed(2)}`);
console.log(`Average Expense: ₹${average.toFixed(2)}`);
console.log(`Final Amount after 10% tax: ₹${finalAmount.toFixed(2)}`);
