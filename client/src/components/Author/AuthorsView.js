import React, { Component } from "react";
import axios from "axios";
import AuthorTable from "./AuthorTable";

class AuthorsView extends Component {
  constructor(props) {
    super(props);

    this.deleteAuthor = this.deleteAuthor.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      authorObjects: [],
      books: [],
      authorNames: [],
      filteredAuthorObjects: []
    };
  }

  componentDidMount() {
    let authorIdsWithBooks = [];
    let authorNamesArr = [];
    axios
      .get("http://localhost:3000/authors/")
      .then(res => {
        this.setState({
          authorObjects: res.data,
          filteredAuthorObjects: res.data
        });
      })
      .then(this.setState({ authorNames: authorNamesArr }));

    axios
      .get("http://localhost:3000/books/")
      .then(res => {
        res.data.map(authorBook => {
          authorIdsWithBooks.push(authorBook.author);
        });
      })
      .then(this.setState({ books: authorIdsWithBooks }));
  }

  deleteAuthor(id) {
    if (!this.state.books.includes(id)) {
      axios.delete("http://localhost:3000/authors/" + id);

      this.setState({
        filteredAuthorObjects: this.state.filteredAuthorObjects.filter(
          author => author._id !== id
        )
      });
    }
  }

  authorList() {
    return this.state.filteredAuthorObjects.map(currentAuthor => {
      return (
        <AuthorTable
          author={currentAuthor}
          deleteAuthor={this.deleteAuthor}
          key={currentAuthor._id}
        />
      );
    });
  }

  handleChange(e) {
    let copyOfAuthorList = [];
    let filteredAuthors = [];

    if (e.target.value !== "") {
      // Copy author array
      copyOfAuthorList = this.state.authorObjects.slice();

      filteredAuthors = copyOfAuthorList.filter(obj => {
        let caseInsensitiveInput = new RegExp(e.target.value, "i");
        return obj.name.match(caseInsensitiveInput);
      });
    } else {
      // If the search bar is empty, set filteredAuthors to original list of authors
      filteredAuthors = this.state.authorObjects;
    }

    this.setState({
      filteredAuthorObjects: filteredAuthors
    });
  }

  render() {
    return (
      <div>
        <h1>Search Authors</h1>
        <form>
          <label>Name: </label>
          <input
            type="text"
            onChange={this.handleChange}
            placeholder="Search Authors"
          />
        </form>
        <table>
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.authorList()}</tbody>
        </table>
      </div>
    );
  }
}

export default AuthorsView;
