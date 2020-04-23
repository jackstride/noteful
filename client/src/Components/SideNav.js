import React, { Component } from "react";
import Folders from "./Dashboard/NavItem/Folders";
import Tasks from "./Dashboard/NavItem/Tasks";
import Notes from "./Dashboard/NavItem/Notes";

import { getFolder } from "../actions/FolderActions";
import { loadTasks } from "../actions/taskActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SideBar extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadTasks(this.props.userId);
    // this.props.getFolder(this.props.userId);
    // console.log(this.props.folder);
    console.log(this.props)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.props.loadTasks(this.props.userId);
      this.props.getFolder(this.props.userId);
    }
  }

  toggleNav = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div className="dashboard_navigation">
        <Link onClick={this.props.toggle} to="/dashboard">
          <div className="dashboard">
            <div className="icon_circle">
              <FontAwesomeIcon
                icon="align-left"
                size="1x"
                color="grey"
              ></FontAwesomeIcon>
            </div>
            <span>Dashboard</span>
          </div>
        </Link>
        <Link onClick={this.props.toggle} to="/dashboard/settings">
          <div className="dashboard">
            <div className="icon_circle">
              <FontAwesomeIcon
                icon="cog"
                size="1x"
                color="grey"
              ></FontAwesomeIcon>
            </div>
            <span>Settings</span>
          </div>
        </Link>
        <Link onClick={this.props.toggle} to="/logout">
          <div className="dashboard">
            <div className="icon_circle">
              <FontAwesomeIcon
                icon="sign-out-alt"
                size="1x"
                color="grey"
              ></FontAwesomeIcon>
            </div>
            <span>Sign out</span>
          </div>
        </Link>
        <Folders toggle={this.props.toggle} />
        <Notes toggle={this.props.toggle} />
        <Tasks userId={this.props.userId} data={this.props.taskData} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.user._id,
    taskData: state.task.taskData,
    folder: state.folder.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getFolder: (id) => dispatch(getFolder(id)),
  loadTasks: (id) => dispatch(loadTasks(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
