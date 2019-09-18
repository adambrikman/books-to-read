import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Import React FilePond & styles
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

// Import Encode, Image Preview & Image Resize
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";

// Register plugins
registerPlugin(FilePondPluginFileEncode);
registerPlugin(FilePondPluginImagePreview);
registerPlugin(FilePondPluginImageResize);
registerPlugin(FilePondPluginImageTransform);

class HandleBook extends Component {
  constructor(props) {
    super(props);

    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePublishDate = this.onChangePublishDate.bind(this);
    this.onChangeUnread = this.onChangeUnread.bind(this);
    this.onChangePageCount = this.onChangePageCount.bind(this);
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
      booleans: [{ value: "Yes", id: true }, { value: "No", id: false }],
      paramNumbers: Object.keys(this.props.match.params).length
    };
  }

  componentDidMount() {
    if (this.state.paramNumbers < 1) {
      axios.get("http://localhost:3000/authors/").then(res => {
        if (res.data.length > 0) {
          this.setState({
            authors: res.data,
            author: res.data[0]._id
          });
        }
      });
    } else {
      axios.get("http://localhost:3000/authors/").then(res => {
        if (res.data.length > 0) {
          this.setState({
            authors: res.data,
            author: res.data[0]._id
          });
        }
      });
      axios
        .get("http://localhost:3000/books/" + this.props.match.params.id)
        .then(res => {
          if (res.data) {
            this.setState({
              title: res.data.title,
              publishDate: new Date(res.data.publishDate),
              unread: res.data.unread,
              pageCount: res.data.pageCount,
              cover: res.data.coverImage,
              coverImageType: res.data.coverImageType,
              description: res.data.description
            });
          }
        });
    }
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

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  cancelForm() {
    if (this.state.paramNumbers < 1) {
      return <Link to={"/"}>Cancel</Link>;
    } else {
      return <Link to={"/books/" + this.props.match.params.id}>Cancel</Link>;
    }
  }

  handlePageName() {
    if (this.state.paramNumbers < 1) {
      return <h1>Add a book</h1>;
    } else {
      return <h1>Edit book</h1>;
    }
  }

  handleSubmitBtn() {
    if (this.state.paramNumbers < 1) {
      return <button type="submit">Add Book</button>;
    } else {
      return <button type="submit">Edit Book</button>;
    }
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

    if (this.state.paramNumbers < 1) {
      axios.post("http://localhost:3000/books/new", book).then(res => res.data);
    } else {
      axios
        .put(
          "http://localhost:3000/books/edit/" + this.props.match.params.id,
          book
        )
        .then(res => console.log(res.data));
    }

    window.location = "/";
  }

  render() {
    return (
      <div>
        <div>{this.handlePageName()}</div>

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
              stylePanelAspectRatio=".1 / 1"
              imageResizeTargetWidth="100"
              imageResizeTargetHeight="150"
              onaddfile={(err, file) => {
                if (err) {
                  console.error(err);
                }
                console.log(file);

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
            <span>{this.cancelForm()}</span>
            <span>{this.handleSubmitBtn()}</span>
          </div>
        </form>
      </div>
    );
  }
}

export default HandleBook;
