import React, { Component } from "react";

import Form from "./Form";

export default class LogIn extends Component {
  render() {
    return (
      <div className="center_container">
        <div className="login_container">
          <div className="form_container">
            <Form />
          </div>
        </div>
      </div>
    );
  }
}
