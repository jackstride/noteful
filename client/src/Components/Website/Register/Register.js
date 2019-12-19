import React, { Component } from "react";
import {Link} from 'react-router-dom'

import Space from "../../../images/shapes.svg";
import RegisterForm from './registerForm';
import SocialAuth from './socialAuth.js';

export default class Register extends Component {
  render() {
    return (
      <div>
        <div className="reg_container">        
          <div className="left">
            <img src={Space}></img>
          </div>
          <div className="right">
          <div className="form_container">
              <h2> Create Your Free Account </h2>
              <span>Already have an account? <Link to="/login">Click Here</Link></span>
              <SocialAuth history={this.props.history} />
              <RegisterForm />
            </div>
        </div>
      </div>
      </div>
    );
  }
}
