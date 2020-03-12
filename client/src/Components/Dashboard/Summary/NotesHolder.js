import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadTasks, toggleTask } from "../../../actions/taskActions";
import { getNotes } from "../../../actions/NoteActions";
import { getFolder } from "../../../actions/FolderActions";
import { showMenu } from "../../../actions/contextMenuActions";
const moment = require("moment");

let NotesHolder = ({ data, getFolder, id, showMenu, notes }) => {
  console.log(data);
  console.log(notes);
  let [folderName, setFolderName] = useState("");

  useEffect(() => {
    returnName();
  }, [data, notes]);

  let returnName = () => {
    let getFolderId = notes.folder_id;
    let name = data.filter(data => data._id === getFolderId);
    name = name[0].folder_name;
    setFolderName(name);
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
    <div className="summary_holder notes">
      <div className="summary_icon">
        <div className="circle notes">
          <span>{folderName[0] || "U"}</span>
        </div>
      </div>
      <div className="summary_text">
        <h6>{folderName}</h6>
        <h5>{notes.note_title}</h5>
        <h6>{moment(data.date).calendar()}</h6>
      </div>
      <Link
        id={notes._id}
        name={notes.note_title}
        onContextMenu={e => handleContext(e)}
        to={`/dashboard/notes/${notes._id}`}
      ></Link>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    id: state.auth.user._id,
    tasks: state.task.taskData
  };
};

const mapDispatchToProps = dispatch => ({
  loadTasks: id => dispatch(loadTasks(id)),
  getNotes: id => dispatch(getNotes(id)),
  getFolder: id => dispatch(getFolder(id)),
  toggleTask: id => dispatch(toggleTask(id)),
  showMenu: (x, y, getType, args) => dispatch(showMenu(x, y, getType, args))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesHolder);
