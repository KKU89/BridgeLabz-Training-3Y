const bookingForm = document.querySelector("#booking-form");

function showBookingValidation(input, errorElement, isValid, message) {
  input.classList.toggle("is-valid", isValid);
  input.classList.toggle("is-invalid", !isValid);
  input.setAttribute("aria-invalid", String(!isValid));
  errorElement.textContent = isValid ? "" : message;
  return isValid;
}

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.querySelector("#booking-name");
  const emailInput = document.querySelector("#booking-email");
  const seatsInput = document.querySelector("#booking-seats");
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const seats = Number(seatsInput.value);

  const nameIsValid = showBookingValidation(
    nameInput,
    document.querySelector("#booking-name-error"),
    /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name),
    "Use letters and spaces only.",
  );
  const emailIsValid = showBookingValidation(
    emailInput,
    document.querySelector("#booking-email-error"),
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email),
    "Enter a valid email address.",
  );
  const seatsAreValid = showBookingValidation(
    seatsInput,
    document.querySelector("#booking-seats-error"),
    Number.isInteger(seats) && seats >= 1 && seats <= 10,
    "Choose a whole number from 1 to 10.",
  );
  const result = document.querySelector("#booking-result");

  if (!nameIsValid || !emailIsValid || !seatsAreValid) {
    result.textContent = "Please correct the highlighted fields.";
    result.className = "message error-message";
    return;
  }

  const booking = { name, email, seats };
  result.textContent = `Ticket booking confirmed\nName: ${booking.name}\nEmail: ${booking.email}\nSeats: ${booking.seats}`;
  result.className = "message success pre-line";
});
