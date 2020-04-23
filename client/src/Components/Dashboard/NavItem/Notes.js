import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getNotes,
  addNote,
  removeNote,
  toggleNoteOpen
} from "../../../actions/NoteActions";
import { showMenu, hideMenu } from "../../../actions/contextMenuActions";
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
  toggle,
  showMenu,
  hideMenu
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

  let onRightClicked = e => {
    e.preventDefault();
    const { pageX, pageY } = e;
    showMenu(pageX, pageY, "NotesContextMenu", {
      name: e.target.name,
      id: e.target.id
    });
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
        <ShowData
          toggleMenu={e => onRightClicked(e)}
          toggle={toggle}
          remove={removeNote}
          data={notes}
        />
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
  toggleNoteOpen: () => dispatch(toggleNoteOpen()),
  showMenu: (x, y, getType, args, name) =>
    dispatch(showMenu(x, y, getType, args, name))
});

export default connect(mapStatetoProps, mapDistpachToProps)(Notes);

let ShowData = ({ data, remove, toggle, toggleMenu }) => {
  if (data) {
    return (
      <ul>
        {data.map((key, index) => (
          <div className="input_multiple" key={index}>
            <FontAwesomeIcon
                color={key.folder_color}
                icon="sticky-note"
                size="1x"
              ></FontAwesomeIcon>
            <Link
              onClick={toggle}
              onContextMenu={toggleMenu}
              id={key._id}
              name={key.folder_name}
              to={`/dashboard/notes/${key._id}`}
            >
              {key.note_title}
            </Link>
            <button id={key._id} onClick={toggleMenu} value={key.folder_name}>
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
