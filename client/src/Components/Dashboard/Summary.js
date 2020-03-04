import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadTasks } from "../../actions/taskActions";
import { getNotes } from "../../actions/NoteActions";

let Summary = ({ id, notes, tasks, loadTasks, getNotes }) => {
  useEffect(() => {
    loadTasks(id);
    getNotes(id);
  }, [id]);
  return (
    <div className="summary_container">
      <div className="summary_notes">
        {notes.map(notes => (
          <SummaryHolder notes={notes} />
        ))}
      </div>
      <div className="summary_tasks"></div>
      <div className="summary_event"></div>
    </div>
  );
};

let SummaryHolder = ({ notes }) => {
  return (
    <div style={{ backgroundColor: "blue" }} className="summary_holder">
      {<h5>{notes.folder_id}</h5>}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    id: state.auth.user._id,
    notes: state.note.noteData,
    tasks: state.task.taskData
  };
};

const mapDispatchToProps = dispatch => ({
  loadTasks: id => dispatch(loadTasks(id)),
  getNotes: id => dispatch(getNotes(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
