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
      <div className="container">
        <h3 className="center-align title-padding">Recently Added</h3>
        <div className="center-align">{this.bookList()}</div>
      </div>
    );
  }
}

export default Index;
