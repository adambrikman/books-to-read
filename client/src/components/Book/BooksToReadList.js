import React, { Component } from "react";
import axios from "axios";
import BookCover from "../utilities/BookCover";
import LoadingScreen from "../utilities/LoadingScreen";

// DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class BooksToReadList extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onChangePublishedBefore = this.onChangePublishedBefore.bind(this);
    this.onChangePublishedAfter = this.onChangePublishedAfter.bind(this);

    this.state = {
      books: [],
      publishedBefore: new Date().setDate(new Date().getDate() + 1),
      publishedAfter: new Date(),
      filteredBookName: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3000/").then(res => {
      this.setState({ books: res.data, filteredBookName: res.data });
    });
  }

  bookList() {
    return this.state.filteredBookName.map(currentBook => {
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

  handleChange(e) {
    let filteredBooks = [];
    // Copy book array
    let copyOfBookList = this.state.books.slice();

    if (e.target.value !== "") {
      filteredBooks = copyOfBookList.filter(obj => {
        let caseInsensitiveInput = new RegExp(e.target.value, "i");
        return obj.title.match(caseInsensitiveInput);
      });
    } else {
      // If the search bar is empty, set filteredBooks to original list of books
      filteredBooks = this.state.books;
    }
    this.setState({
      filteredBookName: filteredBooks
    });
  }

  // const dates = ["2018-09-12", "2018-10-18", "2018-12-30"];
  // const filteredDates = dates.filter(d => new Date(d) - new Date() > 0);

  filterPublishedBefore(date) {
    let filteredBooks = [];
    // Copy book array
    let copyOfBookList = this.state.books.slice();

    filteredBooks = copyOfBookList.filter(obj => {
      if (date > new Date(obj.publishDate)) {
        console.log("ok");
        return obj;
      }
    });

    this.setState({
      filteredBookName: filteredBooks
    });
  }

  onChangePublishedBefore(date) {
    this.setState({
      publishedBefore: date
    });
  }

  onChangePublishedAfter(date) {
    this.setState({
      publishedAfter: date
    });
  }

  // handleTitle() {}

  render() {
    if (this.state.books.length) {
      // console.log(
      //   new Date(this.state.publishedBefore) <
      //     new Date(this.state.books[0].publishDate)
      // );
    }

    if (!this.state.books.length) {
      return <LoadingScreen />;
    }

    return (
      <div>
        <h1>Books to Read</h1>
        <h2>Search Books</h2>
        <div>
          <label>Title: </label>
          <input
            type="text"
            onChange={this.handleChange}
            placeholder="Search Titles"
          />
        </div>

        <div>
          <label>Published before: </label>
          <DatePicker
            selected={this.state.publishedBefore}
            onChange={this.onChangePublishedBefore}
            placeholderText="Enter Date"
          />
        </div>

        <div>
          <label>Published after: </label>
          <DatePicker
            selected={this.state.publishedAfter}
            onChange={this.onChangePublishedAfter}
          />
        </div>

        <div>{this.bookList()}</div>
      </div>
    );
  }
}

export default BooksToReadList;
