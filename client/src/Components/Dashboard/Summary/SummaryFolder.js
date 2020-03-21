import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadTasks, toggleTask } from "../../../actions/taskActions";
import { getNotes } from "../../../actions/NoteActions";
import { getFolder } from "../../../actions/FolderActions";
import { showMenu } from "../../../actions/contextMenuActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const moment = require("moment");

const SummaryFolder = ({ data, id, tasks, showMenu, notes }) => {
  let handleContextMenu = e => {
    console.log(e.target);
    e.preventDefault();
    const { pageX, pageY } = e;
    showMenu(pageX, pageY, "FoldersContextMenu", {
      name: e.target.name,
      id: e.target.id
    });
  };
  return (
    <div className="s_f_holder">
      {data.map((data, i) => {
        let noteData = notes.filter(notes => notes.folder_id == data._id);
        return (
          <Link
            key={i}
            name={data.folder_name}
            id={data._id}
            onContextMenu={e => handleContextMenu(e)}
            to={`/dashboard/folder/${data._id}`}
          >
            <Item key={i} data={data} noteData={noteData} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SummaryFolder);

const Item = ({ data, noteData }) => {
  return (
    <div name={data.folder_name} id={data._id} className="s_f_item">
      <div>
        <FontAwesomeIcon
          icon="folder"
          color="#4c6ef5"
          size="3x"
        ></FontAwesomeIcon>
        <h3>{data.folder_name}</h3>
      </div>
      <div className="circle_count">
        {noteData.slice(0, 3).map((data, i) => (
          <Circle key={i} />
        ))}
        <h4>+ {noteData.length}</h4>
      </div>
    </div>
  );
};

const Circle = () => {
  return <div className="s_f_circle"></div>;
};
