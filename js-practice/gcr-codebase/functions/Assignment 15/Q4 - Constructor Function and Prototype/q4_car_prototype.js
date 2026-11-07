function Car(brand, model, year) {
  this.brand = brand;
  this.model = model;
  this.year = year;
}

Car.prototype.getDetails = function () {
  return `${this.year} ${this.brand} ${this.model}`;
};

const car = new Car("Toyota", "Corolla", 2022);

console.log(car.getDetails());
