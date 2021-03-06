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
          onClick={() => {
            props.toggle();
          }}
          icon="times"
          color="#e8e8e8"
        />

        {/* {settings ? <Options toggle={openSettings} /> : null} */}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user.firstName
  };
};

export default connect(mapStateToProps, null)(Profile);
