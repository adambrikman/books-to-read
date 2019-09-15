import React, { Component } from "react";
import axios from "axios";

// DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import Encode, Image Preview & Image Resize
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginImageResize from "filepond-plugin-image-resize";

// Register plugins
registerPlugin(FilePondPluginFileEncode);
registerPlugin(FilePondPluginImagePreview);
registerPlugin(FilePondPluginImageResize);

class AddBooks extends Component {
  constructor(props) {
    super(props);

    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePublishDate = this.onChangePublishDate.bind(this);
    this.onChangeUnread = this.onChangeUnread.bind(this);
    this.onChangePageCount = this.onChangePageCount.bind(this);
    this.onChangeCover = this.onChangeCover.bind(this);
    this.onChangeCoverImageType = this.onChangeCoverImageType.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      author: "",
      title: "",
      publishDate: new Date(),
      unread: true,
      pageCount: "",
      cover: "",
      coverImageType: "",
      description: "",
      authors: [],
      booleans: [{ value: "Yes", id: true }, { value: "No", id: false }]
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3000/authors/").then(res => {
      if (res.data.length > 0) {
        this.setState({
          authors: res.data,
          author: res.data[0]._id
        });
      }
    });
  }

  onChangeAuthor(e) {
    this.setState({
      author: e.target.value
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

  onChangeCoverImageType(e) {
    this.setState({
      cover: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

  onSubmit(e) {
    e.preventDefault();
    const book = {
      author: this.state.author,
      title: this.state.title,
      publishDate: this.state.publishDate,
      unread: this.state.unread,
      pageCount: this.state.pageCount,
      cover: this.state.cover,
      coverImageType: this.state.coverImageType,
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
              value={this.state.author}
              onChange={this.onChangeAuthor}
              required
            >
              {this.state.authors.map(function(name) {
                return (
                  <option key={name._id} value={name._id}>
                    {name.name}
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
              {this.state.booleans.map(function(bool) {
                return (
                  <option key={bool.id} value={bool.id}>
                    {bool.value}
                  </option>
                );
              })}
              ;
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
            <FilePond
              ref={ref => (this.pond = ref)}
              cover={this.state.cover}
              allowFileEncode="true"
              oninit={() => this.handleInit()}
              imageResizeTargetWidth="100"
              imageResizeTargetHeight="150"
              onChange={this.onChangeCover}
              onChange={this.onChangeCoverImageType}
              onaddfile={(error, file) => {
                console.log(file);
                // Set current file objects to this.state
                this.setState({
                  cover: file.getFileEncodeBase64String(),
                  coverImageType: file.fileType
                });
              }}
            ></FilePond>
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
