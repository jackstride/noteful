import React, { Fragment } from "react";
import { Link } from "react-router-dom";

let FolderItem = ({ data }) => {
  return (
    <Link to={`/dashboard/notes/${data._id}`}>
      <div className="folder_item_container">
        <h1>{data.date}</h1>
      </div>
    </Link>
  );
};

export default FolderItem;
