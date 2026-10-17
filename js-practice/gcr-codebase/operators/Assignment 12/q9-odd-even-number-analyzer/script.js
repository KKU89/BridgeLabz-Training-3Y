let results = [];
for (let i = 1; i <= 30; i++) {
    let classification = "";
    if (i % 3 === 0 && i % 5 === 0) {
        classification = "FizzBuzz";
    } else if (i % 2 === 0) {
        classification = "Even";
    } else {
        classification = "Odd";
    }
    results.push({ number: i, result: classification });
}
console.table(results);
