function fetchServiceData(serviceName, delayMs, failureChance = 0.3) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            if (Math.random() < failureChance) {
                reject(new Error(`${serviceName} is unavailable (503 Service Unavailable)`));
            } else {
                resolve({
                    service: serviceName,
                    status: "online",
                    responseTime: delayMs,
                    data: `Data from ${serviceName}`,
                    timestamp: new Date().toISOString(),
                });
            }
        }, delayMs);
    });
}

const services = [
    { name: "User Service", delay: 800, failureRate: 0.2 },
    { name: "Payment Gateway", delay: 1200, failureRate: 0.4 },
    { name: "Inventory Service", delay: 600, failureRate: 0.1 },
    { name: "Notification Service", delay: 1000, failureRate: 0.5 },
    { name: "Analytics Engine", delay: 1500, failureRate: 0.3 },
];

async function runDashboard() {
    console.log("===== DASHBOARD: Promise.allSettled() =====\n");
    console.log("Fetching data from all services simultaneously...\n");

    const startTime = Date.now();

    const servicePromises = services.map((svc) =>
        fetchServiceData(svc.name, svc.delay, svc.failureRate)
    );

    const results = await Promise.allSettled(servicePromises);

    const elapsed = Date.now() - startTime;

    console.log("📊 Dashboard Results:");
    console.log("=".repeat(60));

    let successCount = 0;
    let failureCount = 0;

    results.forEach((result, index) => {
        const serviceName = services[index].name;

        if (result.status === "fulfilled") {
            successCount++;
            console.log(`  ✅ ${serviceName}`);
            console.log(`     Status: ${result.value.status}`);
            console.log(`     Response Time: ${result.value.responseTime}ms`);
            console.log(`     Data: ${result.value.data}`);
        } else {
            failureCount++;
            console.log(`  ❌ ${serviceName}`);
            console.log(`     Error: ${result.reason.message}`);
        }
        console.log();
    });

    console.log("=".repeat(60));
    console.log(`\n📈 Summary:`);
    console.log(`   Total Services: ${results.length}`);
    console.log(`   ✅ Online: ${successCount}`);
    console.log(`   ❌ Failed: ${failureCount}`);
    console.log(`   ⏱️  Total Time: ${elapsed}ms`);
    console.log(`   Health: ${((successCount / results.length) * 100).toFixed(0)}%\n`);
}

async function compareAllVsAllSettled() {
    console.log("\n===== COMPARISON: Promise.all() vs Promise.allSettled() =====\n");

    const mixedPromises = [
        Promise.resolve("✅ Task A completed"),
        Promise.reject(new Error("❌ Task B failed")),
        Promise.resolve("✅ Task C completed"),
        Promise.reject(new Error("❌ Task D failed")),
        Promise.resolve("✅ Task E completed"),
    ];

    console.log("--- Promise.all() ---");
    try {
        const allResults = await Promise.all(mixedPromises.map((p) => p.catch((e) => e)));

        console.log("Promise.all() needs error wrapping to not fail fast.");
        console.log("Results:", allResults);
    } catch (error) {
        console.log(`Promise.all() fails fast: ${error.message}`);
        console.log("Remaining results are LOST!\n");
    }

    console.log("\n--- Promise.allSettled() ---");
    const settledResults = await Promise.allSettled([
        Promise.resolve("Task A completed"),
        Promise.reject(new Error("Task B failed")),
        Promise.resolve("Task C completed"),
        Promise.reject(new Error("Task D failed")),
        Promise.resolve("Task E completed"),
    ]);

    settledResults.forEach((result, i) => {
        if (result.status === "fulfilled") {
            console.log(`  Task ${i + 1}: ✅ ${result.value}`);
        } else {
            console.log(`  Task ${i + 1}: ❌ ${result.reason.message}`);
        }
    });

}

async function demoBatchProcessing() {
    console.log("\n\n===== DEMO 3: Batch Processing =====\n");

    const userIds = [101, 102, 103, 104, 105];

    const userPromises = userIds.map((id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < 0.3) {
                    reject(new Error(`User #${id} not found`));
                } else {
                    resolve({ id, name: `User_${id}`, active: true });
                }
            }, Math.random() * 1000);
        });
    });

    const results = await Promise.allSettled(userPromises);

    const successful = results
        .filter((r) => r.status === "fulfilled")
        .map((r) => r.value);

    const failed = results
        .filter((r) => r.status === "rejected")
        .map((r) => r.reason.message);

    console.log(`📋 Batch Results:`);
    console.log(`  ✅ Successfully fetched: ${successful.length} users`);
    successful.forEach((user) => console.log(`     - ${user.name} (ID: ${user.id})`));

    if (failed.length > 0) {
        console.log(`  ❌ Failed: ${failed.length} users`);
        failed.forEach((err) => console.log(`     - ${err}`));
    }
}

async function main() {
    await runDashboard();
    await compareAllVsAllSettled();
    await demoBatchProcessing();
}

main();
