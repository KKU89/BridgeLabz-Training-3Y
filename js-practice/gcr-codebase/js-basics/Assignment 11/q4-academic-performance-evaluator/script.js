let marks = [85, 90, 78, 88, 92];
let totalMarks = marks.reduce((acc, curr) => acc + curr, 0);
let percentage = (totalMarks / (marks.length * 100)) * 100;
let hasFailed = marks.some(m => m < 35);

let performanceStatus = "";
if (hasFailed || percentage < 50) {
    performanceStatus = "Detained";
} else if (percentage >= 85) {
    performanceStatus = "Promoted with Distinction";
} else {
    performanceStatus = "Promoted";
}

console.log(`Overall Percentage: ${percentage.toFixed(2)}%`);
console.log(`Status: ${performanceStatus}`);
