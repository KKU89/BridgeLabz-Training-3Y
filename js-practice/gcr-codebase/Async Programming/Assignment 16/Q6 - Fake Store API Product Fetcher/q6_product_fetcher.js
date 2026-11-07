const API_BASE_URL = "https://fakestoreapi.com";

async function fetchAllProducts() {
    console.log("📡 Fetching all products...\n");
    const startTime = Date.now();

    try {
        const response = await fetch(`${API_BASE_URL}/products`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const products = await response.json();
        const elapsed = Date.now() - startTime;

        console.log(`✅ Fetched ${products.length} products in ${elapsed}ms\n`);
        return products;
    } catch (error) {
        console.error(`❌ Failed to fetch products: ${error.message}`);
        throw error;
    }
}

async function fetchProductById(productId) {
    console.log(`📡 Fetching product #${productId}...`);

    try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const product = await response.json();
        console.log(`✅ Found: "${product.title}" - $${product.price}`);
        return product;
    } catch (error) {
        console.error(`❌ Failed to fetch product #${productId}: ${error.message}`);
        throw error;
    }
}

async function fetchCategories() {
    console.log("📡 Fetching categories...");

    try {
        const response = await fetch(`${API_BASE_URL}/products/categories`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const categories = await response.json();
        console.log(`✅ Found ${categories.length} categories: ${categories.join(", ")}\n`);
        return categories;
    } catch (error) {
        console.error(`❌ Failed to fetch categories: ${error.message}`);
        throw error;
    }
}

async function fetchProductsByCategory(category) {
    console.log(`📡 Fetching products in "${category}"...`);

    try {
        const response = await fetch(`${API_BASE_URL}/products/category/${category}`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const products = await response.json();
        console.log(`✅ Found ${products.length} products in "${category}"\n`);
        return products;
    } catch (error) {
        console.error(`❌ Failed to fetch category "${category}": ${error.message}`);
        throw error;
    }
}

function displayProducts(products, title = "Products") {
    console.log(`\n📋 ${title}`);
    console.log("-".repeat(80));

    products.forEach((product, index) => {
        const truncatedTitle = product.title.length > 40
            ? product.title.substring(0, 37) + "..."
            : product.title;

        console.log(
            `  ${index + 1}. [${product.category}] ${truncatedTitle} - $${product.price}`
        );
    });
    console.log("-".repeat(80));
}

function calculatePriceStats(products) {
    const prices = products.map((p) => p.price);
    const total = prices.reduce((sum, price) => sum + price, 0);

    return {
        count: products.length,
        cheapest: Math.min(...prices),
        mostExpensive: Math.max(...prices),
        average: (total / prices.length).toFixed(2),
        total: total.toFixed(2),
    };
}

function demoPromiseChaining() {
    console.log("===== DEMO 1: Promise Chaining =====\n");

    return fetch(`${API_BASE_URL}/products?limit=5`)
        .then((response) => {
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            return response.json();
        })
        .then((products) => {
            console.log("Fetched 5 products using Promise chaining:");
            products.forEach((p) => console.log(`  - ${p.title} ($${p.price})`));
            return products;
        })
        .then((products) => {
            const stats = calculatePriceStats(products);
            console.log(`\n📊 Stats: Avg $${stats.average} | Cheapest $${stats.cheapest} | Most Expensive $${stats.mostExpensive}\n`);
        })
        .catch((error) => {
            console.error("❌ Promise chain error:", error.message);
        });
}

async function demoAsyncAwait() {
    console.log("===== DEMO 2: Async/Await =====\n");

    try {

        const categories = await fetchCategories();

        const categoryProducts = await fetchProductsByCategory(categories[0]);
        displayProducts(categoryProducts, `Products in "${categories[0]}"`);

        const stats = calculatePriceStats(categoryProducts);
        console.log(`\n📊 Price Statistics for "${categories[0]}":`);
        console.log(`   Count: ${stats.count}`);
        console.log(`   Cheapest: $${stats.cheapest}`);
        console.log(`   Most Expensive: $${stats.mostExpensive}`);
        console.log(`   Average: $${stats.average}`);
        console.log(`   Total: $${stats.total}\n`);
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

async function demoParallelFetching() {
    console.log("===== DEMO 3: Parallel Fetching with Promise.all() =====\n");

    try {
        const startTime = Date.now();

        const [product1, product2, product3] = await Promise.all([
            fetchProductById(1),
            fetchProductById(2),
            fetchProductById(3),
        ]);

        const elapsed = Date.now() - startTime;

        console.log(`\n⚡ Fetched 3 products in parallel in ${elapsed}ms`);
        console.log(`  1. ${product1.title} - $${product1.price}`);
        console.log(`  2. ${product2.title} - $${product2.price}`);
        console.log(`  3. ${product3.title} - $${product3.price}\n`);
    } catch (error) {
        console.error("❌ Parallel fetch error:", error.message);
    }
}

async function main() {
    const overallStart = Date.now();

    try {
        await demoPromiseChaining();
        await demoAsyncAwait();
        await demoParallelFetching();
    } catch (error) {
        console.error("❌ Fatal error:", error.message);
    }

    const overallTime = ((Date.now() - overallStart) / 1000).toFixed(2);
    console.log(`⏱️  Total execution time: ${overallTime}s`);
}

main();
