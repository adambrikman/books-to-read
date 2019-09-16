import React, { Component } from "react";
import axios from "axios";
import BookCover from "../utilities/BookCover";

class AuthorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      books: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/authors/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          author: res.data.author.name,
          books: res.data.books
        });
      });
  }

  booksByAuthorLabel() {
    if (this.state.books.length > 0) {
      return <div>Books by Author:</div>;
    } else {
      return <div>This author doesn't have any books yet!</div>;
    }
  }

  bookList() {
    return this.state.books.map(currentBook => {
      return <BookCover key={currentBook._id} currentBookCover={currentBook} />;
    });
  }

  render() {
    return (
      <div>
        <h1>Author Page</h1>
        <div>Name: {this.state.author} </div>
        &nbsp;
        <button>Delete</button>
        <div>{this.booksByAuthorLabel()}</div>
        <div>{this.bookList()}</div>
      </div>
    );
  }
}

export default AuthorPage;
