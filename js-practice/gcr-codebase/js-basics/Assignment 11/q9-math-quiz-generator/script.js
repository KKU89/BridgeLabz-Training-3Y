let num1 = Math.floor(Math.random() * 20) + 1;
let num2 = Math.floor(Math.random() * 20) + 1;
let operators = ['+', '-', '*', '/'];
let op = operators[Math.floor(Math.random() * operators.length)];
let quizResult;

switch (op) {
    case '+':
        quizResult = num1 + num2;
        break;
    case '-':
        quizResult = num1 - num2;
        break;
    case '*':
        quizResult = num1 * num2;
        break;
    case '/':
        quizResult = num2 !== 0 ? (num1 / num2).toFixed(2) : "Undefined (Div by zero)";
        break;
}

console.log(`Quiz Question: ${num1} ${op} ${num2} = ?`);
console.log(`Correct Answer: ${quizResult}`);
