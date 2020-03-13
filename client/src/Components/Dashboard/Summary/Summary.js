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
        <div className="summary_left">
          <div className="summary_notes">
            <div className="summary_header">
              <h2>Recent Notes</h2>
              <div className="summary_text notes">
                <h6>Note</h6>
                <h6>Folder</h6>
                <h6>Last editied</h6>
              </div>
            </div>
            <div className="summary_grid_rows">
              {notes.slice(0, 5).map((note, index) => {
                return <NotesHolder data={folder} notes={note} key={index} />;
              })}
            </div>
          </div>

          <div className="summary_tasks">
            <div className="summary_header">
              <h2> Tasks</h2>
            </div>
            <div className="summary_grid_rows">
              {tasks.map((tasks, index) => (
                <TaskHolder key={index} task={tasks} mark={toggleTask} />
              ))}
            </div>
          </div>
        </div>
        <div className="summary_right">
          <div className="task_stats">
            <div className="stats_header">
              <h2>Stats</h2>
            </div>
            <div className="stats_content">
              <div className="stats">
                <span>Tasks Completed</span>
                {tasks ? Math.ceil(getTaskComplete()) + "%" : null}
              </div>
              <div className="stats">
                <span>Task Count</span>
                {tasks ? tasks.length : null}
              </div>
              <div className="stats">
                <span>Number of Notes</span>
                {notes ? notes.length : null}
              </div>
            </div>
          </div>
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
