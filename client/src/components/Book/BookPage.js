import React, { Component } from "react";
import axios from "axios";
import BookCover from "../utilities/BookCover";
import { Link } from "react-router-dom";

class BookPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: null
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/books/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          book: res.data
        });
      });
  }

  bookDetails() {
    return (
      <div>
        <h1>{this.state.book.title}</h1>
        <BookCover
          key={this.state.book._id}
          currentBookCover={this.state.book}
        />
        <p>Author: {this.state.book.author.name} </p>
        <p>
          Publish Date: {new Date(this.state.book.publishDate).toDateString()}{" "}
        </p>
        <p>Need to Read: {this.state.book.unread ? "Yes" : "No"} </p>
        <p>Page Count: {this.state.book.pageCount} </p>
        <p>Description: {this.state.book.description} </p>
      </div>
    );
  }

  deleteAuthor(id) {
    axios.delete("http://localhost:3000/books/" + id);

    window.location = "/";
  }

  render() {
    return (
      <div>
        <div>{this.state.book && this.bookDetails()}</div>
        <Link to={"/books/edit/" + this.props.match.params.id}>Edit</Link>
        <button onClick={() => this.deleteAuthor(this.props.match.params.id)}>
          Delete
        </button>
      </div>
    );
  }
}

export default BookPage;
