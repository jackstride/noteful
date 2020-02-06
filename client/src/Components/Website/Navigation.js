import React, { Component } from "react";
import { Link } from "react-router-dom";

import Logo from "../../images/noteful_logo.svg";

export default class Navigation extends Component {
  render() {
    return (
      <div className="website_navigation">
        <div className="inner_container center_center">
          <Link to="/">
          <img alt="NoteFul Logo" src={Logo}></img>
          </Link>
          <nav className="website_nav">
            <ul>
              <li>
                <Link to="/features">Features</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/support">Support</Link>
              </li>
            </ul>
          </nav>
          <nav className="website_nav_login">
            <ul>
              <li>
                <Link to="/register">Sign Up</Link>
              </li>
              <span className="circle_border">
              <li>
                <Link to="/login">Login</Link>
              </li>
              </span>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
