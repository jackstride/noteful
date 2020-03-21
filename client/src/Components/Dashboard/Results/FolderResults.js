import React, { useEffect, useCallback, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getNotes, addNote, removeNote } from "../../../actions/NoteActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showMenu } from "../../../actions/contextMenuActions";
import "../../../fontawesome";
const moment = require("moment");

let Folders = ({
  getNotes,
  match,
  notes,
  addNote,
  user_id,
  folder,
  removeNote,
  showMenu
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

  let handleContext = e => {
    e.preventDefault();
    const { pageX, pageY } = e;

    showMenu(
      pageX,
      pageY,
      "NotesContextMenu",
      {
        name: e.target.name,
        id: e.target.id
      },
      "notes"
    );
  };

  return (
    <div className="inner_app_container">
      <div className="folder_page_container">
        <div className="folders_heading">
          <h1>{getFolderName() || "E"}</h1>
          <span
            className="add_folder"
            onClick={() => {
              handleAddNote();
            }}
          >
            <FontAwesomeIcon icon="plus" size="xs"></FontAwesomeIcon>
          </span>
        </div>

        <div className="s_f_holder">
          <div className="s_f_header">
            <div></div>
            <h6>Title</h6>
            <h6> Last Edited</h6>
            <h6>Folder Name</h6>
          </div>
          {notes.map((data, i) => {
            return (
              <Link
                key={i}
                id={data._id}
                onContextMenu={e => handleContext(e)}
                to={`/dashboard/notes/${data._id}`}
              >
                <Item
                  paramId={paramId}
                  context={e => handleContext(e)}
                  data={data}
                  folder={folder}
                />
              </Link>
            );
          })}
        </div>
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
  removeNote: id => dispatch(removeNote(id)),
  showMenu: (x, y, getType, args) => dispatch(showMenu(x, y, getType, args))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Folders)
);

const Item = ({ data, folder, context, paramId }) => {
  let [folderName, setFolderName] = useState("");

  useEffect(() => {
    returnName();
  }, [folder, data]);

  let returnName = () => {
    let name = folder.filter(data => data._id === paramId);
    if (name) {
      name = name[0].folder_name;
    }
    setFolderName(name);
  };

  return data.folder_id == paramId ? (
    <div name={data.note_title} id={data._id} className="s_n_item">
      <div className="note_icon">
        <h6>{data.note_title[0]}</h6>
      </div>
      <div className="title">
        <h3>{data.note_title}</h3>
      </div>
      <h5>{moment(data.date).calendar()}</h5>
      <h5>{folderName}</h5>
      <div id={data._id} onClick={context} className="edit">
        <FontAwesomeIcon icon="ellipsis-v" color="white" />
      </div>
    </div>
  ) : (
    <h2> You have no notes </h2>
  );
};
