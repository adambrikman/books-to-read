if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

// Middleware
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// Connect to Mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", err => console.error(err));
db.once("open", () => console.log("Connected to Mongoose"));

// Define routes
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");

// Utilize routes
app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.use(express.static("./client/dist"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});

app.listen(process.env.PORT || 3000);
