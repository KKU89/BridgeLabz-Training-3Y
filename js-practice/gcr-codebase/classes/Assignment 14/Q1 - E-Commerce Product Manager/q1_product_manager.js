class Product {
  constructor(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }

  applyDiscount(discountPercent) {
    if (discountPercent < 0 || discountPercent > 100) {
      throw new RangeError("Discount must be between 0 and 100 percent.");
    }

    this.price = Number((this.price * (1 - discountPercent / 100)).toFixed(2));
    return this.price;
  }

  getDetails() {
    return `ID: ${this.id} | ${this.name} | Category: ${this.category} | Price: ₹${this.price.toFixed(2)}`;
  }
}

const products = [
  new Product(101, "Wireless Headphones", 2499, "Electronics"),
  new Product(102, "Notebook Set", 349, "Stationery"),
  new Product(103, "Desk Lamp", 1299, "Home"),
  new Product(104, "Travel Mug", 899, "Kitchen"),
];

products[0].applyDiscount(10);

console.log("Products priced above ₹1,000:");
products
  .filter((product) => product.price > 1000)
  .forEach((product) => console.log(product.getDetails()));
