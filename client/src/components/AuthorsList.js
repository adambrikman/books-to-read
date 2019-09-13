import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AuthorTable = props => (
  <tr>
    <td>{props.author.name}</td>
    <td>
      <Link to={"/authors/edit/" + props.author._id}>Edit</Link>
      &nbsp;
      <button onClick={() => props.deleteAuthor(props.author._id)}>
        Delete
      </button>
    </td>
  </tr>
);

class AuthorsList extends Component {
  constructor(props) {
    super(props);

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
      .catch(e => {
        console.log(e);
      });
  }

  deleteAuthor(id) {
    axios
      .delete("http://localhost:3000/authors/" + id)
      .then(res => console.log(res.data));

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

export default AuthorsList;
