import React, { Component } from "react";
import {Link} from 'react-router-dom'
import Navigation from '../Website/Navigation'

import Space from "../..//images/register_space.png";

import R_Form from "./R_Form";
import Auth0 from './Auth0'

export default class Register extends Component {
  render() {
    return (
      <div>
          <Navigation/>
        <div className="reg_container">        
          <div className="left">
            <div className="register_text">
            <h2>Access Notes, tasks<br></br> and much more<br></br> from anywhere.</h2>
            </div>
            <img src={Space}></img>
          </div>
          <div className="right">
          <div className="form_container">
              <h2> Create Your Free Account </h2>
              <span>Already have an account? <Link to="/login">Click Here</Link></span>
              <Auth0 history={this.props.history} />
              <R_Form />
            </div>
        </div>
      </div>
      </div>
    );
  }
}
