/**
 * Question 7: Banking Application
 * 
 * Requirements:
 * - Create a BankAccount class with private field #balance.
 * - Implement deposit(amount), withdraw(amount), and getBalance().
 * - Throw an error for insufficient balance.
 * - Demonstrate valid deposits and invalid withdrawals using try-catch.
 */

class BankAccount {
    // Private field declaration (ES2022+ syntax)
    // #balance cannot be directly read or modified from outside the class
    #balance;

    /**
     * Initializes a bank account
     * @param {string} accountHolder - Name of the account holder
     * @param {number} initialBalance - Initial opening balance
     */
    constructor(accountHolder, initialBalance = 0) {
        if (initialBalance < 0) {
            throw new Error("Initial balance cannot be negative.");
        }
        this.accountHolder = accountHolder;
        this.#balance = initialBalance;
    }

    /**
     * Deposits money into the account
     * @param {number} amount 
     * @returns {number} The updated balance
     */
    deposit(amount) {
        if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
            throw new Error(`Deposit failed: Amount must be a positive number. Received: ${amount}`);
        }

        this.#balance += amount;
        console.log(`[Deposit Success] Rs. ${amount} deposited to ${this.accountHolder}'s account.`);
        return this.#balance;
    }

    /**
     * Withdraws money from the account
     * Throws an error if amount exceeds current balance or is invalid
     * @param {number} amount 
     * @returns {number} The updated balance
     */
    withdraw(amount) {
        if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
            throw new Error(`Withdrawal failed: Amount must be a positive number. Received: ${amount}`);
        }

        // Check for sufficient funds
        if (amount > this.#balance) {
            throw new Error(
                `Insufficient Balance! Cannot withdraw Rs. ${amount}. Current balance is only Rs. ${this.#balance}.`
            );
        }

        this.#balance -= amount;
        console.log(`[Withdrawal Success] Rs. ${amount} withdrawn from ${this.accountHolder}'s account.`);
        return this.#balance;
    }

    /**
     * Public getter method to safely read the private #balance
     * @returns {number}
     */
    getBalance() {
        return this.#balance;
    }

    /**
     * Displays account status
     */
    displayAccountSummary() {
        console.log(`Account Holder : ${this.accountHolder}`);
        console.log(`Current Balance: Rs. ${this.getBalance()}`);
    }
}

// ==========================================
// Demonstration & Testing with try-catch
// ==========================================

console.log("=== Banking Application (Encapsulation with Private Fields) ===\n");

// Creating a new bank account with Rs. 5000 initial balance
const myAccount = new BankAccount("Vikram Aditya", 5000);
myAccount.displayAccountSummary();

// 1. Valid Deposits
console.log("\n--- Testing Valid Deposits ---");
try {
    myAccount.deposit(2500);
    console.log(`New Balance: Rs. ${myAccount.getBalance()}`);

    myAccount.deposit(1000);
    console.log(`New Balance: Rs. ${myAccount.getBalance()}`);
} catch (error) {
    console.log(`Error: ${error.message}`);
}

// 2. Valid Withdrawal
console.log("\n--- Testing Valid Withdrawal ---");
try {
    myAccount.withdraw(3000);
    console.log(`New Balance: Rs. ${myAccount.getBalance()}`);
} catch (error) {
    console.log(`Error: ${error.message}`);
}

// 3. Invalid Withdrawal (Insufficient Balance)
console.log("\n--- Testing Invalid Withdrawal (Insufficient Funds) ---");
try {
    // Current balance is Rs. 5500, attempting to withdraw Rs. 10000
    console.log(`Attempting to withdraw Rs. 10000...`);
    myAccount.withdraw(10000);
    console.log(`New Balance: Rs. ${myAccount.getBalance()}`);
} catch (error) {
    console.log(`[Caught Expected Error]: ${error.message}`);
}

// 4. Invalid Deposit / Withdrawal (Negative/Zero values)
console.log("\n--- Testing Invalid Input Values ---");
try {
    console.log(`Attempting to deposit -500...`);
    myAccount.deposit(-500);
} catch (error) {
    console.log(`[Caught Expected Error]: ${error.message}`);
}

try {
    console.log(`Attempting to withdraw 0...`);
    myAccount.withdraw(0);
} catch (error) {
    console.log(`[Caught Expected Error]: ${error.message}`);
}

// 5. Encapsulation Check: Verifying that #balance cannot be directly read or mutated
console.log("\n--- Demonstrating Encapsulation ---");
console.log(`Accessing myAccount.balance (undefined property): ${myAccount.balance}`);
console.log(`Note: Direct access to myAccount.#balance is prevented at syntax level by JavaScript.`);
console.log(`Actual balance accessed via safe getter getBalance(): Rs. ${myAccount.getBalance()}`);
