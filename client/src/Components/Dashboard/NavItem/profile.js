import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontawesome";

let profile = props => {
  return (
    //Get the Name and profile photo
    <div className="profile_container">
      <div className="profile_image">
        <div className="p_image">
        </div>
      </div>
      <div className="profile_logout">
        <h4>Jack Stride</h4>
        <Link to="/logout">Logout</Link>
      </div>
      <div className="profile_setting">
        <FontAwesomeIcon
          className="font_icon"
          style={{ color: "#323232" }}
          icon="cog"
          size="xs"
        />
      </div>
    </div>
  );
};

export default profile;
