import React, { Component } from "react";

import Profile from './Dashboard/NavItem/profile';
import Search from './Dashboard/NavItem/search'
export default class SideBar extends Component {

  render() {
    return (
      <div className="dashboard_navigation">
      <Profile />
      <Search />



      </div>
    );
  }
}
