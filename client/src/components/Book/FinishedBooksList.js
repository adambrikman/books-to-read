import React, { Component } from "react";
import axios from "axios";
import BookCover from "../utilities/BookCover";
import LoadingScreen from "../utilities/LoadingScreen";

class FinishedBooksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3000/").then(res => {
      this.setState({ books: res.data });
    });
  }

  bookList() {
    return this.state.books.map(currentBook => {
      if (
        currentBook.unread == true &&
        this.props.location.pathname == "/books/unread"
      ) {
        return (
          <BookCover key={currentBook._id} currentBookCover={currentBook} />
        );
      } else if (
        currentBook.unread == false &&
        this.props.location.pathname == "/books/finished"
      ) {
        return (
          <BookCover key={currentBook._id} currentBookCover={currentBook} />
        );
      }
    });
  }

  handleTitle() {}

  render() {
    if (!this.state.books.length) {
      return <LoadingScreen />;
    }

    return (
      <div>
        <h1>FINISHED!</h1>
        <div>{this.bookList()}</div>
      </div>
    );
  }
}

export default FinishedBooksList;
