"use strict";
const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];
const validNumeric = [];
const invalidData = [];

for (const item of apiData) {
    const num = Number(item);
    const bool = Boolean(item);
    const str = String(item);
    console.log(`Original: ${str} | Number: ${num} | Boolean: ${bool} | String: ${str}`);
    const invalid = item === null || item === undefined ||
        (typeof item === "string" && (item.trim() === "" || item.includes("px"))) ||
        !Number.isFinite(num);

    if (invalid) {
        invalidData.push(item);
        console.log(`  -> Invalid numeric data: ${str}`);
    } else {
        validNumeric.push(num);
    }
}
console.log("Valid numeric values:", validNumeric);
console.log("Invalid values:", invalidData);

