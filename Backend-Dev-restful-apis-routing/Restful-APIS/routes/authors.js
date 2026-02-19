const express = require("express");
const router = express.Router();

let authors = [
  { id: 1, name: "John" },
  { id: 2, name: "Alice" }
];

// CREATE
router.post("/", (req, res) => {
  const newAuthor = {
    id: authors.length + 1,
    name: req.body.name
  };

  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

// READ ALL
router.get("/", (req, res) => {
  res.json(authors);
});

// READ ONE
router.get("/:id", (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  res.json(author);
});

// UPDATE
router.put("/:id", (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  author.name = req.body.name;
  res.json(author);
});

// DELETE
router.delete("/:id", (req, res) => {
  authors = authors.filter(a => a.id !== parseInt(req.params.id));
  res.json({ message: "Author deleted successfully" });
});

module.exports = router;
