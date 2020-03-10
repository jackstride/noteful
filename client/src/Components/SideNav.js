import React, { Component } from "react";
import Profile from "./Dashboard/NavItem/profile";
import Search from "./Dashboard/NavItem/search";
import Folders from "./Dashboard/NavItem/Folders";
import Tasks from "./Dashboard/NavItem/Tasks";
import { getFolder } from "../actions/FolderActions";
import { loadTasks } from "../actions/taskActions";
import { connect } from "react-redux";
import ProfileIcon from "./Dashboard/NavItem/profileIcon";

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true
    };
  }
  componentDidMount() {
    this.props.loadTasks(this.props.userId);
    // this.props.getFolder(this.props.userId);
    // console.log(this.props.folder);
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
      <div className="app_navigation">
        <div
          className={this.state.isOpen ? { display: "hidden" } : "hover_open"}
        >
          <div className="app_profile">
            {/* // Ifffy */}
            {!this.state.isOpen && <ProfileIcon handleClick={this.toggleNav} />}
          </div>
        </div>

        <div
          className={
            this.state.isOpen
              ? "dashboard_navigation grow"
              : "dashboard_navigation"
          }
        >
          <Profile toggle={this.toggleNav} />
          <Search />
          <Folders />
          <Tasks userId={this.props.userId} data={this.props.taskData} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.user._id,
    taskData: state.task.taskData,
    folder: state.folder.data
  };
};

const mapDispatchToProps = dispatch => ({
  getFolder: id => dispatch(getFolder(id)),
  loadTasks: id => dispatch(loadTasks(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
