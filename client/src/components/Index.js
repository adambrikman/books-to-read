import React, { Component } from "react";
import axios from "axios";
import BookCover from "./utilities/BookCover";
import LoadingScreen from "./utilities/LoadingScreen";

class Index extends Component {
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
      return <BookCover key={currentBook._id} currentBookCover={currentBook} />;
    });
  }

  render() {
    if (!this.state.books.length) {
      return <LoadingScreen />;
    }

    return (
      <div>
        <h1>Recently Added</h1>
        <div>{this.bookList()}</div>
      </div>
    );
  }
}

export default Index;
