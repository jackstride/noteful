import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addFolder, getFolder, removeFolder,toggleFolderOpen} from "../../../actions/FolderActions";
import {showMenu, hideMenu,} from '../../../actions/contextMenuActions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontawesome";

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
      const {pageX,pageY} = e;
      this.props.showMenu("folders",pageX,pageY,"FoldersContextMenu",{name: e.target.name,id: e.target.id})
  }

  toggleAddFolder = () => {
    this.props.toggleFolderOpen();
  };

  onRemoveFolder = (e, id) => {
    e.preventDefault();
    this.props.removeFolder(id);
  };

  editNote = e => {
  }

  showFolders = () => {
    if(this.props.folder) {
    return (
      <ul>
        {this.props.folder.map((key, index) => (
          <div className="input_multiple" key={index}>
            <li key={index} onContextMenu={(e) => this.onRightClicked(e)}>
              <Link onClick={(e) => this.editNote(e)} id={key._id} name={key.folder_name} to="#">{key.folder_name}</Link>
              </li>
               <button onClick={(e) => this.onRemoveFolder(e, key._id)} value={key.folder_name}>
                  <FontAwesomeIcon icon="trash" size="1x"></FontAwesomeIcon>
                </button>
          </div>
        ))}
      </ul>
    );
        }
  };

  render() {
    let { isShown } = this.state;
    return (
      <div className="widget">
        <div className="widget_header">
          <h5>FOLDERS</h5>
          <div className="plus" onClick={this.toggleAddFolder}></div>
        </div>
        <div className="widget_content">
          <div className="w_contents">
          {this.props.isOpen ? (
            <WidgetSubmit addFolder={this.props.addFolder} userid={this.props.userId}
/>
          ) : null}
            {this.showFolders()}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userId: state.auth.user._id,
    folder: state.folder.data,
    isOpen: state.folder.isOpen,
  };
};

const mapDispatchToProps = dispatch => ({
  removeFolder: id => dispatch(removeFolder(id)),
  addFolder: id => dispatch(addFolder(id)),
  getFolder: id => dispatch(getFolder(id)),
  showMenu: (type,x,y,getType,args) => dispatch(showMenu(type,x,y,getType,args)),
  hideMenu: () => dispatch(hideMenu()),
  toggleFolderOpen: ()=>dispatch(toggleFolderOpen())
});

export default connect(mapStateToProps, mapDispatchToProps)(Folders);
