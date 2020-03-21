import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadTasks, toggleTask } from "../../../actions/taskActions";
import { getNotes } from "../../../actions/NoteActions";
import { getFolder } from "../../../actions/FolderActions";
import { showMenu } from "../../../actions/contextMenuActions";
const moment = require("moment");

let NotesHolder = ({ folder, showMenu, notes }) => {
  let handleContext = e => {
    e.preventDefault();
    const { pageX, pageY } = e;
    showMenu(
      pageX,
      pageY,
      "NotesContextMenu",
      {
        name: e.target.name,
        id: e.target.id
      },
      "notes"
    );
  };

  return (
    <div className="s_f_holder">
      {notes.map((data, i) => {
        return (
          <Link
            onContextMenu={e => handleContext(e)}
            to={`/dashboard/notes/${data._id}`}
          >
            <Item data={data} folder={folder} />
          </Link>
        );
      })}
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

const Item = ({ data, folder }) => {
  let [folderName, setFolderName] = useState("");

  useEffect(() => {
    returnName();
  }, [folder, data]);

  let returnName = () => {
    let getFolderId = data.folder_id;
    let name = folder.filter(data => data._id === getFolderId);
    if (name) {
      name = name[0].folder_name;
    }
    setFolderName(name);
  };

  return (
    <div name={data.note_title} id={data._id} className="s_f_item">
      <div className="title">
        <h3>{data.note_title}</h3>
        <span>
          <h6>Last Edited:</h6>
          <h5>{moment(data.date).calendar()}</h5>
        </span>
      </div>
      <h5>{folderName}</h5>
    </div>
  );
};
