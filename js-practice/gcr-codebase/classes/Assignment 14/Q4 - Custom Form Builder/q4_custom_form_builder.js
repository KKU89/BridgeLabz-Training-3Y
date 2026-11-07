class FormBuilder {
  constructor(fields, containerSelector, resultSelector) {
    this.fields = fields;
    this.container = document.querySelector(containerSelector);
    this.result = document.querySelector(resultSelector);
  }

  createForm() {
    const fieldMarkup = this.fields
      .map((field, index) => {
        const fieldId = `builder-field-${index}`;
        const inputType = field.type === "textarea" ? "textarea" : field.type;
        const control = inputType === "textarea"
          ? `<textarea id="${fieldId}" name="${field.name}" required></textarea>`
          : `<input id="${fieldId}" name="${field.name}" type="${inputType}" required>`;

        return `<div class="field"><label for="${fieldId}">${field.label}</label>${control}</div>`;
      })
      .join("");

    this.container.innerHTML = `
      <form id="generated-form">
        ${fieldMarkup}
        <button type="submit">Submit</button>
      </form>
    `;

    this.container.querySelector("#generated-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = this.getFormData();
      this.result.textContent = JSON.stringify(formData, null, 2);
      this.result.hidden = false;
    });
  }

  getFormData() {
    const form = this.container.querySelector("#generated-form");
    return Object.fromEntries(new FormData(form).entries());
  }
}

const registrationFormBuilder = new FormBuilder(
  [
    { type: "text", name: "username", label: "Username" },
    { type: "email", name: "email", label: "Email" },
    { type: "textarea", name: "about", label: "About you" },
  ],
  "#generated-form-container",
  "#form-data-result",
);

registrationFormBuilder.createForm();
