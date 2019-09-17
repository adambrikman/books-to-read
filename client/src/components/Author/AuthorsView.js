import React, { Component } from "react";
import axios from "axios";
import AuthorTable from "./AuthorTable";

class AuthorsView extends Component {
  constructor(props) {
    super(props);

    this.deleteAuthor = this.deleteAuthor.bind(this);

    this.state = {
      authors: [],
      books: []
    };
  }

  componentDidMount() {
    let authorIdsWithBooks = [];
    axios.get("http://localhost:3000/authors/").then(res => {
      this.setState({ authors: res.data });
    });
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
        authors: this.state.authors.filter(author => author._id !== id)
      });
    }
  }

  authorList() {
    return this.state.authors.map(currentAuthor => {
      return (
        <AuthorTable
          author={currentAuthor}
          deleteAuthor={this.deleteAuthor}
          key={currentAuthor._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Search Authors</h1>
        <form>
          <label>Name: </label>
          <input type="text" />
          <button type="submit">Search</button>
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
