let scores = Array.from({length: 8}, () => Math.floor(Math.random() * 71) + 30);
let maxScore = Math.max(...scores);
let minScore = Math.min(...scores);
let totalScore = scores.reduce((acc, curr) => acc + curr, 0);
let avgScore = totalScore / scores.length;
let passedCount = scores.filter(s => s >= 50).length;
console.log("Scores: " + scores.join(", "));
console.log("Highest: " + maxScore + " | Lowest: " + minScore + " | Average: " + avgScore.toFixed(2) + " | Passed: " + passedCount);
