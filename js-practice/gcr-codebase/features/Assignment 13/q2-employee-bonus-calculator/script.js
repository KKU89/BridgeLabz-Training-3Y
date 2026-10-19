"use strict";
const employees = [
    { name: "Amit", salary: "45000", years: "5" },
    { name: "Sara", salary: "38000", years: "2" },
    { name: "Kiran", salary: "52000", years: "7" }
];

for (const emp of employees) {
    try {
        if (!emp || typeof emp.name !== "string" || emp.salary === undefined || emp.years === undefined) {
            throw new Error("Missing employee property");
        }
        const salary = Number(emp.salary);
        const years = Number(emp.years);
        if (!Number.isFinite(salary) || !Number.isFinite(years) || salary < 0 || years < 0) {
            throw new Error("Salary or years is not a valid non-negative number");
        }
        const bonus = salary * (years > 3 ? 0.10 : 0.05);
        console.log(`${emp.name} | Salary: â‚¹${salary.toFixed(2)} | Experience: ${years} years | Bonus: â‚¹${bonus.toFixed(2)}`);
    } catch (error) {
        console.error(`Employee error: ${error.message}`);
    }
}

