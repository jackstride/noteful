import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontawesome";
import {logout } from '../../../actions/authActions'

let profile = props => {
  return (
    //Get the Name and profile photo
    <div className="profile_container">
      <div className="profile_image">
        <div
          style={{
            width: "25px",
            height: "25px",
            borderRadius: "50%",
            backgroundColor: "black"
          }}
        ></div>
      </div>
      <div className="profile_logout">
        <h4>Jack Stride</h4>
        <Link to="/logout">LogOut</Link>
      </div>
      <div className="profile_setting">
        <FontAwesomeIcon
          className="font_icon"
          style={{ color: "#323232" }}
          icon="cog"
          size="2x"
        />
      </div>
    </div>
  );
};

export default profile;
