import React, { useState, useEffect } from "react";
import { Portal } from "react-portal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({ message, toggleShow }) => {
  return message ? (
    <Portal>
      <div onClick={toggleShow} className="error_container">
        <FontAwesomeIcon icon="exclamation" color="white" />
        <div className="content">
          <p>{message}</p>
        </div>
      </div>
    </Portal>
  ) : null;
};
