let feedback = "Great product! Fast delivery and amazing sound quality!";
let words = feedback.trim().split(/\s+/);
let wordCount = words.length;
let hasNegative = feedback.toLowerCase().includes("bad") || feedback.toLowerCase().includes("poor");

console.log("Word Count: " + wordCount);
if (!hasNegative) {
    console.log("Positive Feedback");
} else {
    console.log("Needs Improvement");
}
