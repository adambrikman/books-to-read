import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <Link to="/">BooksToRead</Link>
        <ul>
          <li>
            <Link to="/authors">Authors</Link>
          </li>
          <li>
            <Link to="/authors/new">Add Author</Link>
          </li>
          <li>
            <Link to="/books/unread">Books To Read</Link>
          </li>
          <li>
            <Link to="/books/finished">Finished Books</Link>
          </li>
          <li>
            <Link to="/books/new">Add Book</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
