"use strict";
console.log("score before assignment:", score); // undefined
announce(); // Function declarations are hoisted.

var score = 50;
function announce() {
    console.log("Game started");
}
console.log("score after assignment:", score);
let status = "ready";
function startGame() {
    console.log("Status:", status);
}
startGame();
const launch = () => console.log("Arrow launch");
launch();

