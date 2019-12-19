import React, { Component } from "react";
import {Link} from 'react-router-dom'

import Space from "../..//images/shapes.svg";

import R_Form from "./R_Form";
import Auth0 from './Auth0'

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
              <Auth0 history={this.props.history} />
              <R_Form />
            </div>
        </div>
      </div>
      </div>
    );
  }
}
