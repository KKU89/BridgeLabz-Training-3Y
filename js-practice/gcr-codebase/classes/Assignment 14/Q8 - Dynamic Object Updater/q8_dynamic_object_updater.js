const user = { name: "John", email: "john@mail.com", age: 21 };
const userForm = document.querySelector("#user-form");
const userDetails = document.querySelector("#updated-user");

function displayUser() {
  userDetails.textContent = JSON.stringify(user, null, 2);
}

document.querySelector("#user-name").value = user.name;
document.querySelector("#user-email").value = user.email;
document.querySelector("#user-age").value = user.age;
displayUser();

userForm.addEventListener("submit", (event) => {
  event.preventDefault();

  user.name = document.querySelector("#user-name").value.trim();
  user.email = document.querySelector("#user-email").value.trim();
  user.age = Number(document.querySelector("#user-age").value);

  displayUser();
});
