import React, { Component } from "react";
import { connect } from "react-redux";

import {
  toggleOpenTask,
  removeTask,
  toggleTask
} from "../../actions/taskActions";
import { hideMenu, showMenu } from "../../actions/contextMenuActions";

class TasksContextMenu extends Component {
  handleRename = () => {
    this.props.showMenu(
      this.props.x,
      this.props.y,
      "EditContextMenu",
      { name: this.props.name, id: this.props.id },
      "tasks"
    );
  };

  handleDelete = (e, id) => {
    e.preventDefault();
    this.props.removeTask(id);
    this.props.hideMenu();
  };

  handleMarkTask = (e, id) => {
    e.preventDefault();
    this.props.toggleTask(id);
    this.props.hideMenu();
  };

  handleToggleAdd = () => {
    this.props.showMenu(
      this.props.x,
      this.props.y,
      "EditContextMenu",
      { name: this.props.name, id: this.props.id },
      "addtask"
    );
  };

  render() {
    return (
      <ul>
        <li
          onClick={() => {
            this.handleToggleAdd();
          }}
        >
          Add Tasks
        </li>
        <li onClick={e => this.handleRename(e, this.props.id)}>Rename Task</li>
        <li onClick={e => this.handleDelete(e, this.props.id)}> Delete Task</li>
        <li onClick={e => this.handleMarkTask(e, this.props.id)}>Mark Task</li>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.contextMenu.menuArgs.id,
    x: state.contextMenu.location.x,
    y: state.contextMenu.location.y
  };
};

const mapDispatchToProps = dispatch => ({
  toggleOpenTask: () => dispatch(toggleOpenTask()),
  hideMenu: () => dispatch(hideMenu()),
  removeTask: id => dispatch(removeTask(id)),
  toggleTask: id => dispatch(toggleTask(id)),
  showMenu: (x, y, getType, args, name) =>
    dispatch(showMenu(x, y, getType, args, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksContextMenu);
