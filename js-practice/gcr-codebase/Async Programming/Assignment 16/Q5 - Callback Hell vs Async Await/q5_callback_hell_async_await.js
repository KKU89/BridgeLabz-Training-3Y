function validateUserCallback(userId, callback) {
    setTimeout(() => {
        if (userId === "user123") {
            callback(null, { id: "user123", name: "Krishnakant", email: "krishnakant@example.com" });
        } else {
            callback(new Error("Invalid user credentials"), null);
        }
    }, 500);
}

function checkProductCallback(productId, callback) {
    setTimeout(() => {
        if (productId === "prod456") {
            callback(null, { id: "prod456", name: "Wireless Headphones", price: 2499, stock: 15 });
        } else {
            callback(new Error("Product not found"), null);
        }
    }, 600);
}

function processPaymentCallback(userId, amount, callback) {
    setTimeout(() => {
        if (amount > 0) {
            callback(null, { transactionId: "TXN" + Date.now(), amount, status: "success" });
        } else {
            callback(new Error("Invalid payment amount"), null);
        }
    }, 800);
}

function updateInventoryCallback(productId, callback) {
    setTimeout(() => {
        callback(null, { productId, remainingStock: 14, updated: true });
    }, 400);
}

function sendConfirmationCallback(email, orderId, callback) {
    setTimeout(() => {
        callback(null, { email, orderId, message: "Confirmation email sent!" });
    }, 300);
}

function processOrderWithCallbacks() {
    return new Promise((resolve) => {
        console.log("===== CALLBACK HELL (Pyramid of Doom) =====\n");
        console.log("Processing order...\n");

        validateUserCallback("user123", (err, user) => {
            if (err) { console.error("❌", err.message); resolve(); return; }
            console.log(`✅ Step 1: User validated - ${user.name}`);

            checkProductCallback("prod456", (err, product) => {
                if (err) { console.error("❌", err.message); resolve(); return; }
                console.log(`✅ Step 2: Product found - ${product.name} (₹${product.price})`);

                processPaymentCallback(user.id, product.price, (err, payment) => {
                    if (err) { console.error("❌", err.message); resolve(); return; }
                    console.log(`✅ Step 3: Payment processed - ${payment.transactionId}`);

                    updateInventoryCallback(product.id, (err, inventory) => {
                        if (err) { console.error("❌", err.message); resolve(); return; }
                        console.log(`✅ Step 4: Inventory updated - ${inventory.remainingStock} left`);

                        sendConfirmationCallback(user.email, payment.transactionId, (err, confirmation) => {
                            if (err) { console.error("❌", err.message); resolve(); return; }
                            console.log(`✅ Step 5: ${confirmation.message}`);
                            console.log("\n🎉 Order complete! (But look at this deeply nested code...)\n");
                            resolve();
                        });
                    });
                });
            });
        });
    });
}

function validateUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId === "user123") {
                resolve({ id: "user123", name: "Krishnakant", email: "krishnakant@example.com" });
            } else {
                reject(new Error("Invalid user credentials"));
            }
        }, 500);
    });
}

function checkProduct(productId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (productId === "prod456") {
                resolve({ id: "prod456", name: "Wireless Headphones", price: 2499, stock: 15 });
            } else {
                reject(new Error("Product not found"));
            }
        }, 600);
    });
}

function processPayment(userId, amount) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (amount > 0) {
                resolve({ transactionId: "TXN" + Date.now(), amount, status: "success" });
            } else {
                reject(new Error("Invalid payment amount"));
            }
        }, 800);
    });
}

function updateInventory(productId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ productId, remainingStock: 14, updated: true });
        }, 400);
    });
}

function sendConfirmation(email, orderId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ email, orderId, message: "Confirmation email sent!" });
        }, 300);
    });
}

async function processOrderWithAsyncAwait() {
    console.log("===== ASYNC/AWAIT (Clean & Readable) =====\n");
    console.log("Processing order...\n");

    try {

        const user = await validateUser("user123");
        console.log(`✅ Step 1: User validated - ${user.name}`);

        const product = await checkProduct("prod456");
        console.log(`✅ Step 2: Product found - ${product.name} (₹${product.price})`);

        const payment = await processPayment(user.id, product.price);
        console.log(`✅ Step 3: Payment processed - ${payment.transactionId}`);

        const inventory = await updateInventory(product.id);
        console.log(`✅ Step 4: Inventory updated - ${inventory.remainingStock} left`);

        const confirmation = await sendConfirmation(user.email, payment.transactionId);
        console.log(`✅ Step 5: ${confirmation.message}`);

        console.log("\n🎉 Order complete! (Clean, flat, readable code!)\n");
    } catch (error) {

        console.error(`\n❌ Order failed: ${error.message}\n`);
    }
}

async function demoErrorHandling() {
    console.log("===== ERROR HANDLING WITH ASYNC/AWAIT =====\n");

    try {

        const user = await validateUser("wrongUser");
        console.log("This line will never run");
    } catch (error) {
        console.error(`❌ Caught error gracefully: ${error.message}`);
        console.log("✅ The program continues running after the error!\n");
    }
}

async function main() {
    const startTime = Date.now();

    await processOrderWithCallbacks();
    await processOrderWithAsyncAwait();
    await demoErrorHandling();

    const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`⏱️  Total execution time: ${totalTime}s`);
}

main();
