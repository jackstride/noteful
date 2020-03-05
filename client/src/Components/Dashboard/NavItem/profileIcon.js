import React from "react";
import { randomColor } from "../../../helpers/helperFunctions";
import { connect } from "react-redux";

const ProfileIcon = ({ handleClick, name }) => {
  return (
    <div
      onClick={() => {
        if (handleClick) {
          return handleClick();
        } else {
          return null;
        }
      }}
      className="profile_image"
    >
      <div style={{ backgroundColor: randomColor() }} className="p_image">
        <span>{name[0]}</span>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    name: state.auth.user.firstName
  };
};

export default connect(mapStateToProps)(ProfileIcon);
