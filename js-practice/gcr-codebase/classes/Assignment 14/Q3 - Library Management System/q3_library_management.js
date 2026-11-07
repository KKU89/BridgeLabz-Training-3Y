class Book {
  constructor(title, author, isbn, isIssued = false) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isIssued = isIssued;
  }

  issueBook() {
    if (this.isIssued) return false;
    this.isIssued = true;
    return true;
  }

  returnBook() {
    if (!this.isIssued) return false;
    this.isIssued = false;
    return true;
  }
}

const books = [
  new Book("The Hobbit", "J. R. R. Tolkien", "9780547928227"),
  new Book("Pride and Prejudice", "Jane Austen", "9780141439518"),
  new Book("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565", true),
  new Book("A Brief History of Time", "Stephen Hawking", "9780553380163"),
];

function displayAvailableBooks() {
  const availableBooks = books.filter((book) => !book.isIssued);
  const list = document.querySelector("#available-books");

  if (availableBooks.length === 0) {
    list.innerHTML = "<li>No books are currently available.</li>";
    return;
  }

  list.innerHTML = availableBooks
    .map((book) => `<li><strong>${book.title}</strong> — ${book.author} <span>ISBN: ${book.isbn}</span></li>`)
    .join("");
}

document.querySelector("#issue-book-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const isbn = document.querySelector("#book-isbn").value.trim();
  const book = books.find((item) => item.isbn === isbn);
  const result = document.querySelector("#library-result");

  if (!book) {
    result.textContent = "No book was found with that ISBN.";
    result.className = "message error-message";
  } else if (!book.issueBook()) {
    result.textContent = `“${book.title}” is already issued.`;
    result.className = "message error-message";
  } else {
    result.textContent = `“${book.title}” has been issued.`;
    result.className = "message success";
  }

  displayAvailableBooks();
});

displayAvailableBooks();
