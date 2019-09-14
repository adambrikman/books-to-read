import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { render } from "react-dom";

// Import components
import Navbar from "./components/Navbar";
import Index from "./components/Index";
import AuthorsView from "./components/Author/AuthorsView";
import AddAuthor from "./components/Author/AddAuthor";
import EditAuthor from "./components/Author/EditAuthor";
import AuthorPage from "./components/Author/AuthorPage";

import BooksToReadList from "./components/Book/BooksToReadList";
import FinishedBooksList from "./components/Book/FinishedBooksList";
import AddBooks from "./components/Book/AddBooks";
import EditBook from "./components/Book/EditBook";
import BookPage from "./components/Book/BookPage";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Switch>
        <Route path="/" exact component={Index} />

        <Route path="/authors" exact component={AuthorsView} />
        <Route path="/authors/new" component={AddAuthor} />
        <Route path="/authors/:id" exact component={AuthorPage} />
        <Route path="/authors/edit/:id" component={EditAuthor} />

        <Route path="/books/unread" component={BooksToReadList} />
        <Route path="/books/finished" component={FinishedBooksList} />
        <Route path="/books/new" component={AddBooks} />
        <Route path="/books/:id" component={BookPage} />
        <Route path="/books/:id/edit" component={EditBook} />
      </Switch>
    </Router>
  );
}

render(<App />, document.getElementById("root"));
