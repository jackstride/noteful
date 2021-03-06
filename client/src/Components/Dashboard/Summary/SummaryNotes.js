import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadTasks, toggleTask } from "../../../actions/taskActions";
import { getNotes } from "../../../actions/NoteActions";
import { getFolder } from "../../../actions/FolderActions";
import { showMenu } from "../../../actions/contextMenuActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LazyLoading from "../LazyLoading";
const moment = require("moment");

let NotesHolder = ({ folder, showMenu, notes }) => {
  let handleContext = (e) => {
    e.preventDefault();
    const { pageX, pageY } = e;
    console.log(e.target);
    showMenu(
      pageX,
      pageY,
      "NotesContextMenu",
      {
        name: e.target.name,
        id: e.target.id,
      },
      "notes"
    );
  };

  return (
    <div className="s_f_head">
      <div className="s_f_header">
        <div></div>
        <h6>Title</h6>
        <h6>Folder Name</h6>
        <h6> Last Edited</h6>
      </div>
      <div className="s_f_holder">
        {notes.map((data, i) => {
          return data ? (
            <Link
              key={i}
              id={data._id}
              onContextMenu={(e) => handleContext(e)}
              to={`/dashboard/notes/${data._id}`}
            >
              <Item
                context={(e) => handleContext(e)}
                data={data}
                folder={folder}
              />
            </Link>
          ) : (
            <LazyLoading />
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    id: state.auth.user._id,
    tasks: state.task.taskData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadTasks: (id) => dispatch(loadTasks(id)),
  getNotes: (id) => dispatch(getNotes(id)),
  getFolder: (id) => dispatch(getFolder(id)),
  toggleTask: (id) => dispatch(toggleTask(id)),
  showMenu: (x, y, getType, args) => dispatch(showMenu(x, y, getType, args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesHolder);

const Item = ({ data, folder, context }) => {
  let [folderName, setFolderName] = useState("");

  useEffect(() => {
    returnName();
  }, [folder, data]);

  let returnName = () => {
    let getFolderId = data.folder_id;
    let name = folder.filter((data) => data._id === getFolderId);

    if (!name.length) {
      name = "Untitled";
    } else {
      name = name[0].folder_name;
    }
    setFolderName(name);
  };

  return (
    <div name={data.note_title} id={data._id} className="s_n_item shadow">
      <div className="note_icon">
        <h6>{data.note_title[0]}</h6>
      </div>
      <div className="title">
        <h3>{data.note_title}</h3>
      </div>
      <h3>{folderName}</h3>
      <h3>{moment(data.date).calendar()}</h3>
      <div id={data._id} onClick={context} className="edit">
        <FontAwesomeIcon icon="ellipsis-v" color="white" />
      </div>
    </div>
  );
};
