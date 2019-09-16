import React, { Component } from "react";
import axios from "axios";
import BookCover from "../utilities/BookCover";

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
        <p>Need to Read: {String(this.state.book.unread)} </p>
        <p>Page Count: {this.state.book.pageCount} </p>
        <p>Description: {this.state.book.description} </p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>{this.state.book && this.bookDetails()}</div>
      </div>
    );
  }
}

export default BookPage;
