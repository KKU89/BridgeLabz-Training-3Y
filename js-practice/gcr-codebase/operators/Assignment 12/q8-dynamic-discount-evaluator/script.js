const cart = [
    { item: "Laptop", category: "electronics", price: 45000 },
    { item: "Shoes", category: "fashion", price: 2500 },
    { item: "Book", category: "education", price: 600 }
];

let totalCartValue = cart.reduce((acc, product) => {
    let discount = 0;
    if (product.category === "electronics") discount = 0.10;
    else if (product.category === "fashion") discount = 0.05;
    return acc + (product.price * (1 - discount));
}, 0);

if (totalCartValue > 50000) {
    totalCartValue *= 0.95;
}

console.log("Final Cart Total after discounts: ?" + totalCartValue.toFixed(2));
