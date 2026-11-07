const studentForm = document.querySelector("#student-form");
const studentFields = {
  name: {
    input: document.querySelector("#student-name"),
    error: document.querySelector("#name-error"),
    pattern: /^[A-Za-z ]+$/,
    message: "Use letters and spaces only.",
  },
  email: {
    input: document.querySelector("#student-email"),
    error: document.querySelector("#email-error"),
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    message: "Enter an email such as student@example.com.",
  },
  phone: {
    input: document.querySelector("#student-phone"),
    error: document.querySelector("#phone-error"),
    pattern: /^\d{10}$/,
    message: "Enter exactly 10 digits.",
  },
  password: {
    input: document.querySelector("#student-password"),
    error: document.querySelector("#password-error"),
    pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
    message: "Include at least one uppercase letter, number, and special character.",
  },
};

function validateStudentField(field) {
  const value = field.input.value.trim();
  const isValid = value.length > 0 && field.pattern.test(value);

  field.input.classList.toggle("is-valid", isValid);
  field.input.classList.toggle("is-invalid", !isValid);
  field.error.textContent = isValid ? "" : field.message;
  field.input.setAttribute("aria-invalid", String(!isValid));

  return isValid;
}

Object.values(studentFields).forEach((field) => {
  field.input.addEventListener("input", () => validateStudentField(field));
});

studentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formIsValid = Object.values(studentFields).every(validateStudentField);
  const result = document.querySelector("#student-result");

  if (formIsValid) {
    result.textContent = "Registration details are valid.";
    result.className = "message success";
  } else {
    result.textContent = "Please correct the highlighted fields.";
    result.className = "message error-message";
  }
});
