import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getNotes } from "../../../actions/NoteActions";
import { withRouter, Link } from "react-router-dom";
import FolderItem from "./FolderItem";

let Folders = ({ getNotes, match, notes }) => {
  const id = match.params.folder;
  const [folderId, setFolderId] = useState();
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    getNotes(id);
    return () => {
      console.log("hello");
    };
  }, [id]);

  return (
    <div>
      <h2 style={{ textAlign: "left" }}>Folders</h2>
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
  getNotes: id => dispatch(getNotes(id))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Folders)
);
