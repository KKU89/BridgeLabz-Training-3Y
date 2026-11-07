/**
 * Question 4: Employee Inheritance & Runtime Polymorphism
 * 
 * Requirements:
 * - Create Employee and Manager classes.
 * - Employee properties: name, department.
 * - Manager inherits Employee.
 * - Override the work() method in Manager.
 * - Demonstrate runtime polymorphism.
 */

// 1. Base Class: Employee
class Employee {
    /**
     * Initializes employee name and department
     * @param {string} name 
     * @param {string} department 
     */
    constructor(name, department) {
        this.name = name;
        this.department = department;
    }

    /**
     * Base work method
     * Describes the general responsibilities of an employee
     */
    work() {
        return `${this.name} is performing assigned operational duties in the ${this.department} department.`;
    }
}

// 2. Derived Class: Manager (Inherits from Employee)
class Manager extends Employee {
    /**
     * Initializes manager details by calling super()
     * @param {string} name 
     * @param {string} department 
     * @param {number} teamSize 
     */
    constructor(name, department, teamSize = 5) {
        // Calling super() to initialize inherited properties from Employee
        super(name, department);
        this.teamSize = teamSize;
    }

    /**
     * Overridden work method in Manager class
     * Replaces Employee's work() with manager-specific behavior
     */
    work() {
        return `${this.name} is leading a team of ${this.teamSize} members and managing projects in the ${this.department} department.`;
    }
}

// ==========================================
// Demonstrating Runtime Polymorphism
// ==========================================

console.log("=== Employee Hierarchy & Runtime Polymorphism ===\n");

// Creating instances of Employee and Manager
const emp1 = new Employee("Karan Sharma", "Software Engineering");
const emp2 = new Employee("Priya Singh", "Quality Assurance");

const mgr1 = new Manager("Ananya Verma", "Engineering", 12);
const mgr2 = new Manager("Rohan Mehta", "Human Resources", 8);

/**
 * Polymorphism in action:
 * An array holding a heterogeneous list of Employee and Manager objects.
 * We invoke the same method work() on each object.
 * JavaScript dynamically resolves which method implementation to execute at runtime 
 * based on the actual instance type (Employee vs Manager).
 */
const staffMembers = [emp1, mgr1, emp2, mgr2];

console.log("Calling .work() polymorphically across all staff members:\n");

staffMembers.forEach((staff, index) => {
    console.log(`[Staff #${index + 1}] Type: ${staff instanceof Manager ? "Manager" : "Employee"}`);
    console.log(`Action: ${staff.work()}\n`);
});
