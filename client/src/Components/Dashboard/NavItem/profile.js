import React from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontawesome";

let Profile = props => {
  return (
    //Get the Name and profile photo
    <div className="profile_container">
      <div className="profile_image">
        <div className="p_image">
        </div>
      </div>
      <div className="profile_logout">
        <h4 style={{color: "black"}}>{props.user}</h4>
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


const mapStateToProps = state => {
  return {
    user: state.auth.user.firstName,
  }
}

export default connect(mapStateToProps,null)(Profile)
