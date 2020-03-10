import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  addFolder,
  getFolder,
  removeFolder,
  toggleFolderOpen
} from "../../../actions/FolderActions";
import { showMenu, hideMenu } from "../../../actions/contextMenuActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontawesome";
import { deleteConfirmation } from "../../../actions/ResponseActions";
import WidgetSubmit from "./widgetSubmit";
import { withRouter } from "react-router-dom";

class Folders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      isLoaded: false
    };
  }

  componentDidMount() {
    this.props.getFolder(this.props.userId);
  }

  onRightClicked = e => {
    e.preventDefault();
    const { pageX, pageY } = e;
    this.props.showMenu(pageX, pageY, "FoldersContextMenu", {
      name: e.target.name,
      id: e.target.id
    });
  };

  componentDidUpdate = (prevProps, nextProps) => {
    if (this.props.folder.length !== prevProps.folder.length) {
      if (typeof id !== "undefined") {
        const id = this.props.folder[0]._id;
        this.props.history.push("/dashboard/" + id);
      }
    }
  };

  toggleAddFolder = () => {
    this.props.toggleFolderOpen();
  };

  onRemoveFolder = (e, id) => {
    this.props.deleteConfirmation(id);
  };

  handleHover = e => {
    let item = e.target.nextSibling;
    item.style.display = "block";
  };

  handleLeave = e => {
    let item = document.querySelectorAll(".input_multiple button");
    item.forEach(item => (item.style.display = "none"));
  };

  showFolders = () => {
    if (this.props.folder) {
      return (
        <ul>
          {this.props.folder.map((key, index) => (
            <div
              className="input_multiple"
              onMouseLeave={e => this.handleLeave(e)}
              key={index}
            >
              <li
                onMouseEnter={e => this.handleHover(e)}
                key={index}
                onContextMenu={e => this.onRightClicked(e)}
              >
                <Link
                  id={key._id}
                  name={key.folder_name}
                  to={`/dashboard/${key._id}`}
                >
                  {key.folder_name}
                </Link>
                <button
                  style={{ display: "none" }}
                  onClick={e => this.onRemoveFolder(e, key._id)}
                  value={key.folder_name}
                >
                  <FontAwesomeIcon icon="trash" size="1x"></FontAwesomeIcon>
                </button>
              </li>
            </div>
          ))}
        </ul>
      );
    }
  };

  render() {
    return (
      <div className="widget">
        <div className="widget_header">
          <h4>Notebooks</h4>
          <div
            className="plus"
            onClick={() => {
              this.toggleAddFolder();
            }}
          ></div>
        </div>
        <div className="widget_content">
          <div className="w_contents">
            {this.props.isOpen ? (
              <WidgetSubmit
                addFolder={this.props.addFolder}
                userid={this.props.userId}
                toggle={this.props.toggleFolderOpen}
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
    isOpen: state.folder.isOpen
  };
};

const mapDispatchToProps = dispatch => ({
  removeFolder: id => dispatch(removeFolder(id)),
  addFolder: id => dispatch(addFolder(id)),
  getFolder: id => dispatch(getFolder(id)),
  showMenu: (x, y, getType, args, name) =>
    dispatch(showMenu(x, y, getType, args, name)),
  hideMenu: () => dispatch(hideMenu()),
  toggleFolderOpen: () => dispatch(toggleFolderOpen()),
  deleteConfirmation: id => dispatch(deleteConfirmation(id))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Folders)
);
