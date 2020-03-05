import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadTasks, toggleTask } from "../../actions/taskActions";
import { getNotes } from "../../actions/NoteActions";
import { getFolder } from "../../actions/FolderActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../fontawesome";
import { get } from "mongoose";
const moment = require("moment");

let Summary = ({
  id,
  notes,
  tasks,
  loadTasks,
  getNotes,
  folder,
  toggleTask
}) => {
  useEffect(() => {
    loadTasks(id);
    getNotes(id);
    getFolder(id);
  }, [id]);
  return (
    <div className="summary_container">
      <div className="summary_heading">
        <h4> Notes</h4>
      </div>
      <div className="summary_heading">
        <h4> Tasks</h4>
      </div>
      <div className="summary_heading">
        <h4> Events</h4>
      </div>
      <div className="summary_notes">
        {notes.map(notes => (
          <NotesHolder notes={notes} folder={folder} />
        ))}
      </div>
      <div className="summary_tasks">
        {tasks.map(tasks => (
          <TasksHolder task={tasks} mark={toggleTask} />
        ))}
      </div>
      <div className="summary_tasks">
        {tasks.map(tasks => (
          <TasksHolder task={tasks} />
        ))}
      </div>
    </div>
  );
};

let NotesHolder = ({ notes, folder }) => {
  let getFoldername = () => {
    let noteFolderId = notes.folder_id;
    let name = folder.filter(folder => folder._id === noteFolderId);
    return name[0].folder_name;
  };

  return (
    <div className="summary_holder notes">
      <div className="summary_icon">
        <div className="circle notes">
          <span>{getFoldername()[0]}</span>
        </div>
      </div>
      <div className="summary_text">
        <h6>{getFoldername()}</h6>
        <h5>{notes.note_title}</h5>
        <h5>{moment(notes.date).calendar()}</h5>
      </div>
    </div>
  );
};

let TasksHolder = ({ task, mark }) => {
  let [complete, setComplete] = useState(task.isCompleted);

  useEffect(() => {
    setComplete(task.isCompleted);
  });

  return (
    <div
      onClick={() => {
        mark(task._id);
      }}
      className="summary_holder tasks"
    >
      <div className="summary_icon">
        <div
          style={
            complete
              ? { backgroundColor: "rgba(133,255,0,0.50)" }
              : { backgroundColor: "#ECECEC" }
          }
          className="circle tasks"
        >
          {complete ? (
            <FontAwesomeIcon
              icon="check"
              color="#85FF00"
              size="2x"
            ></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon
              icon="times"
              color="white"
              size="2x"
            ></FontAwesomeIcon>
          )}
        </div>
      </div>
      <div className="summary_text">
        <h6>{task.isCompleted ? "Completed" : "Not Completed"}</h6>
        <h5>{task.task_name}</h5>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
