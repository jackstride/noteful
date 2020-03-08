import React, { useEffect, useState, useCallback, useRef } from "react";
import { connect } from "react-redux";
import { getNotes, addNote, removeNote } from "../../../actions/NoteActions";
import { withRouter, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontawesome";

const moment = require("moment");

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
          <FolderItem key={index} data={notes} />
        ))}
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
  removeNote: id => dispatch(removeNote(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notes));

let FolderItem = React.memo(({ data, remove }) => {
  return (
    <div className="folder_item">
      <Link to={`/dashboard/notes/${data._id}`}>
        <div className="folder_item_container">
          <h3>{data.note_title}</h3>
          <h6>{moment(data.date).calendar()}</h6>
          <h6>{moment(data.date_modified).calendar()}</h6>
        </div>
      </Link>
      <span style={{ cursor: "pointer" }}>
        <FontAwesomeIcon icon="trash" color="grey" size="1x"></FontAwesomeIcon>
      </span>
    </div>
  );
});