console.log("===== EXPERIMENT 1: Basic Ordering =====\n");

console.log("1. 🔵 Synchronous: Start");

setTimeout(() => {
    console.log("5. 🔴 Macrotask: setTimeout callback");
}, 0);

Promise.resolve().then(() => {
    console.log("3. 🟢 Microtask: Promise.then callback");
});

queueMicrotask(() => {
    console.log("4. 🟢 Microtask: queueMicrotask callback");
});

console.log("2. 🔵 Synchronous: End");

setTimeout(() => {
    console.log("\n===== EXPERIMENT 2: Nested Tasks =====\n");

    console.log("1. 🔴 Macrotask: Outer setTimeout");

    Promise.resolve().then(() => {
        console.log("2. 🟢 Microtask: Promise inside setTimeout");

        queueMicrotask(() => {
            console.log("3. 🟢 Microtask: Nested queueMicrotask");
        });
    });

    setTimeout(() => {
        console.log("5. 🔴 Macrotask: Nested setTimeout");
    }, 0);

    console.log("4. 🔵 Synchronous: Inside outer setTimeout");

}, 100);

setTimeout(() => {
    console.log("\n===== EXPERIMENT 3: Microtask Priority =====\n");

    setTimeout(() => {
        console.log("4. 🔴 Macrotask: This runs AFTER all microtasks finish");
    }, 0);

    Promise.resolve().then(() => {
        console.log("1. 🟢 Microtask 1");
    });

    Promise.resolve().then(() => {
        console.log("2. 🟢 Microtask 2");
    });

    Promise.resolve().then(() => {
        console.log("3. 🟢 Microtask 3");

        queueMicrotask(() => {
            console.log("3.5 🟢 Microtask 3.5 (added during microtask phase)");
        });
    });

}, 300);

setTimeout(() => {
    console.log("\n===== EXPERIMENT 4: Timing Comparison =====\n");

    const startTime = Date.now();

    setTimeout(() => {
        const macroTime = Date.now() - startTime;
        console.log(`🔴 Macrotask (setTimeout 0ms) actually took: ${macroTime}ms`);
    }, 0);

    Promise.resolve().then(() => {
        const microTime = Date.now() - startTime;
        console.log(`🟢 Microtask (Promise.then) actually took: ${microTime}ms`);
    });

}, 500);
