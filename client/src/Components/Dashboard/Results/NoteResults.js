import React from "react";
import { connect } from "react-redux";
import { getNotes, addNote, removeNote } from "../../../actions/NoteActions";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontawesome";
import { showMenu } from "../../../actions/contextMenuActions";

import ResultLayout from "./ResultLayout";

let Notes = ({
  getNotes,
  match,
  notes,
  addNote,
  user_id,
  folder,
  removeNote,
  results
}) => {
  return (
    <div className="folder_page">
      <div className="folder_page_container">
        <div className="folders_heading">
          <span className="add_folder">
            <FontAwesomeIcon icon="plus" size="xs"></FontAwesomeIcon>
          </span>
        </div>

        <div className="folder_container">
          <div className="folder_item">
            <div className="folder_item_container">
              <span></span>
              <h5>Date Created:</h5>
              <h5>Date Modified:</h5>
            </div>
            <h5> Delete </h5>
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
