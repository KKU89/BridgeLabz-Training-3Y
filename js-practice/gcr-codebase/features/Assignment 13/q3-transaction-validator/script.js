"use strict";
const transactions = [
    { id: 1, amount: 2000 },
    { id: 2, amount: -500 },
    { id: 3 },
    null
];
const valid = [];
const invalid = [];

transactions.forEach((tx, index) => {
    try {
        console.log(`Checking transaction at index ${index}:`, tx); // Set a breakpoint here.
        if (tx === null || tx === undefined) throw new Error("NULL_ENTRY");
        if (tx.id === undefined || tx.amount === undefined) throw new Error("MISSING_FIELD");
        if (typeof tx.amount !== "number" || !Number.isFinite(tx.amount)) throw new Error("INVALID_AMOUNT");
        if (tx.amount < 0) throw new Error("NEGATIVE_AMOUNT");
        valid.push(tx);
        console.log(`Valid transaction: ID ${tx.id}, amount ${tx.amount}`);
    } catch (error) {
        invalid.push({ index, category: error.message, transaction: tx });
        console.error(`Transaction ${index} failed [${error.message}]`);
    }
});
console.log("Valid transactions:", valid);
console.log("Invalid transactions:", invalid);
console.log(`Summary: ${valid.length} successful, ${invalid.length} failed`);

