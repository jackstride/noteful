import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadTasks, toggleTask } from "../../../actions/taskActions";
import { getNotes } from "../../../actions/NoteActions";
import { getFolder } from "../../../actions/FolderActions";
import { showMenu, hideMenu } from "../../../actions/contextMenuActions";
const moment = require("moment");

let NotesHolder = ({ data, folder, getFolder, id, showMenu }) => {
  let [folderName, setFolderName] = useState("");

  useEffect(() => {
    getFolder(id);
  }, [id]);

  useEffect(() => {
    returnName();
  }, [data]);

  let returnName = () => {
    let noteFolderId = data.folder_id;
    let name = folder.filter(data => data._id == noteFolderId);
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
          <span>{folderName[0]}</span>
        </div>
      </div>
      <div className="summary_text">
        <h6>{folderName}</h6>
        <h5>{data.note_title}</h5>
        <h6>{moment(data.date).calendar()}</h6>
      </div>
      <Link
        id={data._id}
        name={data.note_title}
        onContextMenu={e => handleContext(e)}
        to={`/dashboard/notes/${data._id}`}
      ></Link>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    id: state.auth.user._id,
    tasks: state.task.taskData,
    folder: state.folder.data
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
