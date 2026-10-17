let bonus = 5000;
function calculateSalary() {
    let salary = 40000;
    let isPermanent = true;
    let totalSalary = salary + (isPermanent ? bonus : 0);
    console.log("Total Salary inside function: ?" + totalSalary);
    
    isPermanent = false;
    console.log("Global bonus remains unchanged: ?" + bonus);
}
calculateSalary();
