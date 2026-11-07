/**
 * Question 5: Ride-Sharing Application
 * 
 * Requirements:
 * - Create User, Driver, and Trip classes.
 * - Driver inherits User and adds vehicle details.
 * - Trip properties: fromLocation, toLocation, distance.
 * - Add calculateFare() using distance.
 * - Throw an error if distance is negative or missing.
 * - Handle errors using try-catch.
 */

// 1. User Class: Represents a regular passenger/app user
class User {
    /**
     * @param {string} name - Name of the user
     * @param {string} phone - Contact number
     */
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }

    getDetails() {
        return `${this.name} (Phone: ${this.phone})`;
    }
}

// 2. Driver Class: Inherits from User and adds vehicle details
class Driver extends User {
    /**
     * @param {string} name - Driver's name
     * @param {string} phone - Driver's phone number
     * @param {string} vehicleModel - Car/bike model (e.g. "Toyota Innova")
     * @param {string} vehicleNumber - Registration number (e.g. "DL-01-AB-1234")
     */
    constructor(name, phone, vehicleModel, vehicleNumber) {
        // Call super constructor to set name and phone
        super(name, phone);
        this.vehicleModel = vehicleModel;
        this.vehicleNumber = vehicleNumber;
    }

    getDriverDetails() {
        return `${this.name} | Vehicle: ${this.vehicleModel} (${this.vehicleNumber})`;
    }
}

// 3. Trip Class: Represents a ride between locations
class Trip {
    /**
     * @param {string} fromLocation - Starting point of the trip
     * @param {string} toLocation - Destination point
     * @param {number} distance - Distance in kilometers
     * @param {User} [passenger] - User booking the ride
     * @param {Driver} [driver] - Driver assigned to the ride
     */
    constructor(fromLocation, toLocation, distance, passenger = null, driver = null) {
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.distance = distance;
        this.passenger = passenger;
        this.driver = driver;
    }

    /**
     * Calculates trip fare based on distance
     * Base Fare: Rs. 50
     * Rate per Km: Rs. 15
     * 
     * Throws an error if distance is missing or negative.
     * @returns {number} Calculated fare
     */
    calculateFare(ratePerKm = 15, baseFare = 50) {
        // Check if distance is missing (undefined, null, or not a number)
        if (this.distance === undefined || this.distance === null || typeof this.distance !== "number" || isNaN(this.distance)) {
            throw new Error("Invalid Trip: Distance is missing or not a valid number.");
        }

        // Check if distance is negative or zero
        if (this.distance <= 0) {
            throw new Error(`Invalid Trip: Distance must be a positive number greater than 0. Received: ${this.distance} km.`);
        }

        // Formula: Base Fare + (Distance * Rate Per Km)
        const totalFare = baseFare + (this.distance * ratePerKm);
        return Number(totalFare.toFixed(2));
    }

    /**
     * Prints complete trip summary
     */
    printTripSummary() {
        const fare = this.calculateFare();
        console.log(`-----------------------------------------------`);
        console.log(`Trip Route   : ${this.fromLocation} -> ${this.toLocation}`);
        console.log(`Distance     : ${this.distance} km`);
        if (this.passenger) console.log(`Passenger    : ${this.passenger.getDetails()}`);
        if (this.driver)    console.log(`Driver       : ${this.driver.getDriverDetails()}`);
        console.log(`Calculated Fare : Rs. ${fare}`);
    }
}

// ==========================================
// Helper function to safely book and run trips
// using try-catch error handling
// ==========================================

function bookRide(fromLocation, toLocation, distance, passenger, driver) {
    console.log(`\nAttempting to book ride from "${fromLocation}" to "${toLocation}"...`);
    try {
        const trip = new Trip(fromLocation, toLocation, distance, passenger, driver);
        trip.printTripSummary();
        console.log(`Status       : Trip Confirmed and Completed Successfully.`);
    } catch (error) {
        // Catching distance or calculation errors gracefully
        console.log(`Booking Failed!`);
        console.log(`Error Caught : ${error.message}`);
    }
}

// ==========================================
// Test Cases
// ==========================================

console.log("=== Ride-Sharing Application ===");

const passenger1 = new User("Aarav Mehta", "9876543210");
const passenger2 = new User("Dia Sharma", "9123456789");

const driver1 = new Driver("Rajesh Kumar", "9988776655", "Hyundai Creta", "MH-02-CB-1234");
const driver2 = new Driver("Suresh Yadav", "9811223344", "Maruti Dzire", "DL-04-AK-5678");

// Case 1: Valid trip with positive distance
bookRide("Airport Terminal 3", "Connaught Place", 18.5, passenger1, driver1);

// Case 2: Valid trip with another distance
bookRide("Cyber City", "Sector 62", 24, passenger2, driver2);

// Case 3: Invalid trip with negative distance (Should throw error and be caught)
bookRide("Andheri West", "Bandra Kurla Complex", -10, passenger1, driver1);

// Case 4: Invalid trip with missing distance (undefined) (Should throw error and be caught)
bookRide("Indiranagar", "Koramangala", undefined, passenger2, driver2);
