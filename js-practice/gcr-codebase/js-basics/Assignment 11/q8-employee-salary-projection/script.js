let currentSalary = 50000;
let incrementRate = 8;
let salaryRecords = [];

let salary = currentSalary;
for (let year = 1; year <= 5; year++) {
    salary += salary * (incrementRate / 100);
    salaryRecords.push({ Year: year, ProjectedSalary: salary.toFixed(2) });
}

console.table(salaryRecords);
