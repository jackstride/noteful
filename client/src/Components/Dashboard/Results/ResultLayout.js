import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import {} from "../../../actions/NoteActions";
import { showMenu, hideMenu } from "../../../actions/contextMenuActions";

const moment = require("moment");

const ResultLayout = React.memo(({ data, remove, showMenu, getData }) => {
  let handleContext = e => {
    e.preventDefault();
    const { pageX, pageY } = e;
    showMenu(pageX, pageY, "NotesContextMenu", {
      name: e.target.name,
      id: e.target.id
    });
  };

  useEffect(() => {
    console.log("hello");
    if (getData) {
      getData();
    }
  }, [data.folder_id]);

  return (
    <div style={{}} className="folder_item">
      <Link to={`/dashboard/notes/${data._id}`}>
        <div className="folder_item_container">
          <h5 style={{ marginLeft: "5px" }}>{data.note_title}</h5>
          <h5>{moment(data.date).calendar()}</h5>
          <h5>{moment(data.date_modified).calendar()}</h5>
        </div>
        <div
          id={data._id}
          onContextMenu={e => handleContext(e)}
          className="absolute"
        ></div>
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

const mapDispatchToProps = dispatch => ({
  showMenu: (x, y, getType, args) => dispatch(showMenu(x, y, getType, args))
});

export default connect(null, mapDispatchToProps)(ResultLayout);
