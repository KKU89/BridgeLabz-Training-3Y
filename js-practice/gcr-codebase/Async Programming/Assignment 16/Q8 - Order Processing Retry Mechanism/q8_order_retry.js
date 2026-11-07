function processPayment(order) {
    return new Promise((resolve, reject) => {
        const delayMs = 500 + Math.random() * 500;

        setTimeout(() => {

            if (Math.random() < 0.6) {
                const errors = [
                    "Payment gateway timeout",
                    "Insufficient funds",
                    "Network connection lost",
                    "Service temporarily unavailable",
                    "Transaction declined by bank",
                ];

                const randomError = errors[Math.floor(Math.random() * errors.length)];
                reject(new Error(randomError));
            } else {
                resolve({
                    orderId: order.id,
                    transactionId: "TXN" + Date.now(),
                    amount: order.amount,
                    status: "success",
                    processedAt: new Date().toISOString(),
                });
            }
        }, delayMs);
    });
}

function sendConfirmation(transactionId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.3) {
                reject(new Error("Email service unavailable"));
            } else {
                resolve({
                    transactionId,
                    emailSent: true,
                    message: "Order confirmation sent!",
                });
            }
        }, 300);
    });
}

async function retryOperation(asyncFn, maxRetries = 3, baseDelay = 1000) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {

            const result = await asyncFn();
            console.log(`     ✅ Succeeded on attempt ${attempt}/${maxRetries}`);
            return result;
        } catch (error) {
            lastError = error;
            console.log(`     ❌ Attempt ${attempt}/${maxRetries} failed: ${error.message}`);

            if (attempt < maxRetries) {

                const delay = baseDelay * Math.pow(2, attempt - 1);
                console.log(`     ⏳ Retrying in ${delay}ms...\n`);

                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }

    throw new Error(`Operation failed after ${maxRetries} attempts. Last error: ${lastError.message}`);
}

async function demoSingleOrderRetry() {
    console.log("===== DEMO 1: Single Order with Retry =====\n");

    const order = { id: "ORD001", item: "Laptop", amount: 59999 };
    console.log(`📦 Processing order: ${order.item} (₹${order.amount})\n`);

    const startTime = Date.now();

    try {

        console.log("  💳 Step 1: Processing payment...");
        const payment = await retryOperation(
            () => processPayment(order),
            5,
            500
        );
        console.log(`     Transaction: ${payment.transactionId}\n`);

        console.log("  📧 Step 2: Sending confirmation...");
        const confirmation = await retryOperation(
            () => sendConfirmation(payment.transactionId),
            3,
            300
        );
        console.log(`     ${confirmation.message}\n`);

        const elapsed = Date.now() - startTime;
        console.log(`🎉 Order ${order.id} completed successfully in ${elapsed}ms!\n`);
    } catch (error) {
        const elapsed = Date.now() - startTime;
        console.error(`\n💥 Order ${order.id} FAILED after ${elapsed}ms: ${error.message}\n`);
    }
}

async function demoBatchOrders() {
    console.log("\n===== DEMO 2: Batch Order Processing =====\n");

    const orders = [
        { id: "ORD101", item: "Phone", amount: 29999 },
        { id: "ORD102", item: "Tablet", amount: 19999 },
        { id: "ORD103", item: "Watch", amount: 9999 },
        { id: "ORD104", item: "Earbuds", amount: 4999 },
    ];

    const results = [];
    const startTime = Date.now();

    for (const order of orders) {
        console.log(`\n📦 Processing ${order.id}: ${order.item} (₹${order.amount})`);
        console.log("-".repeat(50));

        try {
            console.log("  💳 Payment...");
            const payment = await retryOperation(
                () => processPayment(order),
                3,
                500
            );

            results.push({
                orderId: order.id,
                item: order.item,
                status: "✅ Success",
                transactionId: payment.transactionId,
            });
        } catch (error) {
            results.push({
                orderId: order.id,
                item: order.item,
                status: "❌ Failed",
                error: error.message,
            });
        }
    }

    const elapsed = Date.now() - startTime;
    const successful = results.filter((r) => r.status.includes("Success")).length;
    const failed = results.filter((r) => r.status.includes("Failed")).length;

    console.log("\n" + "=".repeat(60));
    console.log("📊 BATCH ORDER SUMMARY");
    console.log("=".repeat(60));

    results.forEach((r) => {
        console.log(`  ${r.status} ${r.orderId}: ${r.item}`);
        if (r.transactionId) console.log(`          Transaction: ${r.transactionId}`);
        if (r.error) console.log(`          Error: ${r.error}`);
    });

    console.log("\n" + "-".repeat(60));
    console.log(`  Total Orders: ${results.length}`);
    console.log(`  Successful: ${successful}`);
    console.log(`  Failed: ${failed}`);
    console.log(`  Success Rate: ${((successful / results.length) * 100).toFixed(0)}%`);
    console.log(`  Total Time: ${elapsed}ms`);
    console.log("=".repeat(60));
}

async function retryWithCondition(asyncFn, maxRetries, retryableErrors) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await asyncFn();
        } catch (error) {
            lastError = error;

            const isRetryable = retryableErrors.some((msg) =>
                error.message.includes(msg)
            );

            if (!isRetryable) {
                console.log(`     🚫 Non-retryable error: "${error.message}" — stopping immediately.`);
                throw error;
            }

            console.log(`     ⚠️  Retryable error on attempt ${attempt}: "${error.message}"`);

            if (attempt < maxRetries) {
                const delay = 500 * attempt;
                console.log(`     ⏳ Waiting ${delay}ms before retry...\n`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }

    throw new Error(`All ${maxRetries} retries exhausted. Last: ${lastError.message}`);
}

async function demoConditionalRetry() {
    console.log("\n\n===== DEMO 3: Conditional Retry =====\n");

    const order = { id: "ORD999", item: "Camera", amount: 45999 };

    const retryableErrors = [
        "timeout",
        "Network connection lost",
        "Service temporarily unavailable",
    ];

    console.log(`📦 Processing ${order.id} with conditional retry...\n`);

    try {
        const result = await retryWithCondition(
            () => processPayment(order),
            4,
            retryableErrors
        );
        console.log(`\n  ✅ Payment succeeded: ${result.transactionId}`);
    } catch (error) {
        console.log(`\n  ❌ Payment failed: ${error.message}`);
    }
}

async function main() {
    await demoSingleOrderRetry();
    await demoBatchOrders();
    await demoConditionalRetry();
}

main();
