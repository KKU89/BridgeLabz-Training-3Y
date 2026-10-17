let productName = " wireless headphones PRO ";
let trimmed = productName.trim();
let lower = trimmed.toLowerCase();
let capitalized = lower.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
let cleanedTitle = capitalized.replace("Pro", "Pro Edition");
console.log("Cleaned Title: \"" + cleanedTitle + "\"");
console.log("Length: " + cleanedTitle.length);
