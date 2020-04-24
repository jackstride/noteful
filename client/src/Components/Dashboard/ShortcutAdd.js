import React, { useState, Fragment, useEffect, useRef } from "react";
import { Portal } from "react-portal";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showMenu } from "../../actions/contextMenuActions";

const ShortcutAdd = ({ showMenu, folder, isDark }) => {
  let [show, setShow] = useState(false);
  let [showFolders, setShowFolders] = useState(false);

  useEffect(() => {
    if (!show) {
      setShowFolders(false);
    }
  }, [show]);

  let handleShow = (e) => {
    setShow(!show);
  };

  let handleAddFolder = (e) => {
    e.preventDefault();
    const { pageX, pageY } = e;
    showMenu(
      pageX,
      pageY,
      "EditContextMenu",
      {
        name: e.target.name,
        id: e.target.id,
      },
      "addfolder"
    );
  };

  let handleAddTask = (e) => {
    e.preventDefault();
    const { pageX, pageY } = e;
    showMenu(
      pageX,
      pageY,
      "EditContextMenu",
      {
        name: e.target.name,
        id: e.target.id,
      },
      "addtask"
    );
  };

  let handleAddNote = () => {
    setShowFolders(!showFolders);
  };

  return (
    <Portal>
      <div className={isDark ? "shortcut dark-mode" : "shortcut"}>
        <div onClick={(e) => handleShow(e)} className="shortcut_container">
          <FontAwesomeIcon icon="plus" size="1x" color="white" />
        </div>
        {show ? (
          <div className="shortcut_items">
            <ShortcutItem
              icon="sticky-note"
              action={(e) => handleAddNote(e)}
            ></ShortcutItem>
            <ShortcutItem icon="folder" action={(e) => handleAddFolder(e)} />
            <ShortcutItem icon="tasks" action={(e) => handleAddTask(e)} />
          </div>
        ) : null}
      </div>
      {showFolders ? (
        <ShowFolderMenu
          toggleShow={() => {
            setShowFolders(!showFolders);
          }}
          dark={isDark}
          noteaction={(e) => {
            const { pageX, pageY } = e;
            showMenu(
              pageX,
              pageY,
              "EditContextMenu",
              {
                name: e.target.name,
                id: e.target.id,
              },
              "addnote"
            );
            setShowFolders(!showFolders);
          }}
          data={folder}
        />
      ) : null}
    </Portal>
  );
};

const mapStateToProps = (state) => {
  return {
    folder: state.folder.data,
    isDark: state.misc.isDark,
  };
};

const mapDispatchToProps = (dispatch) => ({
  showMenu: (x, y, getType, args, name) =>
    dispatch(showMenu(x, y, getType, args, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShortcutAdd);

let ShortcutItem = ({ icon, action, children }) => {
  return (
    <div onClick={action} className="shortcut_container">
      {children}
      <FontAwesomeIcon icon={icon} color="white" />
    </div>
  );
};

let ShowFolderMenu = ({ data, noteaction, dark, toggleShow }) => {
  let ref = useRef();

  let handleClick = (e) => {
    if (ref.current.contains(e.target)) {
      return;
    } else {
      toggleShow();
    }
  };

  useEffect(() => {
    // Sort this out
    document.addEventListener("mousedown", handleClick);

    return () => {
      console.log("fired");
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  let folders = data.map((data, i) => {
    return (
      <li key={i} onClick={noteaction} id={data._id}>
        <FontAwesomeIcon icon="folder" color={data.folder_color} />
        {data.folder_name}
      </li>
    );
  });

  return (
    <div
      ref={ref}
      className={dark ? "shortcut_folder dark-mode" : "shortcut_folder"}
    >
      <h5>Select Folder</h5>
      <ul>{data ? <Fragment>{folders}</Fragment> : null}</ul>
    </div>
  );
};
