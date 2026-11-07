console.log("===== PUZZLE 1: Basic Event Loop =====\n");

console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => {
    console.log("C");
});

console.log("D");

setTimeout(() => {
    console.log("\n===== PUZZLE 2: Nested Promises & setTimeout =====\n");

    console.log("1");

    setTimeout(() => {
        console.log("2");
    }, 0);

    Promise.resolve().then(() => {
        console.log("3");

        Promise.resolve().then(() => {
            console.log("4");
        });
    });

    console.log("5");

}, 100);

setTimeout(() => {
    console.log("\n===== PUZZLE 3: Promise Chains =====\n");

    Promise.resolve().then(() => console.log("A-then-1"));
    Promise.resolve().then(() => console.log("B-then-1"));
    Promise.resolve().then(() => console.log("C-then-1"));

}, 200);

setTimeout(() => {
    console.log("\n===== PUZZLE 4: Complex Mix =====\n");

    console.log("Start");

    setTimeout(() => console.log("timeout-1"), 0);

    Promise.resolve()
        .then(() => {
            console.log("promise-1");
            setTimeout(() => {
                console.log("timeout-2");
            }, 0);
        })
        .then(() => {
            console.log("promise-2");
        });

    setTimeout(() => console.log("timeout-3"), 0);

    queueMicrotask(() => {
        console.log("microtask-1");
    });

    console.log("End");

}, 400);

setTimeout(() => {
    console.log("\n===== PUZZLE 5: async/await in the Event Loop =====\n");

    async function asyncFunction() {
        console.log("async-1");

        await Promise.resolve();

        console.log("async-2");
    }

    console.log("script-start");

    setTimeout(() => console.log("timeout"), 0);

    asyncFunction();

    Promise.resolve().then(() => {
        console.log("promise");
    });

    console.log("script-end");

}, 700);

setTimeout(() => {
    console.log("\n===== EVENT LOOP SUMMARY =====\n");

    console.log("📌 Execution Priority Order:");
    console.log("   1. 🔵 Synchronous code (call stack)");
    console.log("   2. 🟢 Microtasks (Promise.then, queueMicrotask, await continuation)");
    console.log("   3. 🔴 Macrotasks (setTimeout, setInterval, I/O)");
    console.log();
    console.log("📌 Key Rules:");
    console.log("   - Synchronous code ALWAYS runs first (current call stack)");
    console.log("   - ALL microtasks run before the NEXT macrotask");
    console.log("   - Microtasks added during microtask processing also run before macrotasks");
    console.log("   - setTimeout(fn, 0) does NOT mean 'run immediately'");
    console.log("   - `await` turns the rest of an async function into a microtask");
    console.log("   - Each macrotask gets its own microtask drain cycle");
}, 1100);
