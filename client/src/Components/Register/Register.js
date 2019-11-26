import React, { Component } from "react";
import {Link} from 'react-router-dom'

import Logo from "../..//images/noteful_logo_blue.svg";

import R_Form from "./R_Form";

export default class Register extends Component {
  render() {
    return (
      <div>
        <div className="reg_container">
          <div className="left">
            <div className="form_container">
              <div className="reg_logo">
                <img src={Logo} alt="Noteful Logo"></img>
              </div>
              <h2> Create Your Free Account </h2>
              <span>Already have an account? <Link to="/login">Click Here</Link></span>
              <R_Form />
            </div>
          </div>
          <div className="right"></div>
        </div>
      </div>
    );
  }
}
