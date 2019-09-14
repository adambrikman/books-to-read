import React, { Component } from "react";
import axios from "axios";

class AddAuthor extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: ""
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const author = {
      name: this.state.name
    };

    axios
      .post("http://localhost:3000/authors/new", author)
      .then(res => console.log(res.data));

    this.setState({
      name: ""
    });
  }

  render() {
    return (
      <div>
        <h1>Add an Author</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="author">Name: </label>
          <input
            type="text"
            name="author"
            value={this.state.name}
            onChange={this.onChangeName}
            required
          />
          <div>
            <a href="/">Cancel</a>
            <button type="submit">Add Author</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddAuthor;
