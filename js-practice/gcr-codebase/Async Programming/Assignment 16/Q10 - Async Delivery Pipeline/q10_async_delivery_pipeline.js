function processStage(stageName, delayMs, failureChance, orderData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            if (Math.random() < failureChance) {
                reject(new Error(`Stage "${stageName}" failed: Unexpected error occurred`));
            } else {
                const updatedOrder = {
                    ...orderData,
                    currentStage: stageName,
                    stageHistory: [
                        ...orderData.stageHistory,
                        {
                            stage: stageName,
                            timestamp: new Date().toISOString(),
                            duration: delayMs,
                        },
                    ],
                };
                resolve(updatedOrder);
            }
        }, delayMs);
    });
}

async function retryStage(stageFn, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await stageFn();
        } catch (error) {
            console.log(`      ⚠️  Attempt ${attempt}/${maxRetries} failed: ${error.message}`);

            if (attempt === maxRetries) {
                throw new Error(`Stage failed after ${maxRetries} retries: ${error.message}`);
            }

            const delay = 500 * Math.pow(2, attempt - 1);
            console.log(`      ⏳ Retrying in ${delay}ms...\n`);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
}

const pipelineStages = [
    { name: "📋 Order Placed", delay: 500, failureChance: 0.1 },
    { name: "💳 Payment Verified", delay: 800, failureChance: 0.2 },
    { name: "📦 Item Packed", delay: 1000, failureChance: 0.15 },
    { name: "🚚 Shipped", delay: 700, failureChance: 0.1 },
    { name: "🏃 Out for Delivery", delay: 1200, failureChance: 0.2 },
    { name: "✅ Delivered", delay: 400, failureChance: 0.05 },
];

async function processOrder(order) {
    console.log(`\n🛒 Starting delivery pipeline for Order #${order.id}`);
    console.log(`   Item: ${order.item} | Customer: ${order.customer}`);
    console.log("─".repeat(55));

    const startTime = Date.now();
    let currentOrder = { ...order, stageHistory: [] };

    for (const stage of pipelineStages) {
        console.log(`\n   ⏳ Processing: ${stage.name}...`);

        try {

            currentOrder = await retryStage(
                () => processStage(stage.name, stage.delay, stage.failureChance, currentOrder),
                3
            );
            console.log(`   ✅ Completed: ${stage.name}`);
        } catch (error) {
            const elapsed = Date.now() - startTime;
            console.log(`\n   ❌ Pipeline FAILED at ${stage.name}`);
            console.log(`   Error: ${error.message}`);
            console.log(`   Time elapsed: ${elapsed}ms`);

            return {
                ...currentOrder,
                status: "FAILED",
                failedAt: stage.name,
                totalTime: elapsed,
            };
        }
    }

    const totalTime = Date.now() - startTime;

    console.log("\n" + "─".repeat(55));
    console.log(`   🎉 Order #${order.id} delivered successfully!`);
    console.log(`   ⏱️  Total pipeline time: ${totalTime}ms`);

    return {
        ...currentOrder,
        status: "DELIVERED",
        totalTime,
    };
}

async function processMultipleOrders() {
    console.log("\n\n" + "═".repeat(60));
    console.log("   BATCH ORDER PROCESSING");
    console.log("═".repeat(60));

    const orders = [
        { id: "DEL001", item: "Laptop", customer: "Alice" },
        { id: "DEL002", item: "Headphones", customer: "Bob" },
        { id: "DEL003", item: "Keyboard", customer: "Charlie" },
    ];

    const startTime = Date.now();

    const results = await Promise.allSettled(
        orders.map((order) => processOrder(order))
    );

    const totalTime = Date.now() - startTime;

    console.log("\n\n" + "═".repeat(60));
    console.log("   📊 DELIVERY PIPELINE REPORT");
    console.log("═".repeat(60));

    let delivered = 0;
    let failed = 0;

    results.forEach((result, index) => {
        const order = orders[index];

        if (result.status === "fulfilled") {
            const data = result.value;

            if (data.status === "DELIVERED") {
                delivered++;
                console.log(`\n   ✅ Order #${order.id} (${order.item})`);
                console.log(`      Status: DELIVERED`);
                console.log(`      Time: ${data.totalTime}ms`);
                console.log(`      Stages completed: ${data.stageHistory.length}/${pipelineStages.length}`);
            } else {
                failed++;
                console.log(`\n   ❌ Order #${order.id} (${order.item})`);
                console.log(`      Status: FAILED at ${data.failedAt}`);
                console.log(`      Time: ${data.totalTime}ms`);
                console.log(`      Stages completed: ${data.stageHistory.length}/${pipelineStages.length}`);
            }
        } else {
            failed++;
            console.log(`\n   ❌ Order #${order.id} (${order.item})`);
            console.log(`      Status: FAILED`);
            console.log(`      Error: ${result.reason.message}`);
        }
    });

    console.log("\n" + "─".repeat(60));
    console.log(`   Total Orders:     ${orders.length}`);
    console.log(`   ✅ Delivered:     ${delivered}`);
    console.log(`   ❌ Failed:        ${failed}`);
    console.log(`   Success Rate:     ${((delivered / orders.length) * 100).toFixed(0)}%`);
    console.log(`   Total Time:       ${totalTime}ms`);
    console.log("═".repeat(60));
}

async function demoPipelineWithChaining() {
    console.log("\n\n" + "═".repeat(60));
    console.log("   PROMISE CHAINING PIPELINE");
    console.log("═".repeat(60));

    const order = { id: "CHAIN001", item: "Monitor", customer: "Diana", stageHistory: [] };

    console.log(`\n   Processing Order #${order.id} using Promise chaining...\n`);

    const startTime = Date.now();

    processStage("📋 Order Placed", 300, 0, order)
        .then((result) => {
            console.log("   ✅ Order Placed");
            return processStage("💳 Payment Verified", 400, 0, result);
        })
        .then((result) => {
            console.log("   ✅ Payment Verified");
            return processStage("📦 Item Packed", 500, 0, result);
        })
        .then((result) => {
            console.log("   ✅ Item Packed");
            return processStage("🚚 Shipped", 300, 0, result);
        })
        .then((result) => {
            console.log("   ✅ Shipped");
            return processStage("🏃 Out for Delivery", 600, 0, result);
        })
        .then((result) => {
            console.log("   ✅ Out for Delivery");
            return processStage("✅ Delivered", 200, 0, result);
        })
        .then((finalResult) => {
            const elapsed = Date.now() - startTime;
            console.log("   ✅ Delivered");
            console.log(`\n   🎉 Pipeline complete in ${elapsed}ms!`);
            console.log(`   Stages: ${finalResult.stageHistory.length}`);
        })
        .catch((error) => {
            console.error(`\n   ❌ Pipeline failed: ${error.message}`);
        });
}

async function main() {
    await processMultipleOrders();
    await demoPipelineWithChaining();
}

main();
