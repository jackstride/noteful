import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const moment = require("moment");
const ResultLayout = React.memo(({ data, remove }) => {
  return (
    <div className="folder_item">
      <Link to={`/dashboard/notes/${data._id}`}>
        <div className="folder_item_container">
          <h3>{data.note_title}</h3>
          <h6>{moment(data.date).calendar()}</h6>
          <h6>{moment(data.date_modified).calendar()}</h6>
        </div>
      </Link>
      <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          remove(data._id);
        }}
      >
        <FontAwesomeIcon icon="trash" color="grey" size="1x"></FontAwesomeIcon>
      </span>
    </div>
  );
});

export default ResultLayout;
