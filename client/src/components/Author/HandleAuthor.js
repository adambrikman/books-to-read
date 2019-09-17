import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class HandleAuthor extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      paramNumbers: Object.keys(this.props.match.params).length,
      redirectParam: ""
    };
  }

  componentDidMount() {
    if (this.state.paramNumbers > 0) {
      axios
        .get("http://localhost:3000/authors/" + this.props.match.params.id)
        .then(res => {
          this.setState({
            name: res.data.author.name
          });
        });
    }
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

    if (this.state.paramNumbers > 0) {
      axios
        .put(
          "http://localhost:3000/authors/edit/" + this.props.match.params.id,
          author
        )
        .then(res => console.log(res.data));
    } else {
      axios
        .post("http://localhost:3000/authors/new", author)
        .then(res => console.log(res.data))
        .then(this.setState({ redirectParam: "/authors/" }));
    }

    window.location = "/authors";
  }

  handlePageName() {
    if (this.state.paramNumbers > 0) {
      return <h1>Edit Author Name</h1>;
    } else {
      return <h1>Add an Author</h1>;
    }
  }

  cancelForm() {
    if (this.state.paramNumbers > 0) {
      return <Link to="/authors">Cancel</Link>;
    } else {
      return <Link to="/">Cancel</Link>;
    }
  }

  handleSubmitBtn() {
    if (this.state.paramNumbers > 0) {
      return <button type="submit">Edit Author</button>;
    } else {
      return <button type="submit">Add Author</button>;
    }
  }

  render() {
    return (
      <div>
        <div>{this.handlePageName()}</div>

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
            <span>{this.cancelForm()}</span>
            <span>{this.handleSubmitBtn()}</span>
          </div>
        </form>
      </div>
    );
  }
}

export default HandleAuthor;
