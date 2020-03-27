import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getNotes, addNote } from "../../../actions/NoteActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WidgetSubmit from "./widgetSubmit";

const Notes = ({ _id, getNotes, notes }) => {
  let [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("got");
    getNotes(_id);
  }, [_id]);

  return (
    <div className="widget">
      <div className="widget_header">
        <h4>Notes</h4>
        <div className="plus" onClick={e => this.openAddTask(e)}></div>
      </div>
      <div className="widget_content">
        {open ? (
          <WidgetSubmit
          // addFolder={this.props.addTask}
          // userid={this.props.userId}
          // toggle={this.props.toggleOpenTask}
          />
        ) : null}
        <ShowData data={notes} />
      </div>
    </div>
  );
};

const mapStatetoProps = state => {
  return {
    _id: state.auth.user._id,
    notes: state.note.noteData
  };
};

const mapDistpachToProps = () => dispatch => ({
  getNotes: _id => dispatch(getNotes(_id)),
  addNote: _id => dispatch(addNote(_id))
});

export default connect(mapStatetoProps, mapDistpachToProps)(Notes);

let ShowData = ({ data }) => {
  if (data) {
    return (
      <ul>
        {data.map((key, index) => (
          <div className="input_multiple" key={index}>
            <Link
              onContextMenu={e => this.onRightClicked(e)}
              id={key._id}
              name={key.folder_name}
              to={`/dashboard/folder/${key._id}`}
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
            <button
              onClick={e => this.onRemoveFolder(e, key._id)}
              value={key.folder_name}
            >
              <FontAwesomeIcon icon="trash" size="1x"></FontAwesomeIcon>
            </button>
          </div>
        ))}
      </ul>
    );
  }
};
