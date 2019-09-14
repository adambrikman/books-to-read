import React from "react";
import { Link } from "react-router-dom";

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

export default AuthorTable;
