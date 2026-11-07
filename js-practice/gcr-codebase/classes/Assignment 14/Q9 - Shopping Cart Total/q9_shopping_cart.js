class Cart {
  constructor() {
    this.items = [];
  }

  addItem(name, price, quantity) {
    if (!name || price < 0 || quantity <= 0) {
      throw new RangeError("Provide an item name, a non-negative price, and a positive quantity.");
    }

    this.items.push({ name, price, quantity });
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  applyCoupon(couponCode) {
    const match = couponCode.trim().toUpperCase().match(/^(?:SAVE|DISC)(100|[1-9]\d?)$/);

    if (!match) {
      return { valid: false, message: "Invalid coupon. Use a code such as SAVE20 or DISC10." };
    }

    const discountPercent = Number(match[1]);
    const subtotal = this.getTotal();
    const discount = subtotal * (discountPercent / 100);

    return {
      valid: true,
      discountPercent,
      subtotal,
      discount,
      finalTotal: Number((subtotal - discount).toFixed(2)),
    };
  }
}

const cart = new Cart();
cart.addItem("Keyboard", 2499, 1);
cart.addItem("USB-C Cable", 499, 2);

console.log(`Cart subtotal: ₹${cart.getTotal().toFixed(2)}`);

const couponResult = cart.applyCoupon("SAVE20");
if (couponResult.valid) {
  console.log(`Coupon discount (${couponResult.discountPercent}%): ₹${couponResult.discount.toFixed(2)}`);
  console.log(`Final total: ₹${couponResult.finalTotal.toFixed(2)}`);
} else {
  console.log(couponResult.message);
}
