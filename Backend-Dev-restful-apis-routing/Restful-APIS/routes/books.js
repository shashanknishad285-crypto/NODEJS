const express = require("express");
const router = express.Router();

let books = [
  { id: 1, title: "Book One", author: "John", year: 2020 },
  { id: 2, title: "Book Two", author: "Alice", year: 2021 },
  { id: 3, title: "Book Three", author: "John", year: 2022 },
];

// GET all books with filtering
router.get("/", (req, res) => {
  const { author, year } = req.query;

  let filteredBooks = books;

  if (author) {
    filteredBooks = filteredBooks.filter(
      book => book.author.toLowerCase() === author.toLowerCase()
    );
  }

  if (year) {
    filteredBooks = filteredBooks.filter(
      book => book.year === parseInt(year)
    );
  }

  res.json(filteredBooks);
});

module.exports = router;
