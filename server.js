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

/* Build and deployment */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/src", "index.html"));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

app.listen(process.env.PORT || 3000);
