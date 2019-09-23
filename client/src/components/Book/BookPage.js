import React, { Component } from "react";
import axios from "axios";
import BookCover from "../utilities/BookCover";
import { Link } from "react-router-dom";
import LoadingScreen from "../utilities/LoadingScreen";

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
      <div className="container center-align">
        <h3>{this.state.book.title}</h3>
        <BookCover
          key={this.state.book._id}
          currentBookCover={this.state.book}
        />
        <p>
          Author:
          <Link to={"/authors/" + this.state.book.author._id}>
            &nbsp;
            {this.state.book.author.name}
          </Link>
        </p>
        <p>
          Publish Date: {new Date(this.state.book.publishDate).toDateString()}{" "}
        </p>
        <p>Need to Read: {this.state.book.unread ? "Yes" : "No"} </p>
        <p>Page Count: {this.state.book.pageCount} </p>
        <p>Why I want to read it: {this.state.book.description} </p>
      </div>
    );
  }

  deleteAuthor(id) {
    axios.delete("http://localhost:3000/books/" + id);

    window.location = "/";
  }

  render() {
    if (this.state.book == null) {
      return <LoadingScreen />;
    }
    return (
      <div>
        <div>{this.state.book && this.bookDetails()}</div>
        <div className="row">
          <div className="col offset-l5 offset-m5 s1 offset-s4">
            <Link
              to={"/books/edit/" + this.props.match.params.id}
              className="btn deep-purple"
            >
              Edit
            </Link>
          </div>
          <div className="col m1 offset-s1">
            <button
              onClick={() => this.deleteAuthor(this.props.match.params.id)}
              className="btn red lighten-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default BookPage;
