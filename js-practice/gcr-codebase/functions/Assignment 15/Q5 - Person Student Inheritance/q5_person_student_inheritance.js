function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.introduce = function () {
  return `My name is ${this.name} and I am ${this.age} years old.`;
};

function Student(name, age, grade) {
  Person.call(this, name, age);
  this.grade = grade;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.getGrade = function () {
  return `${this.name} is in grade ${this.grade}.`;
};

const student = new Student("Riya", 16, 10);

console.log(student.introduce());
console.log(student.getGrade());
console.log("Student inherits from Person:", student instanceof Person);
