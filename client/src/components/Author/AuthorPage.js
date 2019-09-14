import React, { Component } from "react";
import Link from "react-router-dom";

class AuthorPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Author Page</h1>
        <div>Name: </div>
        &nbsp;
        <button>Delete</button>
        <div>Books by Author: </div>
        {/* TODO: Loop through books */}
      </div>
    );
  }
}

export default AuthorPage;
