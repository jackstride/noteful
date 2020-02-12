import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontawesome";

let Profile = props => {

  const [settings,openSettings] = useState(false);

  
  return (
    //Get the Name and profile photo
    <div className="profile_container">
      <div className="profile_image">
        <div className="p_image">
        </div>
      </div>
      <div className="profile_logout">
        <h4 style={{color: "black"}}>{props.user}</h4>
      </div>
      <div className="profile_setting">
        <FontAwesomeIcon onClick={() => openSettings(!settings)} className="font_icon" style={{ color: "#323232" }} icon="cog" size="xs"/>
        {settings ? <Options /> : null}
      </div>
    </div>
  );
};




let Options = (props) => {
  return(
  <nav className="options">
    <ul>
      <li><a href="/settings">Edit your settings</a></li>
      <li><a href="/logout">Logout</a></li>
    </ul>
  </nav>
  )
}


const mapStateToProps = state => {
  return {
    user: state.auth.user.firstName,
  }
}

export default connect(mapStateToProps,null)(Profile)
