"use strict";
const operations = ["add", "divide", "power", "root", "subtract", "modulo"];
const num1 = 25;
const num2 = 0;
const results = [];

for (const operation of operations) {
    try {
        let result;
        switch (operation) {
            case "add": result = num1 + num2; break;
            case "subtract": result = num1 - num2; break;
            case "divide":
                if (num2 === 0) throw new Error("Division by zero");
                result = num1 / num2;
                break;
            case "power": result = num1 ** num2; break;
            case "root":
                if (num1 < 0) throw new Error("Cannot take square root of a negative number");
                result = Math.sqrt(num1);
                break;
            default: {
                const error = new Error(`Unsupported operation: ${operation}`);
                error.name = "InvalidOperationError";
                throw error;
            }
        }
        results.push({ operation, result, status: "Success" });
    } catch (error) {
        results.push({ operation, error: error.message, status: error.name });
    }
}
console.log("Calculator summary:");
results.forEach(item => console.log(`${item.operation}: ${item.status} | ${item.result ?? item.error}`));

