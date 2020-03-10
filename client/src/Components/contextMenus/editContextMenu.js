import React, { Component } from "react";
import { connect } from "react-redux";

import { updateFolder } from "../../actions/FolderActions";
import { editTask } from "../../actions/taskActions";
import { hideMenu } from "../../actions/contextMenuActions";
import { editNote } from "../../actions/NoteActions";

class EditContextMenu extends Component {
  handleSubmit = e => {
    e.preventDefault();
    let values = {
      id: this.props.id,
      name: e.target.new_folder.value
    };
    console.log(this.props.widgetName);
    switch (this.props.widgetName) {
      case "tasks":
        this.props.editTask(values);
        break;
      case "folders":
        this.props.updateFolder(values);
        break;
      case "notes":
        values = {
          _id: this.props.id,
          note_title: e.target.new_folder.value
        };
        this.props.editNote(values);
        break;
      default:
        this.props.hideMenu();
    }
  };

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <input type="text" name="new_folder" autoFocus />
        <input type="hidden" />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.contextMenu.menuArgs.name,
    id: state.contextMenu.menuArgs.id,
    widgetName: state.contextMenu.name
  };
};

const mapDispatchToProps = dispatch => ({
  updateFolder: values => dispatch(updateFolder(values)),
  editTask: values => dispatch(editTask(values)),
  editNote: values => dispatch(editNote(values)),
  hideMenu: () => dispatch(hideMenu())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContextMenu);
