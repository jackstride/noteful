import React, { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontawesome";
import ProfileIcon from "./profileIcon";

let Profile = props => {
  const [settings, openSettings] = useState(false);

  return (
    //Get the Name and profile photo
    <div className="profile_container">
      <ProfileIcon />
      <div className="profile_logout">
        <h4 style={{ color: "black" }}>{props.user}</h4>
      </div>
      <div className="profile_setting">
        <FontAwesomeIcon
          onClick={() => openSettings(!settings)}
          className="font_icon"
          style={{ color: "#323232" }}
          icon="cog"
          size="xs"
        />
        {settings ? <Options /> : null}
      </div>
    </div>
  );
};

let Options = props => {
  let history = useHistory();
  return (
    <nav className="options">
      <ul>
        <li>
          <Link to="/dashboard/settings">Edit your settings</Link>
        </li>
        <li></li>
        <Link to="/logout">Logout</Link>
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
