import React, { Component } from "react";
import axios from "axios";

// DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Filepond
// import { FilePond, registerPlugin } from "react-filepond";
// import "filepond/dist/filepond.min.css";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
// registerPlugin(FilePondPluginImagePreview);

class AddBooks extends Component {
  constructor(props) {
    super(props);

    this.onChangeAuthorName = this.onChangeAuthorName.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePublishDate = this.onChangePublishDate.bind(this);
    this.onChangeUnread = this.onChangeUnread.bind(this);
    this.onChangePageCount = this.onChangePageCount.bind(this);
    this.onChangeCover = this.onChangeCover.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      authorName: "",
      title: "",
      publishDate: new Date(),
      unread: "Yes",
      pageCount: "",
      cover: "",
      description: "",
      authors: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3000/authors/").then(res => {
      if (res.data.length > 0) {
        this.setState({
          authors: res.data.map(author => author.name),
          authorName: res.data[0].name
        });
      }
    });
  }

  onChangeAuthorName(e) {
    this.setState({
      authorName: e.target.value
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangePublishDate(date) {
    this.setState({
      publishDate: date
    });
  }

  onChangeUnread(e) {
    this.setState({
      unread: e.target.value
    });
  }

  onChangePageCount(e) {
    this.setState({
      pageCount: e.target.value
    });
  }

  onChangeCover(e) {
    this.setState({
      cover: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const book = {
      authorName: this.state.authorName,
      title: this.state.title,
      publishDate: this.state.publishDate,
      pageCount: this.state.pageCount,
      cover: this.state.cover,
      description: this.state.description
    };

    console.log(book);

    axios
      .post("http://localhost:3000/books/new", book)
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <div>
        <h1>Add an Author</h1>

        <form onSubmit={this.onSubmit}>
          <label>Title</label>
          <div>
            <input
              type="text"
              required
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>

          <label>Author: </label>
          <div>
            <select
              value={this.state.authorName}
              onChange={this.onChangeAuthorName}
              required
            >
              {this.state.authors.map(function(name) {
                return (
                  <option key={name} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.publishDate}
              onChange={this.onChangePublishDate}
            />
          </div>

          <label>Need to read</label>
          <div>
            <select
              value={this.state.unread}
              onChange={this.onChangeUnread}
              required
            >
              return(
              <option key="true" value="true">
                Yes
              </option>
              <option key="false" value="false">
                No
              </option>
              )
            </select>
          </div>

          <label>Page Count</label>
          <div>
            <input
              type="number"
              min="1"
              required
              value={this.state.pageCount}
              onChange={this.onChangePageCount}
            />
          </div>

          <label>Cover</label>
          <div>
            <input type="file" name="cover" className="filepond" />
          </div>

          <label>Description: </label>
          <div>
            <textarea
              required
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div>
            <a href="/">Cancel</a>
            <button type="submit">Add Book</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddBooks;
