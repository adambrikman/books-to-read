import React, { Component } from "react";
import axios from "axios";

class EditAuthor extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/authors/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.author.name
        });
      });
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
      .put(
        "http://localhost:3000/authors/edit/" + this.props.match.params.id,
        author
      )
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <div>
        <h1>Edit Author Name</h1>

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
            <a href="/authors/">Cancel</a>
            <button type="submit">Edit Author</button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditAuthor;
