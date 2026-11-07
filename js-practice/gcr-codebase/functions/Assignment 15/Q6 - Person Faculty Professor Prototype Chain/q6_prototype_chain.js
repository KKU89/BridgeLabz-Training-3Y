function Person(name) {
  this.name = name;
}

Person.prototype.introduce = function () {
  return `My name is ${this.name}.`;
};

function Faculty(name, department) {
  Person.call(this, name);
  this.department = department;
}

Faculty.prototype = Object.create(Person.prototype);
Faculty.prototype.constructor = Faculty;

Faculty.prototype.getDepartment = function () {
  return `${this.name} works in the ${this.department} department.`;
};

function Professor(name, department, subject) {
  Faculty.call(this, name, department);
  this.subject = subject;
}

Professor.prototype = Object.create(Faculty.prototype);
Professor.prototype.constructor = Professor;

Professor.prototype.teach = function () {
  return `${this.name} teaches ${this.subject}.`;
};

const professor = new Professor("Dr. Lee", "Science", "Biology");

console.log(professor.introduce());
console.log(professor.getDepartment());
console.log(professor.teach());
console.log("Professor inherits from Faculty:", professor instanceof Faculty);
console.log("Professor inherits from Person:", professor instanceof Person);
