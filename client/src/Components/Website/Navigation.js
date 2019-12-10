import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import Logo from '../../images/noteful_logo_blue.svg'

export default class Navigation extends Component {
  render() {
    return (
      <div className="web_nav">
          <img alt='NoteFul Logo' src={Logo}></img>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Features</Link>
              <Link to="/dashboard">About</Link>
              <Link to="/dashboard">Support</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
