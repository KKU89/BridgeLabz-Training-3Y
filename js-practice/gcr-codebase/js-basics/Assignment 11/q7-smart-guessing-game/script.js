let secretNum = Math.floor(Math.random() * 50) + 1;
let userGuess = 28;

console.log(`Secret Number: ${secretNum} | User Guess: ${userGuess}`);
if (userGuess === secretNum) {
    console.log("Correct guess!");
} else {
    if (Math.abs(userGuess - secretNum) <= 3) {
        console.log("Very close!");
    } else if (userGuess > secretNum) {
        console.log("Too high");
    } else {
        console.log("Too low");
    }
}
