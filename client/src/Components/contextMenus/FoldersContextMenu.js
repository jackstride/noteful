import React, { Component } from "react";
import { connect } from "react-redux";
import {
  removeFolder,
  addFolder,
  toggleFolderOpen
} from "../../actions/FolderActions";
import { hideMenu, showMenu } from "../../actions/contextMenuActions";

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
    this.props.removeFolder(id);
    this.props.hideMenu();
  };

  addNote = e => {
    this.props.toggleFolderOpen();
    this.props.hideMenu();
  };

  editNote = e => {
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
        <li onClick={e => this.addNote(e)}>
          <a>Add New Note</a>
        </li>
        <li onClick={e => this.handleRemove(e, this.props.id)}>
          <a>Delete Note</a>
        </li>
        <li onClick={e => this.editNote(e)}>
          <a>Rename Note</a>
        </li>
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
  showMenu: (x, y, getType, args, name) =>
    dispatch(showMenu(x, y, getType, args, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(FolderContextMenu);
