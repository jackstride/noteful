import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getNotes,
  addNote,
  removeNote,
  toggleNoteOpen
} from "../../../actions/NoteActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WidgetSubmit from "./widgetSubmit";

const Notes = ({
  _id,
  getNotes,
  notes,
  addNote,
  removeNote,
  toggleNoteOpen,
  isOpen,
  toggle
}) => {
  useEffect(() => {
    getNotes(_id);
  }, [_id]);

  let openNote = e => {
    toggleNoteOpen();
  };

  let handleAddNote = () => {
    addNote();
  };

  return (
    <div className="widget">
      <div className="widget_header">
        <h4>Notes</h4>
        <div className="plus" onClick={e => openNote(e)}></div>
      </div>
      <div className="widget_content">
        {isOpen ? (
          <WidgetSubmit
            addFolder={addNote}
            userid={_id}
            toggle={() => toggleNoteOpen()}
            values={{ user_id: "hello", note_title: "hello" }}
          />
        ) : null}
        <ShowData toggle={toggle} remove={removeNote} data={notes} />
      </div>
    </div>
  );
};

const mapStatetoProps = state => {
  return {
    _id: state.auth.user._id,
    notes: state.note.noteData,
    isOpen: state.note.isOpen
  };
};

const mapDistpachToProps = () => dispatch => ({
  getNotes: _id => dispatch(getNotes(_id)),
  addNote: values => dispatch(addNote(values)),
  removeNote: id => dispatch(removeNote(id)),
  toggleNoteOpen: () => dispatch(toggleNoteOpen())
});

export default connect(mapStatetoProps, mapDistpachToProps)(Notes);

let ShowData = ({ data, remove, toggle }) => {
  if (data) {
    return (
      <ul>
        {data.map((key, index) => (
          <div className="input_multiple" key={index}>
            <Link
              onClick={toggle}
              onContextMenu={e => this.onRightClicked(e)}
              id={key._id}
              name={key.folder_name}
              to={`/dashboard/notes/${key._id}`}
            >
              {key.note_title}
            </Link>
            <button
              id={key._id}
              onClick={e => this.onRightClicked(e)}
              value={key.folder_name}
            >
              <FontAwesomeIcon icon="ellipsis-v" size="1x"></FontAwesomeIcon>
            </button>
            <button onClick={e => remove(key._id)} value={key.folder_name}>
              <FontAwesomeIcon icon="trash" size="1x"></FontAwesomeIcon>
            </button>
          </div>
        ))}
      </ul>
    );
  }
};
