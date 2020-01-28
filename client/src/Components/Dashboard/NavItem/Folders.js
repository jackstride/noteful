import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  addFolder,
  getFolder,
  removeFolder
} from "../../../actions/FolderActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontawesome";

import WidgetSubmit from "./widgetSubmit";

class Folders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.props.getFolder(this.props.userId);
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
      <ul>
        {this.props.folder.map((key, index) => (
          <div key={index} style={{ zIndex: "-1" }}>
            <li key={index}>
              <Link to="#">{key.folder_name}</Link>
            </li>
            <button
              onClick={e => this.onRemoveFolder(e, key._id)}
              value={key.folder_name}
            >
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
        <div className="widget_header">
          <h3>FOLDERS</h3>
          <div className="plus" onClick={this.toggleAddFolder}></div>
        </div>
        <div className="widget_content">
          {isShown ? (
            <WidgetSubmit
              addFolder={this.props.addFolder}
              userid={this.props.userId}
            />
          ) : null}
          <div className="w_contents">{ this.showFolders()}</div>
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
  getFolder: id => dispatch(getFolder(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Folders);
