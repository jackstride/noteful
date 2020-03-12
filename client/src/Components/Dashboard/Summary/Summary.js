import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadTasks, toggleTask } from "../../../actions/taskActions";
import { getNotes } from "../../../actions/NoteActions";
import { getFolder } from "../../../actions/FolderActions";
import NotesHolder from "../Summary/NotesHolder";
import TaskHolder from "../Summary/TaskHolder";

let Summary = ({
  id,
  notes,
  tasks,
  loadTasks,
  getNotes,
  toggleTask,
  folder
}) => {
  let [data, setData] = useState();

  useEffect(() => {
    loadTasks(id);
    getNotes(id);
    getFolder(id);
    setData(folder);
  }, [id]);

  return (
    <div className="summary_container">
      <div className="summaries">
        <div className="summary_notes">
          <div className="summary_heading">
            <h4> Notes</h4>
          </div>
          {notes.map((note, index) => {
            if (data) {
              return <NotesHolder data={data} notes={note} key={index} />;
            } else {
              return null;
            }
          })}
        </div>
        <div className="summary_tasks">
          <div className="summary_heading">
            <h4> Tasks</h4>
          </div>
          {tasks.map((tasks, index) => (
            <TaskHolder key={index} task={tasks} mark={toggleTask} />
          ))}
        </div>
        <div className="summary_tasks">
          <div className="summary_heading">
            <h4> Events</h4>
          </div>
          {tasks.map((tasks, index) => (
            <TaskHolder key={index} task={tasks} />
          ))}
        </div>
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
