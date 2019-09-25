import React, { Component } from "react";
import axios from "axios";
import BookCover from "./utilities/BookCover";
import LoadingScreen from "./utilities/LoadingScreen";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      mounted: false
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/home")
      .then(res => {
        console.log(res);
        this.setState({ books: res.data, mounted: true });
      })
      .catch(e => {
        console.log(e);
      });
  }

  bookList() {
    if (this.state.books.length > 0) {
      return this.state.books.map(currentBook => {
        return (
          <BookCover key={currentBook._id} currentBookCover={currentBook} />
        );
      });
    } else {
      return <div>There have not been any books uploaded yet!</div>;
    }
  }

  render() {
    if (!this.state.mounted) {
      return <LoadingScreen />;
    }

    return (
      <div className="container">
        <h3 className="center-align padding-bottom-small">Recently Added</h3>
        <div className="center-align">{this.bookList()}</div>
      </div>
    );
  }
}

export default Index;
