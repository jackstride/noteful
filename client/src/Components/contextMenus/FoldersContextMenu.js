import React, { useState } from "react";
import { connect } from "react-redux";
import {
  removeFolder,
  toggleFolderOpen,
  updateFolder
} from "../../actions/FolderActions";
import { hideMenu, showMenu } from "../../actions/contextMenuActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteConfirmation } from "../../actions/ResponseActions";
import { UPDATE_FOLDER_COLOR } from "../../actions/types";

const FolderContextMenu = ({
  deleteConfirmation,
  showMenu,
  type,
  name,
  id,
  x,
  y,
  updateFolder
}) => {
  let [show, setShow] = useState(false);

  let handleRemove = (e, id) => {
    e.preventDefault();
    deleteConfirmation(id);
  };

  let addNote = e => {
    this.props.showMenu(
      x,
      y,
      "EditContextMenu",
      {
        name: name,
        id: id
      },
      "addfolder"
    );
  };

  let editFolderName = e => {
    showMenu(
      x,
      y,
      "EditContextMenu",
      {
        name: name,
        id: id
      },
      "folders"
    );
  };

  return (
    <ul>
      <span>
        <FontAwesomeIcon size="xs" icon="plus"></FontAwesomeIcon>
        <li onClick={e => addNote(e)}>
          <a href="#">Add</a>
        </li>
      </span>
      <span>
        <FontAwesomeIcon size="xs" icon="trash"></FontAwesomeIcon>
        <li onClick={e => handleRemove(e, id)}>
          <a href="#">Delete</a>
        </li>
      </span>
      <span>
        <FontAwesomeIcon size="xs" icon="pencil-alt"></FontAwesomeIcon>
        <li onClick={e => editFolderName(e)}>
          <a href="#">Rename</a>
        </li>
      </span>
      <span>
        <FontAwesomeIcon size="xs" icon="plus"></FontAwesomeIcon>
        <li onClick={e => setShow(!show)}>Set Color</li>
        {show ? <SelectColor folderid={id} update={updateFolder} /> : null}
      </span>
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    type: state.contextMenu.type,
    name: state.contextMenu.menuArgs.name,
    id: state.contextMenu.menuArgs.id,
    x: state.contextMenu.location.x,
    y: state.contextMenu.location.y
  };
};

const mapDispatchToProps = dispatch => ({
  removeFolder: id => dispatch(removeFolder(id)),
  hideMenu: () => dispatch(hideMenu()),
  toggleFolderOpen: () => dispatch(toggleFolderOpen()),
  deleteConfirmation: id => dispatch(deleteConfirmation(id)),
  showMenu: (x, y, getType, args, name) =>
    dispatch(showMenu(x, y, getType, args, name)),
  updateFolder: (_id, values, passType) =>
    dispatch(updateFolder(_id, values, passType))
});

export default connect(mapStateToProps, mapDispatchToProps)(FolderContextMenu);

const SelectColor = ({ update, folderid }) => {
  const [colors, setColors] = useState([
    {
      hex: "#fecaa2",
      name: "Salmon"
    },
    {
      hex: "#b2f1b3",
      name: "Light Green"
    },
    {
      hex: "#99d4fa",
      name: "LightBlue"
    },
    {
      hex: "#ffaa6f",
      name: "Orange"
    },
    {
      hex: "#ffaaa5",
      name: "Pink"
    },
    {
      hex: "#5f6caf",
      name: "Purple"
    },
    {
      hex: "#204051",
      name: "Navy Blue"
    },
    {
      hex: "#5b8c5a",
      name: "Dark Green"
    },
    {
      hex: "#381460",
      name: "Dark Purple"
    }
  ]);

  return (
    <div className="select_color">
      <ul>
        {colors.map((item, index) => {
          return (
            <li
              onClick={() =>
                update(
                  folderid,
                  { folder_color: item.hex },
                  UPDATE_FOLDER_COLOR
                )
              }
              key={index}
            >
              <div
                style={{ backgroundColor: item.hex }}
                className="item_color"
              ></div>
              <p>{item.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
