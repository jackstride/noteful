import React, { useState, useEffect } from "react";
import { Portal } from "react-portal";
import { connect } from "react-redux";

const HandleMessage = ({ show, isPositive }) => {
  return (
    <Portal>
      <div className="handle_message_container">
        <div
          className={show ? "handle_message show_success" : "handle_message"}
        ></div>
      </div>
    </Portal>
  );
};

const mapStateToProps = state => {
  return {
    show: state.handleResponse.show,
    isPositive: state.handleResponse.isPositive
  };
};

export default connect(mapStateToProps)(HandleMessage);
