/**
 * Question 8: Movie Ticket Booking System
 * 
 * Requirements:
 * - Create a MovieTicket class with movieName, seatNo, and price.
 * - Create OnlineTicket that inherits MovieTicket.
 * - Add convenienceFee and getTotalAmount().
 * - Add printTicket() to MovieTicket.prototype.
 * - Call it using OnlineTicket objects to demonstrate the prototype chain.
 */

// 1. Base Class: MovieTicket
class MovieTicket {
    /**
     * Initializes basic movie ticket attributes
     * @param {string} movieName - Title of the movie
     * @param {string} seatNo - Assigned seat number (e.g. "E-14")
     * @param {number} price - Base ticket price
     */
    constructor(movieName, seatNo, price) {
        this.movieName = movieName;
        this.seatNo = seatNo;
        this.price = price;
    }
}

// 2. Derived Class: OnlineTicket (Inherits from MovieTicket)
class OnlineTicket extends MovieTicket {
    /**
     * Initializes online ticket with additional convenience fee
     * @param {string} movieName 
     * @param {string} seatNo 
     * @param {number} price 
     * @param {number} convenienceFee - Platform convenience fee for online booking
     */
    constructor(movieName, seatNo, price, convenienceFee = 50) {
        // Calls base class constructor
        super(movieName, seatNo, price);
        this.convenienceFee = convenienceFee;
    }

    /**
     * Calculates total amount payable including convenience fee
     * @returns {number}
     */
    getTotalAmount() {
        return this.price + this.convenienceFee;
    }
}

// 3. Adding printTicket() method directly to MovieTicket.prototype
/**
 * By attaching this method to MovieTicket.prototype, all instances of MovieTicket
 * and any derived classes (like OnlineTicket) will inherit this method via
 * JavaScript's prototype chain.
 */
MovieTicket.prototype.printTicket = function () {
    console.log(`-----------------------------------------------`);
    console.log(`Movie Name       : ${this.movieName}`);
    console.log(`Seat Number      : ${this.seatNo}`);
    console.log(`Base Price       : Rs. ${this.price}`);

    // If it's an online ticket, print convenience fee and total amount
    if (typeof this.getTotalAmount === "function") {
        console.log(`Convenience Fee  : Rs. ${this.convenienceFee}`);
        console.log(`Total Amount Due : Rs. ${this.getTotalAmount()}`);
        console.log(`Booking Type     : Online Booking`);
    } else {
        console.log(`Total Amount Due : Rs. ${this.price}`);
        console.log(`Booking Type     : Counter / Box Office`);
    }
};

// ==========================================
// Demonstration of Prototype Chain
// ==========================================

console.log("=== Movie Ticket Booking (Prototype Chain Demonstration) ===\n");

// Creating an OnlineTicket object
const onlineTicket1 = new OnlineTicket("Interstellar: IMAX Special", "F-12", 450, 60);
const onlineTicket2 = new OnlineTicket("Inception", "D-08", 350, 45);

// Calling printTicket() on OnlineTicket instances
console.log("1. Printing Online Tickets using printTicket():");
onlineTicket1.printTicket();
onlineTicket2.printTicket();

console.log(`-----------------------------------------------`);

// 4. Detailed Prototype Chain Explanation
console.log("\n2. Prototype Chain Lookup Explanation:");
console.log(`Does onlineTicket1 have printTicket as its OWN property?`);
console.log(`-> ${Object.prototype.hasOwnProperty.call(onlineTicket1, "printTicket")}`);

console.log(`Does OnlineTicket.prototype have printTicket?`);
console.log(`-> ${Object.prototype.hasOwnProperty.call(OnlineTicket.prototype, "printTicket")}`);

console.log(`Does MovieTicket.prototype have printTicket?`);
console.log(`-> ${Object.prototype.hasOwnProperty.call(MovieTicket.prototype, "printTicket")}`);

console.log("\nPrototype Chain Path:");
console.log("onlineTicket1");
console.log("  └──> [[Prototype]]: OnlineTicket.prototype");
console.log("         └──> [[Prototype]]: MovieTicket.prototype (finds printTicket() here!)");
console.log("                └──> [[Prototype]]: Object.prototype");
console.log("                       └──> null");

console.log(`\nInstanceOf checks:`);
console.log(`onlineTicket1 instanceof OnlineTicket : ${onlineTicket1 instanceof OnlineTicket}`);
console.log(`onlineTicket1 instanceof MovieTicket  : ${onlineTicket1 instanceof MovieTicket}`);
console.log(`onlineTicket1 instanceof Object       : ${onlineTicket1 instanceof Object}`);
