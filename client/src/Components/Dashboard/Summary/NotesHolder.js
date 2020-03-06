import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadTasks, toggleTask } from "../../../actions/taskActions";
import { getNotes } from "../../../actions/NoteActions";
import { getFolder } from "../../../actions/FolderActions";
const moment = require("moment");

let NotesHolder = ({ data, notes, folder, getFolder, id }) => {
  let [folderName, setFolderName] = useState("");

  useEffect(() => {
    getFolder(id);
    returnName();
  }, [id]);

  let returnName = () => {
    let noteFolderId = data.folder_id;
    let name = folder.filter(data => data._id == noteFolderId);
    name = name[0].folder_name;
    setFolderName(name);
  };

  console.log(folderName);
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
        <h6>{moment(notes.date).calendar()}</h6>
      </div>
      <Link to={`/dashboard/notes/${data._id}`}></Link>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    id: state.auth.user._id,
    notes: state.note.noteData,
    tasks: state.task.taskData,
    folder: state.folder.data
  };
};

const mapDispatchToProps = dispatch => ({
  loadTasks: id => dispatch(loadTasks(id)),
  getNotes: id => dispatch(getNotes(id)),
  getFolder: id => dispatch(getFolder(id)),
  toggleTask: id => dispatch(toggleTask(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesHolder);
