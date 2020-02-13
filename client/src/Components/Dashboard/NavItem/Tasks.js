import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { toggleTask, addTask, removeTask, toggleOpenTask } from "../../../actions/taskActions";
import WidgetSubmit from "./widgetSubmit";
import {showMenu} from '../../../actions/contextMenuActions'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontawesome";

class Todo extends Component {


  onRemoveFolder = (e, id) => {
    e.preventDefault();
    this.props.removeTask(id);
  };

  onRightClicked = (e) => {    
    e.preventDefault();
    const {pageX,pageY} = e;
    this.props.showMenu(pageX, pageY ,"TasksContextMenu",{name: e.target.name,id: e.target.id})
}

  showData = () => {
    return (
      <form className="task_form">
        {this.props.data.map((key, index) => (
          <div className="task_data" key={index}>
            <input type="checkbox" checked={key.isCompleted || false} id={`check${index}`} onChange={() => this.handleToggle(key._id)}></input>
            <label  id={key._id} name={key.task_name} onContextMenu={(e) => this.onRightClicked(e)} htmlFor={`check${index}`}>{key.task_name}</label>
            <button onClick={e => this.onRemoveFolder(e, key._id)} value={key.folder_name}>
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
    return (
      <div className="widget">
        <div className="widget_header">
          <h5>TASKS</h5>
          <div className="plus" onClick={this.props.toggleOpenTask}></div>
        </div>
        <div className="widget_content">
          {this.props.isOpen ? (
            <WidgetSubmit
              addFolder={this.props.addTask}
              userid={this.props.userId}
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
    isOpen: state.task.isOpen,
  };
};

const mapDispatchToProps = dispatch => ({
  toggleTask: id => dispatch(toggleTask(id)),
  removeTask: id => dispatch(removeTask(id)),
  addTask: values => dispatch(addTask(values)),
  showMenu: (x,y,getType,args) => dispatch(showMenu(x,y,getType,args)),
  toggleOpenTask: () => dispatch(toggleOpenTask()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
