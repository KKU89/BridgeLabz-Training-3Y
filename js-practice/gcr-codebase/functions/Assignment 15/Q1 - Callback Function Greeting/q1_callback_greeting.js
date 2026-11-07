function greetUser(name, callback) {
  const greeting = `Hello, ${name}!`;
  callback(greeting);
}

function displayGreeting(message) {
  console.log(message);
}

greetUser("Aarav", displayGreeting);
