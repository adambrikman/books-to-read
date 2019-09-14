const router = require("express").Router();
const Author = require("../models/author");

// View all authors
router.get("/", async (req, res) => {
  const authors = await Author.find({});
  try {
    res.json(authors);
  } catch (e) {
    res.status(400).json("Error " + e);
  }
});

// Add author
router.post("/new", async (req, res) => {
  try {
    const name = await req.body.name;
    const newAuthor = await new Author({ name });
    newAuthor.save();
    res.json("Author added!");
  } catch {
    res.json("Error: Could not add author");
  }
});

// View individual author
router.get("/:id", async (req, res) => {
  const author = await Author.findById(req.params.id);
  try {
    res.json(author);
  } catch (e) {
    res.status(400).json("Error " + e);
  }
});

// Delete author
router.delete("/:id", async (req, res) => {
  let author;

  try {
    const author = await Author.findById(req.params.id);
    author.remove();
  } catch (e) {
    res.json("Error: Could not delete author");
  }
});

// Update author
router.put("/edit/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    author.name = req.body.name;
    author.save();
    res.json("Author updated!");
  } catch {
    res.json("Error: Could not update author");
  }
});

module.exports = router;
