const router = require("express").Router();
const Author = require("../models/author");

// View all authors
router.get("/", async (req, res) => {
  const authors = await Author.find({});
  try {
    res.json(authors);
  } catch {
    res.redirect("/");
  }
});

// Add author
router.post("/new", async (req, res) => {
  try {
    const name = await req.body.name;
    const newAuthor = await new Author({ name });
    newAuthor.save();
    res.json("Author added!");
  } catch (e) {
    res.status(400).json("Error: " + e);
  }
});

// View individual author
router.get("/:id", async (req, res) => {
  const author = await Author.findById(req.params.id);
  try {
    res.json(author);
  } catch {
    res.redirect("/");
  }
});

// Update author
router.put("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    author.name = req.body.name;
    author.save();
    res.json("Author updated!");
  } catch (e) {
    res.status(400).json("Error: " + e);
  }
});

module.exports = router;
