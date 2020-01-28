import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { toggleTask, addTask, removeTask } from "../../../actions/taskActions";
import WidgetSubmit from "./widgetSubmit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontawesome";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false
    };
  }

  toggleAddFolder = () => {
    this.setState({ isShown: !this.state.isShown });
  };

  onRemoveFolder = (e, id) => {
    e.preventDefault();
    this.props.removeTask(id); 
  };

  showData = () => {
    return (
      <form className="task_form">
        {this.props.data.map((key, index) => (
          <div className="task_data" key={index}>
            <input
              type="checkbox"
              checked={key.isCompleted}
              id={`check${index}`}
              onChange={() => this.handleToggle(key._id)}
            ></input>
            <label htmlFor={`check${index}`}>{key.task_name}</label>
            <button
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

  handleToggle = id => {
    this.props.toggleTask(id);
  };

  removeTask = () => {};

  render() {
    let { isShown } = this.state;
    return (
      <div className="widget">
        <div className="widget_header">
          <h3>Tasks</h3>
          <div className="plus" onClick={this.toggleAddFolder}></div>
        </div>
        <div className="widget_content">
          {isShown ? <WidgetSubmit addFolder={this.props.addTask} userid={this.props.userId} /> : null}
          <div className="w_contents">{this.showData()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.user._id
  };
};

const mapDispatchToProps = dispatch => ({
  toggleTask: id => dispatch(toggleTask(id)),
  removeTask: id => dispatch(removeTask(id)),
  addTask: values => dispatch(addTask(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
