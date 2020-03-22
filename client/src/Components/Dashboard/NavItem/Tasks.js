import React, { Component } from "react";
import { connect } from "react-redux";

import {
  toggleTask,
  addTask,
  removeTask,
  toggleOpenTask
} from "../../../actions/taskActions";
import WidgetSubmit from "./widgetSubmit";
import { showMenu, hideMenu } from "../../../actions/contextMenuActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontawesome";

class Todo extends Component {
  handleToggle = id => {
    this.props.toggleTask(id);
  };

  onRemoveFolder = (e, id) => {
    e.preventDefault();
    this.props.removeTask(id);
  };

  onRightClicked = e => {
    e.preventDefault();
    const { pageX, pageY } = e;
    this.props.showMenu(pageX, pageY, "TasksContextMenu", {
      name: e.target.name,
      id: e.target.id
    });
  };

  openAddTask = e => {
    e.preventDefault();
    this.props.toggleOpenTask();
  };

  handleHover = e => {
    let item = e.target.nextSibling;
    item.style.display = "block";
  };

  handleLeave = e => {
    let item = document.querySelectorAll(".task_data button");
    item.forEach(item => (item.style.display = "none"));
  };

  showData = () => {
    return (
      <form className="task_form">
        {this.props.data.map((key, index) => (
          <div
            onMouseLeave={e => this.handleLeave(e)}
            className="task_data"
            key={index}
          >
            <input
              type="checkbox"
              checked={key.isCompleted || false}
              id={`check${index}`}
              onChange={() => this.handleToggle(key._id)}
            ></input>
            <label
              className={key.isCompleted ? "task_isCompleted" : null}
              onMouseEnter={e => this.handleHover(e)}
              id={key._id}
              name={key.task_name}
              onContextMenu={e => this.onRightClicked(e)}
              htmlFor={`check${index}`}
              onTouchStart={() => this.handleToggle(key._id)}
            >
              {key.task_name}
            </label>
            <button
              style={{ display: "none" }}
              onClick={e => this.onRemoveFolder(e, key._id)}
              value={key.folder_name}
            >
              <FontAwesomeIcon icon="trash" size="1x"></FontAwesomeIcon>
            </button>
          </div>
        ))}
      </form>
    );
  };

  removeTask = () => {};

  render() {
    return (
      <div className="widget">
        <div className="widget_header">
          <h4>Tasks</h4>
          <div className="plus" onClick={e => this.openAddTask(e)}></div>
        </div>
        <div className="widget_content">
          {this.props.isOpen ? (
            <WidgetSubmit
              addFolder={this.props.addTask}
              userid={this.props.userId}
              toggle={this.props.toggleOpenTask}
            />
          ) : null}
          <div className="w_contents">{this.showData()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.user._id,
    isOpen: state.task.isOpen
  };
};

const mapDispatchToProps = dispatch => ({
  toggleTask: id => dispatch(toggleTask(id)),
  removeTask: id => dispatch(removeTask(id)),
  addTask: values => dispatch(addTask(values)),
  showMenu: (x, y, getType, args) => dispatch(showMenu(x, y, getType, args)),
  toggleOpenTask: () => dispatch(toggleOpenTask()),
  hideMenu: () => dispatch(hideMenu())
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
