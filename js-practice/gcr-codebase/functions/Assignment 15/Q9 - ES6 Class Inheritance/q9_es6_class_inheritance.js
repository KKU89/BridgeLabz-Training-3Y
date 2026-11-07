function FunctionPerson(name) {
  this.name = name;
}

FunctionPerson.prototype.introduce = function () {
  return `My name is ${this.name}.`;
};

function FunctionStudent(name, grade) {
  FunctionPerson.call(this, name);
  this.grade = grade;
}

FunctionStudent.prototype = Object.create(FunctionPerson.prototype);
FunctionStudent.prototype.constructor = FunctionStudent;

FunctionStudent.prototype.getGrade = function () {
  return `${this.name} is in grade ${this.grade}.`;
};

class ClassPerson {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `My name is ${this.name}.`;
  }
}

class ClassStudent extends ClassPerson {
  constructor(name, grade) {
    super(name);
    this.grade = grade;
  }

  getGrade() {
    return `${this.name} is in grade ${this.grade}.`;
  }
}

const functionStudent = new FunctionStudent("Noah", 11);
const classStudent = new ClassStudent("Noah", 11);

console.log("Constructor function:", functionStudent.introduce());
console.log("Constructor function:", functionStudent.getGrade());
console.log("ES6 class:", classStudent.introduce());
console.log("ES6 class:", classStudent.getGrade());
console.log(
  "Both students inherit from their person type:",
  functionStudent instanceof FunctionPerson && classStudent instanceof ClassPerson
);
console.log(
  "Class methods are stored on the prototype:",
  Object.hasOwn(ClassPerson.prototype, "introduce")
);
console.log(
  "Class inheritance uses a prototype chain:",
  Object.getPrototypeOf(ClassStudent.prototype) === ClassPerson.prototype
);
