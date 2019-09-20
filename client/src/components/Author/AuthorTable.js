import React from "react";
import { Link } from "react-router-dom";

const AuthorTable = props => (
  <tr>
    <td>{props.author.name}</td>

    <td>
      <Link to={"/authors/" + props.author._id} className="btn deep-purple">
        View
      </Link>
      &nbsp;
      <Link to={"/authors/edit/" + props.author._id} className="btn black">
        Edit
      </Link>
      &nbsp;
      <button
        onClick={() => props.deleteAuthor(props.author._id)}
        className="btn red lighten-2"
      >
        Delete
      </button>
    </td>
  </tr>
);

export default AuthorTable;
