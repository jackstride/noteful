import React, { useState } from "react";
import { connect } from "react-redux";
import { isSuccess, handleClose } from "../../actions/ResponseActions";
import { addNote, removeNote, editNote } from "../../actions/NoteActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { showMenu } from "../../actions/contextMenuActions";
import { CHANGE_FOLDER } from "../../actions/types";
const NotesContextMenu = ({
  isSuccess,
  removeNote,
  id,
  AllFolders,
  editNote,
  x,
  y,
  showMenu,
  name
}) => {
  const [toggleFolders, showFolders] = useState(false);
  const [toggleAdd, showAdd] = useState(false);

  let handleAdd = e => {
    showMenu(
      x,
      y,
      "EditContextMenu",
      {
        name,
        id: e.target.id
      },
      "addnote"
    );
  };

  const handleDeleteNote = id => {
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
    editNote(values, CHANGE_FOLDER);
  };

  let handleEdit = e => {
    showMenu(
      x,
      y,
      "EditContextMenu",
      {
        name,
        id
      },
      "notes"
    );
  };

  return (
    <ul
      onMouseLeave={() => {
        showAdd(false);
      }}
    >
      <span>
        <FontAwesomeIcon size="xs" icon="plus"></FontAwesomeIcon>
        <li
          onMouseOver={() => {
            showAdd(true);
          }}
        >
          Add
        </li>
      </span>
      <span>
        <FontAwesomeIcon size="xs" icon="pencil-alt"></FontAwesomeIcon>
        <li>
          <Link to={`/dashboard/notes/${id}`}></Link>
          Edit
        </li>
      </span>
      <span>
        <FontAwesomeIcon size="xs" icon="keyboard"></FontAwesomeIcon>
        <li onClick={() => handleEdit()}>Rename</li>
      </span>
      <span>
        <FontAwesomeIcon size="xs" icon="trash"></FontAwesomeIcon>
        <li onClick={() => handleDeleteNote(id)}>Delete</li>
      </span>
      <span>
        <FontAwesomeIcon size="xs" icon="exchange-alt"></FontAwesomeIcon>
        <li onClick={() => handleChangFolder(id)}>Change folder</li>
      </span>
      {toggleFolders && (
        <div className="show_change_folders">
          <ul>
            {AllFolders.map((folder, index) => (
              <li
                key={index}
                id={folder._id}
                onClick={e => handleSubmitFolderChange(e)}
              >
                {folder.folder_name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {toggleAdd ? (
        <div className="toggle_add_folder">
          {AllFolders.map((folder, index) => (
            <li key={index} id={folder._id} onClick={e => handleAdd(e)}>
              {folder.folder_name}
            </li>
          ))}
        </div>
      ) : null}
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    user_id: state.auth.user._id,
    name: state.contextMenu.menuArgs.name,
    id: state.contextMenu.menuArgs.id,
    AllFolders: state.folder.data,
    x: state.contextMenu.location.x,
    y: state.contextMenu.location.y
  };
};

const mapDispatchToProps = dispatch => ({
  isSuccess: () => dispatch(isSuccess()),
  handleClose: () => dispatch(handleClose()),
  addNote: values => dispatch(addNote(values)),
  removeNote: id => dispatch(removeNote(id)),
  editNote: (values, type) => dispatch(editNote(values, type)),
  showMenu: (x, y, getType, args, name) =>
    dispatch(showMenu(x, y, getType, args, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesContextMenu);
