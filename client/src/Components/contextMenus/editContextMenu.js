import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import {updateFolder} from '../../actions/FolderActions'

class EditContextMenu extends Component {
  handleSubmit = e => {
    e.preventDefault();
    let values = {
        id: this.props.id,
        name: e.target.new_folder.value,
    }
    this.props.updateFolder(values);
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
    id: state.contextMenu.menuArgs.id
  };
};

const mapDispatchToProps = dispatch => ({
    updateFolder: values => dispatch(updateFolder(values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditContextMenu);
