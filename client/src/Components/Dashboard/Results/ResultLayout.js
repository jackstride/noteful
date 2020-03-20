import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import {} from "../../../actions/NoteActions";
import { showMenu } from "../../../actions/contextMenuActions";

const moment = require("moment");

const ResultLayout = React.memo(({ data, remove, showMenu }) => {
  let handleContext = e => {
    e.preventDefault();
    const { pageX, pageY } = e;
    showMenu(pageX, pageY, "NotesContextMenu", {
      name: e.target.name,
      id: e.target.id
    });
  };
  // const [size, setSize] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight
  // });

  // useEffect(() => {
  //   console.log(size);
  // }, [size]);

  return (
    <div className="folder_item">
      <Link to={`/dashboard/notes/${data._id}`}>
        <div className="folder_item_container">
          <h5>{data.note_title}</h5>
          <h5>{moment(data.date).calendar()}</h5>
          <h5>{moment(data.date_modified).calendar()}</h5>
          <div
            id={data._id}
            onContextMenu={e => handleContext(e)}
            className="absolute"
          ></div>
        </div>
      </Link>
      <span
        id={data._id}
        style={{ cursor: "pointer" }}
        onClick={e => {
          handleContext(e);
        }}
      >
        <FontAwesomeIcon
          style={{ pointerEvents: "none" }}
          id={data._id}
          onClick={e => handleContext(e)}
          icon="ellipsis-v"
          color="grey"
          size="1x"
        ></FontAwesomeIcon>
      </span>
    </div>
  );
});

const mapDispatchToProps = dispatch => ({
  showMenu: (x, y, getType, args) => dispatch(showMenu(x, y, getType, args))
});

export default connect(null, mapDispatchToProps)(ResultLayout);
