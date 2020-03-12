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

  const getTaskComplete = () => {
    let all = tasks.length;
    let numberOfComplete = tasks.filter(task => task.isCompleted === true);

    let percent = (numberOfComplete.length * 100) / all;
    return percent;
  };

  return (
    <div className="summary_container">
      <div className="summaries">
        <div className="summary_notes">
          <div className="summary_header">
            <h3>Recent Notes</h3>
          </div>
          <div className="summary_grid_rows">
            {notes.map((note, index) => {
              return <NotesHolder data={folder} notes={note} key={index} />;
            })}
          </div>
        </div>

        <div className="summary_tasks">
          <div className="summary_header">
            <h3> Tasks</h3>
          </div>
          <div className="summary_grid_rows">
            {tasks.map((tasks, index) => (
              <TaskHolder key={index} task={tasks} mark={toggleTask} />
            ))}
          </div>
          <div className="task_stats">{tasks ? getTaskComplete() : null}</div>
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
