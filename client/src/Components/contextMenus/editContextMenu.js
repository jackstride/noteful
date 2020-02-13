import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import {updateFolder} from '../../actions/FolderActions'
import {editTask} from '../../actions/taskActions'

class EditContextMenu extends Component {
  
  handleSubmit = e => {
    e.preventDefault();
    
    if(this.props.widgetName == "tasks") {
      console.log("ran")
      let values = {
        id: this.props.id,
        name: e.target.new_folder.value,
    }
    console.log(values)
    this.props.editTask(values);
      
    } else {
      let values = {
        id: this.props.id,
        name: e.target.new_folder.value,
    }
    this.props.updateFolder(values);
    }
    
    
  };

  render() {
    console.log(this.props)
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
    widgetName: state.contextMenu.name,
  };
};

const mapDispatchToProps = dispatch => ({
    updateFolder: values => dispatch(updateFolder(values)),
    editTask: values => dispatch(editTask(values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditContextMenu);
