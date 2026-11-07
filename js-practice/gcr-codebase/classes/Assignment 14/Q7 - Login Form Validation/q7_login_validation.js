const loginForm = document.querySelector("#login-form");

function getPasswordErrors(password) {
  const errors = [];

  if (password.length < 8) errors.push("Use at least 8 characters.");
  if (!/[0-9]/.test(password)) errors.push("Include at least one number.");
  if (!/[A-Z]/.test(password)) errors.push("Include at least one uppercase letter.");
  if (!/[a-z]/.test(password)) errors.push("Include at least one lowercase letter.");
  if (!/[^A-Za-z0-9]/.test(password)) errors.push("Include at least one special character.");

  return errors;
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const usernameInput = document.querySelector("#login-username");
  const passwordInput = document.querySelector("#login-password");
  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  const usernameError = document.querySelector("#login-username-error");
  const passwordError = document.querySelector("#login-password-error");
  const result = document.querySelector("#login-result");

  const usernameIsValid = username.length >= 5;
  const passwordErrors = getPasswordErrors(password);
  const passwordIsValid = passwordErrors.length === 0;

  usernameInput.classList.toggle("is-valid", usernameIsValid);
  usernameInput.classList.toggle("is-invalid", !usernameIsValid);
  usernameInput.setAttribute("aria-invalid", String(!usernameIsValid));
  usernameError.textContent = usernameIsValid ? "" : "Username must be at least 5 characters.";

  passwordInput.classList.toggle("is-valid", passwordIsValid);
  passwordInput.classList.toggle("is-invalid", !passwordIsValid);
  passwordInput.setAttribute("aria-invalid", String(!passwordIsValid));
  passwordError.textContent = passwordErrors.join(" ");

  if (usernameIsValid && passwordIsValid) {
    result.textContent = "Login details are valid.";
    result.className = "message success";
  } else {
    result.textContent = "Please correct the highlighted fields.";
    result.className = "message error-message";
  }
});
