if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

// Middleware
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(morgan("dev"));

// process.env.MONGO_URI
// Connect to Mongoose
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://user:LTLCSYSIOmetHfxP@bookstoread-y0tzd.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", err => console.error(err));
db.once("open", () => console.log("Connected to Mongoose"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

// Define routes
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");

// Utilize routes
app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.listen(process.env.PORT || 3000);
