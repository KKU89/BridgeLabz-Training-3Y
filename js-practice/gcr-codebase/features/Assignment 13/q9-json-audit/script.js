"use strict";
const rawData = [
    '{"user":"Alex","age":25}',
    '{"id":2}',
    '{invalid}',
    '{"user":"Mina","age":"22"}',
    '{"user":"Sam","age":15}'
];
const cleanAdults = [];

rawData.forEach((entry, index) => {
    try {
        console.log(`Processing line ${index + 1}`); // Set a breakpoint here.
        const parsed = JSON.parse(entry);
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
            throw new Error("Expected a JSON object");
        }
        if (typeof parsed.user !== "string" || parsed.user.trim() === "" ||
            parsed.age === undefined || parsed.age === null || parsed.age === "") {
            throw new Error("Missing required key: user or age");
        }
        const age = Number(parsed.age);
        if (!Number.isFinite(age) || age < 0) throw new Error("Invalid age");
        parsed.age = age;
        if (age >= 18) cleanAdults.push(parsed);
        console.log(`Line ${index + 1}: valid entry; age=${age}`);
    } catch (error) {
        console.error(`Line ${index + 1}: ${error.message}`);
    }
});
console.log("Clean adult users (18+):", cleanAdults);

