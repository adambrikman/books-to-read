import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../utilities/LoadingScreen";

class HandleAuthor extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      paramNumbers: Object.keys(this.props.match.params).length,
      newAuthor: ""
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

    // Check if URL contains an ID or not
    if (this.state.paramNumbers > 0) {
      /* newAuthor variable utilized to re-render component 
      for either addition or edit of author name */
      this.setState({
        newAuthor: ""
      });

      axios
        .put(
          "http://localhost:3000/authors/edit/" + this.props.match.params.id,
          author
        )
        .then(this.setState({ newAuthor: "No" }));
    } else {
      axios
        .post("http://localhost:3000/authors/new", author)
        .then(res => console.log(res.data))
        .then(this.setState({ newAuthor: "Yes" }));
    }

    window.location = "/authors";
  }

  handlePageName() {
    if (this.state.paramNumbers < 1) {
      return <h3 className="center-align">Add an Author</h3>;
    } else {
      return <h3 className="center-align">Edit Author Name</h3>;
    }
  }

  handleSubmitBtn() {
    if (this.state.paramNumbers < 1) {
      return (
        <button type="submit" className="btn deep-purple">
          Add Author
        </button>
      );
    } else {
      return (
        <button type="submit" className="btn deep-purple">
          Edit Author
        </button>
      );
    }
  }

  cancelForm() {
    if (this.state.paramNumbers < 1) {
      return (
        <Link to="/" className="btn red lighten-2">
          Cancel
        </Link>
      );
    } else {
      return (
        <Link to="/authors" className="btn red lighten-2">
          Cancel
        </Link>
      );
    }
  }

  render() {
    if (this.state.paramNumbers > 0 && this.state.name == "") {
      return <LoadingScreen />;
    }

    return (
      <div className="container">
        <div className="padding-bottom-small">{this.handlePageName()}</div>

        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col l4 offset-l4 m6 offset-m3 s8 offset-s2">
              <div className="input-field">
                <input
                  type="text"
                  name="author"
                  value={this.state.name}
                  onChange={this.onChangeName}
                  required
                />
                <label htmlFor="author" className="active">
                  Name
                </label>
              </div>
            </div>
          </div>

          <div className="row">
            <span className="col offset-l4 m2 offset-m3 s3 offset-s2">
              {this.handleSubmitBtn()}
            </span>
            <span className="col m2 s3">{this.cancelForm()}</span>
          </div>
        </form>
      </div>
    );
  }
}

export default HandleAuthor;
