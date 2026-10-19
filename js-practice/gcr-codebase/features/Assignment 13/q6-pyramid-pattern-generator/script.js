"use strict";
const input = ""; // Enter a number here, e.g. "4". Blank means default 5.
const parsedLimit = input.trim() === "" ? 5 : Number(input);
const limit = Number.isInteger(parsedLimit) && parsedLimit >= 1 && parsedLimit <= 20 ? parsedLimit : 5;
console.log(`Pyramid with ${limit} rows:`);

for (let i = 1; i <= limit; i++) {
    let row = "";
    for (let j = 1; j <= i; j++) {
        row += "* ";
    }
    console.log(row.trim());
}

