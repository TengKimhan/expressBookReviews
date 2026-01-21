const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get("/", (req, res) => {
  //Write your code here
  // return res.status(300).json({ message: "Yet to be implemented" });
  const getBooks = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(books);
      }, 1000);
    });
  };
  getBooks()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      res.status(500).json({ error: "An error occured" });
    });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", (req, res) => {
  //Write your code here
  // return res.status(300).json({ message: "Yet to be implemented" });
  const ISBN = req.params.isbn;
  const booksBasedOnIsbn = (ISBN) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const book = books[ISBN];
        if (book) {
          resolve(book);
        } else {
          reject(new Error("Book not found"));
        }
      }, 1000);
    });
  };
  booksBasedOnIsbn(ISBN)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => {
      res.status(400).json({ error: "Book not found" });
    });
});

// Get book details based on author
public_users.get("/author/:author", (req, res) => {
  //Write your code here
  // return res.status(300).json({ message: "Yet to be implemented" });
  const author = req.params.author;
  const booksBasedOnAuthor = (auth) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const filteredbooks = Object.values(books).filter(
          (b) => b.author === auth,
        );
        if (filteredbooks.length > 0) {
          resolve(filteredbooks);
        } else {
          reject(new Error("Book not found"));
        }
      }, 1000);
    });
  };
  booksBasedOnAuthor(author)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => {
      res.status(400).json({ error: "Book not found" });
    });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
