import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import Logo from "../../images/noteful_bw.svg";

export default class Navigation extends Component {
  render() {
    return (
      <div className="web_nav">
        <div className="inner_container center_center">
          <img alt="NoteFul Logo" src={Logo}></img>
          <nav className="website_nav">
            <ul>
              <li>
                <Link to="/dashboard">Features</Link>
              </li>
              <li>
                <Link to="/dashboard">About</Link>
              </li>
              <li>
                <Link to="/dashboard">Support</Link>
              </li>
            </ul>
          </nav>
          <nav className="website_nav_login">
            <ul>
              <li>
                <Link to="/dashboard">Sign Up</Link>
              </li>
              <span className="circle_border">
              <li>
                <Link to="/dashboard">Login</Link>
              </li>
              </span>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
