/**
 * Question 9: Fitness App Analytics
 * 
 * Requirements:
 * - Use the given workout data:
 *   [
 *       { user: "A", steps: 8000, calories: 300 },
 *       { user: "B", steps: 12000, calories: 500 },
 *       { user: "C", steps: 4000, calories: 200 }
 *   ]
 * - Create a FitnessAnalytics class.
 * - Implement getActiveUsers() using filter() for steps greater than 7000.
 * - Implement getAverageCalories() using reduce().
 * - Implement getUserSummary() using map().
 * - Throw an error if the dataset is empty.
 * - Execute and display all methods.
 */

class FitnessAnalytics {
    /**
     * Initializes analytics with workout dataset
     * Validates that dataset is non-empty, otherwise throws an Error.
     * @param {Array<{user: string, steps: number, calories: number}>} workoutData 
     */
    constructor(workoutData) {
        if (!Array.isArray(workoutData) || workoutData.length === 0) {
            throw new Error("Invalid Dataset: Workout dataset is empty or not provided.");
        }
        this.workoutData = workoutData;
    }

    /**
     * 1. Filters users who have steps greater than 7000
     * Uses Array.prototype.filter()
     * @returns {Array} List of active user records
     */
    getActiveUsers() {
        return this.workoutData.filter((entry) => entry.steps > 7000);
    }

    /**
     * 2. Calculates average calories burned across all users
     * Uses Array.prototype.reduce()
     * @returns {number} Average calories burned
     */
    getAverageCalories() {
        const totalCalories = this.workoutData.reduce((accumulator, entry) => {
            return accumulator + entry.calories;
        }, 0);

        const average = totalCalories / this.workoutData.length;
        return Number(average.toFixed(2));
    }

    /**
     * 3. Generates a summary description for each user
     * Uses Array.prototype.map()
     * @returns {string[]} Formatted summaries
     */
    getUserSummary() {
        return this.workoutData.map((entry) => {
            const status = entry.steps >= 10000 
                ? "Goal Achieved! (10k+ steps)" 
                : entry.steps > 7000 
                ? "Active" 
                : "Sedentary";

            return `User ${entry.user}: ${entry.steps.toLocaleString()} steps | ${entry.calories} kcal burned | Status: ${status}`;
        });
    }
}

// ==========================================
// Given Workout Dataset
// ==========================================

const workoutDataset = [
    { user: "A", steps: 8000, calories: 300 },
    { user: "B", steps: 12000, calories: 500 },
    { user: "C", steps: 4000, calories: 200 }
];

console.log("=== Fitness App Analytics ===\n");

// 1. Initializing and running analytics with valid data
try {
    const analytics = new FitnessAnalytics(workoutDataset);

    // Raw Dataset Table
    console.log("Original Workout Dataset:");
    console.table(workoutDataset);

    // Execute getActiveUsers()
    console.log("\n1. Active Users (Steps > 7000) [Using filter()]:");
    const activeUsers = analytics.getActiveUsers();
    console.table(activeUsers);

    // Execute getAverageCalories()
    console.log("2. Average Calories Burned [Using reduce()]:");
    const avgCalories = analytics.getAverageCalories();
    console.log(`Average Calories: ${avgCalories} kcal per user`);

    // Execute getUserSummary()
    console.log("\n3. User Workout Summary [Using map()]:");
    const summaries = analytics.getUserSummary();
    summaries.forEach((summary) => console.log(`- ${summary}`));

} catch (error) {
    console.error(`Error during analytics processing: ${error.message}`);
}

// 2. Testing error handling with an empty dataset
console.log("\n-----------------------------------------------------------");
console.log("4. Testing Error Handling with Empty Dataset ([]):");
try {
    const emptyAnalytics = new FitnessAnalytics([]);
    emptyAnalytics.getActiveUsers();
} catch (error) {
    console.log(`[Caught Expected Error]: ${error.message}`);
}
