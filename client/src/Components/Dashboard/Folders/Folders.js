import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getNotes, addNote } from "../../../actions/NoteActions";
import { withRouter, Link } from "react-router-dom";
import FolderItem from "./FolderItem";

let Folders = ({ getNotes, match, notes, addNote }) => {
  const id = match.params.folder;
  const [folderId, setFolderId] = useState();
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    getNotes(id);
  }, [id]);

  return (
    <div className="folder_page">
      <div className="folders_heading">
        <h3 style={{ textAlign: "left" }}>Folders</h3>
        <span className="add_folder" onClick={addNote()}>
          {" "}
          Add note
        </span>
      </div>

      <div className="folder_container">
        {notes.length >= 1 ? (
          notes.map(notes => <FolderItem data={notes} />)
        ) : (
          <h1> Hello </h1>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    id: state.auth.user._id,
    notes: state.note.noteData
  };
};

const mapDispatchToProps = dispatch => ({
  getNotes: id => dispatch(getNotes(id)),
  addNote: id => dispatch(addNote)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Folders)
);
