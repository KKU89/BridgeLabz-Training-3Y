/**
 * Question 1: Student Result Processing
 * 
 * Requirements:
 * - Create a Student class with name and marks[].
 * - Create calculateAverage() using reduce().
 * - Return grade A/B/C/F based on average.
 * - Test with 3 students.
 */

class Student {
    /**
     * Constructor to initialize student details
     * @param {string} name - The name of the student
     * @param {number[]} marks - Array of marks obtained by the student
     */
    constructor(name, marks) {
        this.name = name;
        this.marks = marks;
    }

    /**
     * Calculates the average marks of the student using reduce()
     * @returns {number} The average marks
     */
    calculateAverage() {
        if (!this.marks || this.marks.length === 0) {
            return 0;
        }

        // Using reduce() to sum all the marks in the array
        const totalMarks = this.marks.reduce((accumulator, currentMark) => {
            return accumulator + currentMark;
        }, 0);

        const average = totalMarks / this.marks.length;
        // Return average rounded to 2 decimal places for clean display
        return Number(average.toFixed(2));
    }

    /**
     * Determines the grade based on the calculated average
     * Grading criteria:
     * - Average >= 90: Grade A
     * - Average >= 75: Grade B
     * - Average >= 50: Grade C
     * - Average < 50: Grade F
     * @returns {string} The final grade (A, B, C, or F)
     */
    getGrade() {
        const avg = this.calculateAverage();

        if (avg >= 90) {
            return "A";
        } else if (avg >= 75) {
            return "B";
        } else if (avg >= 50) {
            return "C";
        } else {
            return "F";
        }
    }

    /**
     * Displays a summary report for the student
     */
    displayReport() {
        const average = this.calculateAverage();
        const grade = this.getGrade();

        console.log(`-----------------------------------------`);
        console.log(`Student Name : ${this.name}`);
        console.log(`Marks        : [${this.marks.join(", ")}]`);
        console.log(`Average Marks: ${average}`);
        console.log(`Grade        : ${grade}`);
        console.log(`Status       : ${grade === "F" ? "Needs Improvement (Failed)" : "Passed"}`);
    }
}

// ==========================================
// Testing with 3 Students
// ==========================================

console.log("=== Student Result Processing System ===");

// Student 1: High performer (Expected Grade A)
const student1 = new Student("Alice Johnson", [92, 95, 88, 96, 90]);

// Student 2: Good performer (Expected Grade B)
const student2 = new Student("Bob Smith", [78, 82, 74, 80, 76]);

// Student 3: Average performer (Expected Grade C)
const student3 = new Student("Charlie Brown", [55, 60, 58, 62, 50]);

// Display results for all 3 students
student1.displayReport();
student2.displayReport();
student3.displayReport();

console.log(`-----------------------------------------`);
