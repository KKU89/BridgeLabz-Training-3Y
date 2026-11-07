const person = {
  name: "Maya",
  introduce() {
    const showName = () => {
      console.log(`My name is ${this.name}.`);
    };

    showName();
  }
};

person.introduce();
