import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { isSuccess, handleClose } from "../../actions/ResponseActions";
import { addNote, removeNote, editNote } from "../../actions/NoteActions";
const NotesContextMenu = ({
  isSuccess,
  handleClose,
  addNote,
  removeNote,
  user_id
}) => {
  let handleSuccess = () => {
    console.log("yes");
    isSuccess();
  };

  const handleAddNote = () => {};
  const handleEditNote = () => {};
  const handleRenameNote = () => {};
  const handleDeleteNote = () => {};

  return (
    <ul>
      <li onClick={() => handleSuccess()}>Add New Note</li>
      <li onClick={() => handleSuccess()}>Edit Note</li>
      <li onClick={() => handleClose()}>Rename Note</li>
      <li onClick={() => handleClose()}>Delete Note</li>
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    user_id: state.auth.user._id
  };
};

const mapDispatchToProps = dispatch => ({
  isSuccess: () => dispatch(isSuccess()),
  handleClose: () => dispatch(handleClose()),
  addNote: values => dispatch(addNote(values)),
  rmeoveNote: id => dispatch(removeNote(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesContextMenu);
