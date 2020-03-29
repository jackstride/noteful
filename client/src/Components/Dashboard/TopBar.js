import React, { useState } from "react";
import ProfileIcon from "./NavItem/profileIcon";
import Search from "./NavItem/search";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideNav from "../SideNav";

const TopBar = ({ firstName }) => {
  const [settings, openSettings] = useState(false);
  const [sideNav, setSideNav] = useState(false);

  let closeSettings = () => {
    setSideNav(false);
  };

  return (
    <div className="top_bar">
      <div
        onClick={() => {
          setSideNav(!sideNav);
        }}
        className="app_profile"
      >
        <ProfileIcon />
      </div>
      <div className="search_bar">
        <Search />
      </div>
      {sideNav ? <SideNav toggle={() => setSideNav(!sideNav)} /> : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    firstName: state.auth.user.firstName,
    taskData: state.task.taskData,
    folder: state.folder.data
  };
};

// const mapDispatchToProps = dispatch => ({
//   getFolder: id => dispatch(getFolder(id)),
//   loadTasks: id => dispatch(loadTasks(id))
// });

export default connect(mapStateToProps)(TopBar);

let Options = ({ toggle }) => {
  return (
    <nav className="options">
      <ul>
        <li>
          <Link
            onClick={() => {
              toggle(false);
            }}
            to="/dashboard/settings/account"
          >
            Edit your settings
          </Link>
        </li>
        <li></li>
        <Link
          onClick={() => {
            toggle(false);
          }}
          to="/logout"
        >
          Logout
        </Link>
      </ul>
    </nav>
  );
};
