import React, { Component } from "react";

import RegisterForm from "./registerForm";
import SocialAuth from "./socialAuth.js";

export default class Register extends Component {
  render() {
    return (
      <section className="register">
        <div className="reg_container">
          <div className="form_container">
            <h2>Sign up</h2>
            <p>Enjoy all features for free!</p>
            <RegisterForm />
            <span style={{ margin: "20px 0px" }}>
              - - - - - - - - Or - - - - - - - -{" "}
            </span>
            <SocialAuth history={this.props.history} />
          </div>
        </div>
      </section>
    );
  }
}
