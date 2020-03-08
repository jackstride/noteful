import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { isSuccess, handleClose } from "../../actions/ResponseActions";
import { addNote, removeNote, editNote } from "../../actions/NoteActions";
import { Link } from "react-router-dom";
const NotesContextMenu = ({
  isSuccess,
  handleClose,
  addNote,
  removeNote,
  user_id,
  id
}) => {
  let handleSuccess = () => {
    isSuccess();
  };

  const handleAddNote = () => {};
  const handleRenameNote = () => {};
  const handleDeleteNote = () => {
    removeNote(id);
  };

  return (
    <ul>
      <li onClick={() => handleSuccess()}>Add New Note</li>
      <Link to={`/dashboard/notes/${id}`}>Edit Note</Link>
      <li onClick={() => handleClose()}>Rename Note</li>
      <li onClick={() => handleDeleteNote(id)}>Delete Note</li>
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    user_id: state.auth.user._id,
    id: state.contextMenu.menuArgs.id
  };
};

const mapDispatchToProps = dispatch => ({
  isSuccess: () => dispatch(isSuccess()),
  handleClose: () => dispatch(handleClose()),
  addNote: values => dispatch(addNote(values)),
  removeNote: id => dispatch(removeNote(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesContextMenu);