function boilWater() {
    return new Promise((resolve) => {
        console.log("⏳ Boiling water...");
        setTimeout(() => {
            console.log("✅ Water is boiled!");
            resolve("Boiled Water");
        }, 2000);
    });
}

function grindBeans() {
    return new Promise((resolve) => {
        console.log("⏳ Grinding coffee beans...");
        setTimeout(() => {
            console.log("✅ Beans are ground!");
            resolve("Ground Coffee");
        }, 1500);
    });
}

function brewCoffee(water, coffee) {
    return new Promise((resolve) => {
        console.log(`⏳ Brewing coffee with ${water} and ${coffee}...`);
        setTimeout(() => {
            console.log("✅ Coffee is brewed!");
            resolve("Brewed Coffee");
        }, 2000);
    });
}

function pourCoffee(coffee) {
    return new Promise((resolve) => {
        console.log(`⏳ Pouring ${coffee} into cup...`);
        setTimeout(() => {
            console.log("✅ Coffee is poured into the cup!");
            resolve("☕ Your coffee is ready!");
        }, 500);
    });
}

function makeCoffeeWithChaining() {
    console.log("\n--- Making Coffee with Promise Chaining ---\n");

    let boiledWater;

    return boilWater()
        .then((water) => {
            boiledWater = water;
            return grindBeans();
        })
        .then((groundCoffee) => {
            return brewCoffee(boiledWater, groundCoffee);
        })
        .then((brewedCoffee) => {
            return pourCoffee(brewedCoffee);
        })
        .then((result) => {
            console.log(`\n🎉 ${result}\n`);
        })
        .catch((error) => {
            console.error("❌ Error making coffee:", error);
        });
}

async function makeCoffeeWithAsyncAwait() {
    console.log("\n--- Making Coffee with async/await ---\n");

    try {

        const [water, coffee] = await Promise.all([boilWater(), grindBeans()]);

        const brewedCoffee = await brewCoffee(water, coffee);

        const result = await pourCoffee(brewedCoffee);

        console.log(`\n🎉 ${result}\n`);
    } catch (error) {
        console.error("❌ Error making coffee:", error);
    }
}

async function main() {
    const startTime = Date.now();

    await makeCoffeeWithChaining();

    await makeCoffeeWithAsyncAwait();

    const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`⏱️  Total time for both approaches: ${totalTime}s`);
}

main();
