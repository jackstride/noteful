import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showMenu } from "../../../actions/contextMenuActions";

const ShowResult = ({ data, folder, showMenu }) => {
  let [folderName, setName] = useState([]);

  useEffect(() => {
    returnName();
  }, [data, folder]);

  let returnName = () => {
    let folderId = data.folder_id;
    let name = folder.filter(data => data._id === folderId);
    if (!name.length) {
      name = "Untitled";
    } else {
      name = name[0].folder_name;
    }

    setName(name);
  };

  let handleContext = e => {
    e.preventDefault();
    const { pageX, pageY } = e;
    showMenu(pageX, pageY, "NotesContextMenu", {
      name: e.target.name,
      id: e.target.id
    });
  };

  return (
    <div className="result_holder">
      <Link to={`/dashboard/notes/${data._id}`}>
        <FontAwesomeIcon icon="sticky-note" />
        <h5>
          {data.note_title
            .split(" ")
            .slice(0, 2)
            .join(" ")}
        </h5>
      </Link>
      <div
        id={data._id}
        onClick={e => handleContext(e)}
        className="search_context"
      >
        <FontAwesomeIcon icon="ellipsis-v" />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  showMenu: (x, y, getType, args) => dispatch(showMenu(x, y, getType, args))
});

export default connect(null, mapDispatchToProps)(ShowResult);
