import React from "react";
import { connect } from "react-redux";
import { getNotes, addNote, removeNote } from "../../../actions/NoteActions";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontawesome";
import { showMenu } from "../../../actions/contextMenuActions";

import ResultLayout from "./ResultLayout";

let Notes = ({ results }) => {
  console.log(results);
  return (
    <div className="folder_page">
      <div className="folder_page_container">
        <div className="folders_heading">
          <h2>Results</h2>
        </div>
        <div className="results_count">
          <h4>Results Found</h4>
          <h3>{results.length}</h3>
        </div>
        <div className="folder_container">
          <div className="folder_item">
            <div className="folder_table_heading">
              <h6>Name</h6>
              <h6>Date Created:</h6>
              <h6>Date Modified:</h6>
            </div>
          </div>
          {results.map((notes, index) => (
            <ResultLayout key={index} data={notes} />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user_id: state.auth.user._id,
    notes: state.note.noteData,
    folder: state.folder.data
  };
};

const mapDispatchToProps = dispatch => ({
  getNotes: id => dispatch(getNotes(id)),
  addNote: values => dispatch(addNote(values)),
  removeNote: id => dispatch(removeNote(id)),
  showMenu: (x, y, getType, args) => dispatch(showMenu(x, y, getType, args))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notes));
