import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addFolder, getFolder, removeFolder} from "../../../actions/FolderActions";
import {showMenu} from '../../../actions/contextMenuActions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontawesome";

import ContextMenu from '../../contextMenu/contextMenu'

import WidgetSubmit from "./widgetSubmit";


class Folders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
      isLoaded: false
    };
  }


  onRightClicked = (e) => {
    e.preventDefault();
    console.log(e.target)
    const {pageX,pageY} = e;
    this.props.showMenu(pageX,pageY, "Folders")
  }

  toggleAddFolder = () => {
    this.setState({ isShown: !this.state.isShown });
  };

  onRemoveFolder = (e, id) => {
    e.preventDefault();
    this.props.removeFolder(id);
  };

  showFolders = () => {
    return (
      <ul id="test">
        {this.props.folder.map((key, index) => (
          <div key={index} style={{ zIndex: "-1" }}>
            <li key={index} onClick={(e) => this.onRightClicked(e)}>
              <Link to="#">{key.folder_name}</Link></li>
                <button onClick={(e) => this.onRemoveFolder(e, key._id)} value={key.folder_name}>
                  <FontAwesomeIcon icon="trash" size="1x"></FontAwesomeIcon>
                </button>
          </div>
        ))}
      </ul>
    );
  };

  render() {
    let { isShown } = this.state;
    return (
      <div className="widget">
      <ContextMenu />
        <div className="widget_header">
          <h5>FOLDERS</h5>
          <div className="plus" onClick={this.toggleAddFolder}></div>
        </div>
        <div className="widget_content">
          {isShown ? (
            <WidgetSubmit
              addFolder={this.props.addFolder}
              userid={this.props.userId}
            />
          ) : null}
          <div className="w_contents">{this.showFolders()}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userId: state.auth.user._id,
    folder: state.folder.data
  };
};

const mapDispatchToProps = dispatch => ({
  removeFolder: id => dispatch(removeFolder(id)),
  addFolder: id => dispatch(addFolder(id)),
  getFolder: id => dispatch(getFolder(id)),
  showMenu: () => dispatch(getFolder())
});

export default connect(mapStateToProps, mapDispatchToProps)(Folders);
