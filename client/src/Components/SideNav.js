import React, { Component } from "react";

import Profile from './Dashboard/NavItem/profile';
import Search from './Dashboard/NavItem/search'
import Folders from "./Dashboard/NavItem/Folders";
import Tasks from './Dashboard/NavItem/Tasks'



import {
  addFolder,
  getFolder,
  removeFolder,
} from "../actions/FolderActions";

import {loadTasks} from '../actions/taskActions';

import {connect} from 'react-redux'

class SideBar extends Component {

  componentDidMount(){
    this.props.loadTasks(this.props.userId);
    this.props.getFolder(this.props.userId);
  }
    

  render() {
    return (
      <div className="dashboard_navigation">
      <Profile />
      <Search />
      <Folders />
      <Tasks userId={this.props.userId} data={this.props.taskData} />
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    userId: state.auth.user._id,
    taskData: state.task.taskData,
  };
};

const mapDispatchToProps = dispatch => ({
  getFolder: (id) => dispatch( getFolder(id) ),
  loadTasks: (id) => dispatch( loadTasks(id) )
})


export default connect(mapStateToProps, mapDispatchToProps)(
  SideBar
);

