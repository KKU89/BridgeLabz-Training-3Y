Array.prototype.myMap = function (callback) {
  const mappedArray = [];

  for (let index = 0; index < this.length; index += 1) {
    if (index in this) {
      mappedArray[index] = callback(this[index], index, this);
    }
  }

  return mappedArray;
};

const numbers = [1, 2, 3, 4];
const squaredNumbers = numbers.myMap((number) => number * number);

console.log("Original numbers:", numbers);
console.log("Squared numbers:", squaredNumbers);
