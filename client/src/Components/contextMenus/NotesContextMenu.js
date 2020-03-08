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
  id,
  AllFolders,
  editNote
}) => {
  const [toggleFolders, showFolders] = useState(false);

  let handleSuccess = () => {
    isSuccess();
  };

  const handleDeleteNote = () => {
    removeNote(id);
  };

  const handleChangFolder = () => {
    showFolders(!toggleFolders);
  };

  let handleSubmitFolderChange = e => {
    let folder_id = e.target.getAttribute("id");
    let values = {
      _id: id,
      folder_id: folder_id
    };
    editNote(values);
  };

  return (
    <ul>
      <li onClick={() => handleSuccess()}>Add New Note</li>
      <Link to={`/dashboard/notes/${id}`}>Edit Note</Link>
      <li onClick={() => handleClose()}>Rename Note</li>
      <li onClick={() => handleDeleteNote(id)}>Delete Note</li>
      <li onClick={() => handleChangFolder(id)}>ChangeFolder</li>
      {toggleFolders && (
        <div className="show_change_folders">
          <ul>
            {AllFolders.map(folder => (
              <li id={folder._id} onClick={e => handleSubmitFolderChange(e)}>
                {folder.folder_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    user_id: state.auth.user._id,
    id: state.contextMenu.menuArgs.id,
    AllFolders: state.folder.data
  };
};

const mapDispatchToProps = dispatch => ({
  isSuccess: () => dispatch(isSuccess()),
  handleClose: () => dispatch(handleClose()),
  addNote: values => dispatch(addNote(values)),
  removeNote: id => dispatch(removeNote(id)),
  editNote: values => dispatch(editNote(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesContextMenu);
