import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { updateFolder, addFolder } from "../../actions/FolderActions";
import { editTask, addTask } from "../../actions/taskActions";
import { hideMenu } from "../../actions/contextMenuActions";
import { editNote, addNote } from "../../actions/NoteActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class EditContextMenu extends Component {
  handleSubmit = e => {
    e.preventDefault();
    let values;
    values = {
      id: this.props.id,
      name: e.target.new_folder.value
    };
    switch (this.props.widgetName) {
      case "tasks":
        this.props.editTask({
          _id: this.props.id,
          task_name: e.target.new_folder.value
        });
        break;
      case "folders":
        values = { folder_name: e.target.new_folder.value };
        this.props.updateFolder(this.props.id, values);
        break;
      case "addfolder":
        values = {
          id: this.props.user_id,
          title: e.target.new_folder.value
        };
        this.props.addFolder(values);
        break;
      case "notes":
        values = {
          _id: this.props.id,
          note_title: e.target.new_folder.value
        };
        this.props.editNote(values);
        break;
      case "addnote":
        values = {
          user_id: this.props.user_id,
          folder_id: this.props.id,
          note_title: e.target.new_folder.value
        };
        this.props.addNote(values);
        break;
      case "addtask":
        values = {
          title: e.target.new_folder.value,
          id: this.props.user_id
        };
        this.props.addTask(values);
      default:
        this.props.hideMenu();
    }
    this.props.hideMenu();
  };

  render() {
    return (
      <Fragment>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => this.props.hideMenu()}
          className="context_close"
        >
          <h5>Close</h5>
        </div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="text"
            placeholder="Untitled"
            name="new_folder"
            autoFocus
          />
          <input type="submit" name="submit" vale="Add" />
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user_id: state.auth.user._id,
    name: state.contextMenu.menuArgs.name,
    id: state.contextMenu.menuArgs.id,
    widgetName: state.contextMenu.name
  };
};

const mapDispatchToProps = dispatch => ({
  updateFolder: (_id, values) => dispatch(updateFolder(_id, values)),
  editTask: values => dispatch(editTask(values)),
  editNote: values => dispatch(editNote(values)),
  hideMenu: () => dispatch(hideMenu()),
  addFolder: values => dispatch(addFolder(values)),
  addNote: values => dispatch(addNote(values)),
  addTask: values => dispatch(addTask(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContextMenu);
