document.getElementById("searchInput").addEventListener("input", function () {
  const searchText = this.value.toLowerCase();
  const bookCards = document.querySelectorAll(".card1");

  bookCards.forEach((card) => {
    const title = card.querySelector("p span").textContent.toLowerCase();
    const author = card
      .querySelector("p:nth-child(2) span")
      .textContent.toLowerCase();

    if (title.includes(searchText) || author.includes(searchText)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

fetch("https://trello.vimlc.uz/books")
  .then((response) => response.json())
  .then((data) => {
    const bookList = document.getElementById("bookList");
    data.forEach((book) => {
      const card = document.createElement("div");
      card.classList.add("card1");

      card.innerHTML = `
        <p>Kitob nomi: <span>${book.title}</span></p>
        <p>Muallifi: <span>${book.author}</span></p>
        <p>Yili: <span>${book.year}</span></p>
        <button id="deleteBtn" class="deleteBtn" data-id="${book.id}">delete</button>
        <button class="editBtn" data-id="${book.id}" data-title="${book.title}" data-author="${book.author}" data-year="${book.year}">tahrirlash</button>
      `;

      bookList.appendChild(card);
    });

    const deleteButtons = document.querySelectorAll(".deleteBtn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const bookId = this.getAttribute("data-id");
        deleteBook(bookId, this);
      });
    });

    const editButtons = document.querySelectorAll(".editBtn");
    editButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const bookId = this.getAttribute("data-id");
        const bookTitle = this.getAttribute("data-title");
        const bookAuthor = this.getAttribute("data-author");
        const bookYear = this.getAttribute("data-year");

        document.getElementById("bookTitle").value = bookTitle;
        document.getElementById("bookAuthor").value = bookAuthor;
        document.getElementById("bookYear").value = bookYear;

        const submitButton = document.querySelector(".btn-submit");
        submitButton.textContent = "Tahrirlash";
        submitButton.setAttribute("data-id", bookId);
        submitButton.setAttribute("data-action", "edit");
      });
    });
  })
  .catch((error) => console.error(error));

function deleteBook(bookId, buttonElement) {
  document.getElementById("loading").style.display = "flex";
  fetch(`https://trello.vimlc.uz/books/${bookId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => {
      buttonElement.parentElement.remove();
      document.getElementById("loading").style.display = "none";
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("loading").style.display = "none";
    });
}
document.addEventListener("DOMContentLoaded", function () {
  const addBookForm = document.getElementById("addBookForm");

  addBookForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const bookTitle = document.getElementById("bookTitle").value;
    const bookAuthor = document.getElementById("bookAuthor").value;
    const bookYear = document.getElementById("bookYear").value;

    const bookData = {
      title: bookTitle,
      author: bookAuthor,
      year: bookYear,
    };

    const submitButton = document.querySelector(".btn-submit");

    if (submitButton.getAttribute("data-action") === "edit") {
      const bookId = submitButton.getAttribute("data-id");
      editBook(bookId, bookData);
    } else {
      addBook(bookData);
    }
  });
});

function editBook(bookId, bookData) {
  document.getElementById("loading").style.display = "flex";

  fetch(`https://trello.vimlc.uz/books/${bookId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  })
    .then((response) => response.json())
    .then(() => {
      fetchBooks();
      document.getElementById("loading").style.display = "none";
      const submitButton = document.querySelector(".btn-submit");
      submitButton.textContent = "Qo'shish";
      submitButton.removeAttribute("data-id");
      submitButton.removeAttribute("data-action");
      addBookForm.reset();
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("loading").style.display = "none";
    });
}

function addBook(bookData) {
  document.getElementById("loading").style.display = "flex";

  fetch("https://trello.vimlc.uz/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  })
    .then((response) => response.json())
    .then(() => {
      fetchBooks();
      document.getElementById("loading").style.display = "none";
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("loading").style.display = "none";
    });
}

function fetchBooks() {
  fetch("https://trello.vimlc.uz/books")
    .then((response) => response.json())
    .then((data) => {
      const bookList = document.getElementById("bookList");
      bookList.innerHTML = "";

      data.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("card1");

        card.innerHTML = `
          <p>Kitob nomi: <span>${book.title}</span></p>
          <p>Muallifi: <span>${book.author}</span></p>
          <p>Yili: <span>${book.year}</span></p>
          <button id="deleteBtn" class="deleteBtn" data-id="${book.id}">delete</button>
          <button class="editBtn" data-id="${book.id}" data-title="${book.title}" data-author="${book.author}" data-year="${book.year}">tahrirlash</button>
        `;

        bookList.appendChild(card);
      });

      const deleteButtons = document.querySelectorAll(".deleteBtn");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const bookId = this.getAttribute("data-id");
          deleteBook(bookId, this);
        });
      });

      const editButtons = document.querySelectorAll("#editBtn");
      editButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const bookId = this.getAttribute("data-id");
          const bookTitle = this.getAttribute("data-title");
          const bookAuthor = this.getAttribute("data-author");
          const bookYear = this.getAttribute("data-year");

          document.getElementById("bookTitle").value = bookTitle;
          document.getElementById("bookAuthor").value = bookAuthor;
          document.getElementById("bookYear").value = bookYear;

          const submitButton = document.querySelector(".btn-submit");
          submitButton.textContent = "Tahrirlash";
          submitButton.setAttribute("data-id", bookId);
          submitButton.setAttribute("data-action", "edit");
        });
      });
    })
    .catch((error) => console.error(error));
}
