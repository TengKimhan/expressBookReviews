const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
  let filtered_users = users.filter((user) => user.username === user);
  if (filtered_users) {
    return true;
  }
  return false;
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  if (isValid(username)) {
    let filtered_users = users.filter(
      (user) => user.username === username && user.password === password,
    );
    console.log(filtered_users);
    if (filtered_users) {
      return true;
    }
    return false;
  }
  return false;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  let user = req.body.username;
  let pass = req.body.password;
  if (!authenticatedUser(user, pass)) {
    return res.status(403).json({ message: "User not authenticated" });
  }

  let accessToken = jwt.sign(
    {
      data: user,
    },
    "access",
    { expiresIn: 60 * 60 },
  );
  req.session.authorization = {
    accessToken,
  };
  return res
    .status(200)
    .json({ message: "User logged in successfully", token: accessToken });
  //Write your code here
  // return res.status(300).json({ message: "Yet to be implemented" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let isbn = req.params.isbn;
  let review = req.query.review;
  let username = req.session.authorization.username;
  console.log("we are here ");
  if (books[isbn]) {
    if (books[isbn].reviews[username]) {
      books[isbn].reviews[username] = [review];
      return res.status(200).json({ message: "Review modified successfully" });
    } else {
      books[isbn].reviews[username] = [review];
      return res.status(200).json({ message: "Review added successfully" });
    }
  } else {
    return res.status(404).json({ message: "No book found with ISBN " + isbn });
  }
  // return res.status(300).json({ message: "Yet to be implemented" });
});

// delete book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let isbn = req.params.isbn;
  let username = req.session.authorization.username;
  if (books[isbn]) {
    if (books[isbn].reviews[username]) {
      delete books[isbn].reviews[username];
      return res.status(200).json({ message: "Review deleted successfully" });
    } else {
      return res
        .status(404)
        .json({ message: "No review found for ISBN " + isbn });
    }
  } else {
    return res.status(404).json({ message: "No book found with ISBN " + isbn });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
