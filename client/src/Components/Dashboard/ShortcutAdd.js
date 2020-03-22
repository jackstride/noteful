import React, { useState, Fragment, useEffect } from "react";
import { Portal } from "react-portal";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showMenu } from "../../actions/contextMenuActions";

const ShortcutAdd = ({ showMenu, folder }) => {
  let [show, setShow] = useState(false);
  let [showFolders, setShowFolders] = useState(false);

  useEffect(() => {
    if (!show) {
      setShowFolders(false);
    }
  }, [show]);

  let handleShow = e => {
    setShow(!show);
  };

  let handleAddFolder = e => {
    e.preventDefault();
    const { pageX, pageY } = e;
    showMenu(
      pageX,
      pageY,
      "EditContextMenu",
      {
        name: e.target.name,
        id: e.target.id
      },
      "addfolder"
    );
  };

  let handleAddTask = e => {
    e.preventDefault();
    const { pageX, pageY } = e;
    showMenu(
      pageX,
      pageY,
      "EditContextMenu",
      {
        name: e.target.name,
        id: e.target.id
      },
      "addtask"
    );
  };

  let handleAddNote = () => {
    setShowFolders(!showFolders);
  };

  return (
    <Portal>
      <div className="shortcut">
        <div onClick={e => handleShow(e)} className="shortcut_container">
          <FontAwesomeIcon icon="plus" size="1x" color="white" />
        </div>
        {show ? (
          <div className="shortcut_items">
            <ShortcutItem icon="sticky-note" action={e => handleAddNote(e)} />
            <ShortcutItem icon="folder" action={e => handleAddFolder(e)} />
            <ShortcutItem icon="tasks" action={e => handleAddTask(e)} />
          </div>
        ) : null}
        {showFolders ? (
          <ShowFolderMenu
            noteaction={e => {
              console.log(e.target);
              const { pageX, pageY } = e;
              showMenu(
                pageX,
                pageY,
                "EditContextMenu",
                {
                  name: e.target.name,
                  id: e.target.id
                },
                "addnote"
              );
            }}
            data={folder}
          />
        ) : null}
      </div>
    </Portal>
  );
};

const mapStateToProps = state => {
  return {
    folder: state.folder.data
  };
};

const mapDispatchToProps = dispatch => ({
  showMenu: (x, y, getType, args, name) =>
    dispatch(showMenu(x, y, getType, args, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShortcutAdd);

let ShortcutItem = ({ icon, action }) => {
  return (
    <div onClick={action} className="shortcut_container">
      <FontAwesomeIcon icon={icon} color="white" />
    </div>
  );
};

let ShowFolderMenu = ({ data, noteaction }) => {
  let folders = data.map((data, i) => {
    return (
      <li key={i} onClick={noteaction} id={data._id}>
        {data.folder_name}
      </li>
    );
  });

  return (
    <div className="shortcut_folder">
      <ul>{data ? <Fragment>{folders}</Fragment> : null}</ul>
    </div>
  );
};
