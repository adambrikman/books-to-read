import React, { Component } from "react";
import axios from "axios";
import BookCover from "../utilities/BookCover";
import LoadingScreen from "../utilities/LoadingScreen";

// DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class HandleBookLists extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onChangePublishedBefore = this.onChangePublishedBefore.bind(this);
    this.onChangePublishedAfter = this.onChangePublishedAfter.bind(this);

    this.state = {
      books: [],
      publishedBefore: new Date().setDate(new Date().getDate() + 1),
      publishedAfter: new Date(),
      filteredBookList: [],
      earliestDate: new Date()
    };
  }

  componentDidMount() {
    let booksArr = [];

    axios.get("http://localhost:3000/").then(res => {
      this.setState({
        books: res.data,
        filteredBookList: res.data,
        publishedAfter: new Date(res.data[0].publishDate).setDate(
          new Date(res.data[0].publishDate).getDate() - 1
        ),
        earliestDate: new Date(res.data[0].publishDate).setDate(
          new Date(res.data[0].publishDate).getDate() - 1
        )
      });
      // Populate books array in state
    });
  }

  bookList() {
    return this.state.filteredBookList.map(currentBook => {
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
      filteredBookList: filteredBooks
    });
  }

  onChangePublishedBefore(date) {
    if (date < this.state.publishedAfter) {
      this.setState({
        publishedAfter: this.state.earliestDate
      });
    }
    this.setState({
      publishedBefore: date
    });

    let copyOfBookList = this.state.books.slice();

    let filteredBooks = copyOfBookList.filter(obj => {
      if (
        date > new Date(obj.publishDate) &&
        new Date(obj.publishDate) > this.state.publishedAfter
      ) {
        return obj;
      }
    });

    this.setState({
      filteredBookList: filteredBooks
    });
  }

  onChangePublishedAfter(date) {
    this.setState({
      publishedAfter: date
    });

    let copyOfBookList = this.state.books.slice();

    let filteredBooks = copyOfBookList.filter(obj => {
      if (
        date < new Date(obj.publishDate) &&
        new Date(obj.publishDate) < this.state.publishedBefore
      ) {
        return obj;
      }
    });

    this.setState({
      filteredBookList: filteredBooks
    });
  }

  handleTitle() {
    if (this.props.location.pathname == "/books/unread") {
      return <h1>Books to Read</h1>;
    } else {
      return <h1>Books I've Finished Reading!</h1>;
    }
  }

  render() {
    if (!this.state.books.length) {
      return <LoadingScreen />;
    }

    return (
      <div>
        <div>{this.handleTitle()}</div>
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
          <label>Published after: </label>
          <DatePicker
            selected={this.state.publishedAfter}
            onChange={this.onChangePublishedAfter}
          />
        </div>

        <div>
          <label>Published on or before: </label>
          <DatePicker
            selected={this.state.publishedBefore}
            onChange={this.onChangePublishedBefore}
          />
        </div>

        <div>{this.bookList()}</div>
      </div>
    );
  }
}

export default HandleBookLists;
