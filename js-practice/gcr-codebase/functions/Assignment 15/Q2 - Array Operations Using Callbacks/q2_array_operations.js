const numbers = [2, 4, 6, 8, 10];

const doubledNumbers = numbers.map((number) => number * 2);
const numbersGreaterThanTen = doubledNumbers.filter((number) => number > 10);
const total = numbers.reduce((sum, number) => sum + number, 0);

console.log("Original numbers:", numbers);
console.log("Doubled numbers:", doubledNumbers);
console.log("Doubled numbers greater than 10:", numbersGreaterThanTen);
console.log("Sum of original numbers:", total);
