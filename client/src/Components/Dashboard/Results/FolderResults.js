import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { getNotes, addNote, removeNote } from "../../../actions/NoteActions";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontawesome";
import ResultLayout from "./ResultLayout";

let Folders = ({
  getNotes,
  match,
  notes,
  addNote,
  user_id,
  folder,
  removeNote
}) => {
  const paramId = match.params.folder;

  useEffect(() => {
    getNotes(paramId);
  }, [paramId]);

  const handleRemoveNote = _id => {
    removeNote(_id);
  };

  const handleRemove = useCallback(_id => {
    handleRemoveNote(_id);
  }, []);

  let handleAddNote = () => {
    let values = {
      user_id,
      folder_id: paramId
    };
    addNote(values);
  };

  useEffect(() => {
    getFolderName();
  }, [folder]);

  let getFolderName = () => {
    let name = folder.filter(folder => paramId === folder._id);
    name = name[0].folder_name;
    return name;
  };

  return (
    <div className="folder_page">
      <div className="folders_heading">
        <h2>{getFolderName() || "E"}</h2>
        <span
          className="add_folder"
          onClick={() => {
            handleAddNote();
          }}
        >
          <FontAwesomeIcon icon="plus" size="xs"></FontAwesomeIcon>
        </span>
      </div>

      <div className="folder_container">
        <div className="folder_item">
          <div className="folder_item_container">
            <span>Name</span>
            <h5>Date Created:</h5>
            <h5>Date Modified:</h5>
          </div>
          <h5> Delete </h5>
        </div>
        {notes.length >= 1 ? (
          notes.map((notes, index) => {
            if (notes.folder_id == paramId) {
              return (
                <ResultLayout key={index} data={notes} remove={handleRemove} />
              );
            }
          })
        ) : (
          <h1> Hello </h1>
        )}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Folders)
);
