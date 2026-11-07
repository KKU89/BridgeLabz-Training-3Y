function fetchUserData(userName, delayMs) {
    return new Promise((resolve) => {
        console.log(`  📡 Fetching data for "${userName}" (will take ${delayMs}ms)...`);
        setTimeout(() => {
            resolve({ name: userName, email: `${userName.toLowerCase()}@example.com`, delayMs });
        }, delayMs);
    });
}

function createTimeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`⏰ Operation timed out after ${ms}ms`));
        }, ms);
    });
}

function withTimeout(asyncTask, timeoutMs) {
    return Promise.race([asyncTask, createTimeout(timeoutMs)]);
}

async function demoTimeoutRace() {
    console.log("===== DEMO 1: Promise.race() - Timeout Race =====\n");

    console.log("--- Scenario 1: Fast task (500ms) vs Timeout (2000ms) ---");
    try {
        const startTime = Date.now();
        const result = await withTimeout(fetchUserData("Alice", 500), 2000);
        const elapsed = Date.now() - startTime;
        console.log(`  ✅ Success in ${elapsed}ms:`, result);
    } catch (error) {
        console.error(`  ❌ ${error.message}`);
    }

    console.log();

    console.log("--- Scenario 2: Slow task (5000ms) vs Timeout (1500ms) ---");
    try {
        const startTime = Date.now();
        const result = await withTimeout(fetchUserData("Bob", 5000), 1500);
        const elapsed = Date.now() - startTime;
        console.log(`  ✅ Success in ${elapsed}ms:`, result);
    } catch (error) {
        const elapsed = Date.now() - startTime;
        console.error(`  ❌ ${error.message}`);
    }
}

let startTime;

async function demoFastestServer() {
    console.log("\n===== DEMO 2: Promise.race() - Fastest Server Wins =====\n");

    const servers = [
        fetchUserData("Server-US", 1200),
        fetchUserData("Server-EU", 800),
        fetchUserData("Server-Asia", 1500),
    ];

    try {
        const startTime = Date.now();
        const fastest = await Promise.race(servers);
        const elapsed = Date.now() - startTime;
        console.log(`\n  🏆 Fastest response in ${elapsed}ms:`, fastest);
    } catch (error) {
        console.error("  ❌ All servers failed:", error.message);
    }
}

async function demoPromiseAll() {
    console.log("\n===== DEMO 3: Promise.all() - Parallel Execution =====\n");

    const startTime = Date.now();

    try {

        const results = await Promise.all([
            fetchUserData("Alice", 1000),
            fetchUserData("Bob", 1500),
            fetchUserData("Charlie", 800),
        ]);

        const elapsed = Date.now() - startTime;

        console.log(`\n  ✅ All ${results.length} requests completed in ${elapsed}ms`);
        console.log("  📋 Results:");
        results.forEach((user) => {
            console.log(`     - ${user.name} (${user.email}) [took ${user.delayMs}ms]`);
        });

    } catch (error) {
        console.error("  ❌ One or more requests failed:", error.message);
    }
}

function unreliableTask(taskName, delayMs) {
    return new Promise((resolve, reject) => {
        console.log(`  🔄 Starting "${taskName}"...`);
        setTimeout(() => {

            if (Math.random() < 0.5) {
                reject(new Error(`"${taskName}" failed randomly!`));
            } else {
                resolve({ task: taskName, status: "success" });
            }
        }, delayMs);
    });
}

async function demoPromiseAllFailure() {
    console.log("\n===== DEMO 4: Promise.all() - Failure Behavior =====\n");

    try {
        const results = await Promise.all([
            unreliableTask("Database Query", 500),
            unreliableTask("Cache Update", 300),
            unreliableTask("Email Notification", 700),
        ]);
        console.log("\n  ✅ All tasks succeeded:", results);
    } catch (error) {
        console.error(`\n  ❌ Promise.all() rejected: ${error.message}`);
        console.log("  💡 Promise.all() fails fast - one failure cancels everything.");
    }
}

async function demoSequentialVsParallel() {
    console.log("\n===== DEMO 5: Sequential vs Parallel Timing =====\n");

    console.log("--- Sequential Execution ---");
    const seqStart = Date.now();
    await fetchUserData("User1", 500);
    await fetchUserData("User2", 500);
    await fetchUserData("User3", 500);
    const seqTime = Date.now() - seqStart;
    console.log(`  ⏱️  Sequential total: ${seqTime}ms\n`);

    console.log("--- Parallel Execution (Promise.all) ---");
    const parStart = Date.now();
    await Promise.all([
        fetchUserData("User1", 500),
        fetchUserData("User2", 500),
        fetchUserData("User3", 500),
    ]);
    const parTime = Date.now() - parStart;
    console.log(`  ⏱️  Parallel total: ${parTime}ms\n`);

    console.log(`  📊 Parallel was ~${((seqTime / parTime)).toFixed(1)}x faster!`);
}

async function main() {
    await demoTimeoutRace();
    await demoFastestServer();
    await demoPromiseAll();
    await demoPromiseAllFailure();
    await demoSequentialVsParallel();
}

main();
