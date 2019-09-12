import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render } from "react-dom";

// Import components
import Navbar from "./components/Navbar";
import Index from "./components/Index";
import AuthorsList from "./components/AuthorsList";
import AddAuthor from "./components/AddAuthor";
import BooksToReadList from "./components/BooksToReadList";
import FinishedBooksList from "./components/FinishedBooksList";
import AddBooks from "./components/AddBooks";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={Index} />
      <Route path="/authors" exact component={AuthorsList} />
      <Route path="/authors/new" component={AddAuthor} />
      <Route path="/books/unread" component={BooksToReadList} />
      <Route path="/books/finished" component={FinishedBooksList} />
      <Route path="/books/new" component={AddBooks} />
    </Router>
  );
}

render(<App />, document.getElementById("root"));
