import React, { Component } from "react";
import { connect } from "react-redux";
import {
  removeFolder,
  addFolder,
  toggleFolderOpen
} from "../../actions/FolderActions";
import { hideMenu, showMenu } from "../../actions/contextMenuActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteConfirmation } from "../../actions/ResponseActions";

class FolderContextMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: null,
      y: null
    };
  }

  handleRemove = (e, id) => {
    e.preventDefault();
    this.props.deleteConfirmation(id);
  };

  addNote = e => {
    this.props.toggleFolderOpen();
    this.props.hideMenu();
  };

  editFolderName = e => {
    const { pageX, pageY } = e;
    this.props.showMenu(
      this.props.x,
      this.props.y,
      "EditContextMenu",
      {
        name: this.props.name,
        id: this.props.id
      },
      "folders"
    );
  };

  render() {
    return (
      <ul>
        <span>
          <FontAwesomeIcon size="xs" icon="plus"></FontAwesomeIcon>
          <li onClick={e => this.addNote(e)}>
            <a>Add</a>
          </li>
        </span>
        <span>
          <FontAwesomeIcon size="xs" icon="trash"></FontAwesomeIcon>
          <li onClick={e => this.handleRemove(e, this.props.id)}>
            <a>Delete</a>
          </li>
        </span>
        <span>
          <FontAwesomeIcon size="xs" icon="pencil-alt"></FontAwesomeIcon>
          <li onClick={e => this.editFolderName(e)}>
            <a>Rename</a>
          </li>
        </span>
      </ul>
    );
  }
}

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
    dispatch(showMenu(x, y, getType, args, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(FolderContextMenu);
