import React, { Component } from "react";
import axios from "axios";
import AuthorTable from "./AuthorTable";

class AuthorsView extends Component {
  constructor(props) {
    super(props);

    this.deleteAuthor = this.deleteAuthor.bind(this);

    this.state = {
      authors: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/authors/")
      .then(res => {
        this.setState({ authors: res.data });
      })
      .catch(() => {
        if (this.state.authors == null) {
          window.location("/");
        }
      });
  }

  deleteAuthor(id) {
    axios
      .delete("http://localhost:3000/authors/" + id)
      .then(res => console.log(res.data))
      .catch(() => {
        if (props.author._id == null) {
          window.location = "/";
        } else {
          window.location = "/authors/" + id;
        }
      });

    this.setState({
      authors: this.state.authors.filter(author => author._id !== id)
    });
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
