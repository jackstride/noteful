import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontawesome";
import ProfileIcon from "./profileIcon";

let Profile = props => {
  const [settings, openSettings] = useState(false);

  return (
    //Get the Name and profile photo
    <div className="profile_container">
      <Link to="/dashboard">
        <ProfileIcon />
      </Link>
      <div className="profile_name">
        <h5>{props.user}</h5>
      </div>
      <div className="profile_setting">
        <FontAwesomeIcon
          onClick={() => openSettings(!settings)}
          color="#323232"
          icon="cog"
        />

        <FontAwesomeIcon
          onClick={() => {
            props.toggle();
          }}
          icon="times"
          color="#e8e8e8"
        />

        {settings ? <Options toggle={openSettings} /> : null}
      </div>
    </div>
  );
};

let Options = ({ toggle }) => {
  return (
    <nav className="options">
      <ul>
        <li>
          <Link
            onClick={() => {
              toggle(false);
            }}
            to="/dashboard/settings"
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

const mapStateToProps = state => {
  return {
    user: state.auth.user.firstName
  };
};

export default connect(mapStateToProps, null)(Profile);
