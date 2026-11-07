class Employee {
  constructor(id, name, department, monthlySalary) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.salary = monthlySalary;
  }

  getAnnualSalary() {
    return this.salary * 12;
  }

  applyBonus(percent) {
    if (percent < 0) {
      throw new RangeError("Bonus percentage cannot be negative.");
    }

    this.salary = Number((this.salary * (1 + percent / 100)).toFixed(2));
  }
}

const employees = [
  new Employee(1, "Aarav Mehta", "Engineering", 85000),
  new Employee(2, "Mira Shah", "Design", 72000),
  new Employee(3, "Kabir Rao", "Marketing", 68000),
  new Employee(4, "Anaya Patel", "Finance", 78000),
  new Employee(5, "Ishaan Verma", "Operations", 64000),
];

employees.forEach((employee) => employee.applyBonus(5));

console.log("Annual salary by employee (after 5% bonus):");
employees.forEach((employee) => {
  console.log(
    `${employee.name} (${employee.department}): ₹${employee.getAnnualSalary().toLocaleString("en-IN")}`,
  );
});

const totalAnnualPayout = employees.reduce(
  (total, employee) => total + employee.getAnnualSalary(),
  0,
);

console.log(`Total annual company payout: ₹${totalAnnualPayout.toLocaleString("en-IN")}`);
