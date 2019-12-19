import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class openNav extends Component {
  render() {
    return (
      <div className="open_nav">
        <nav className="open_navigation">
          <ul>
            <li><Link to="/">Change Display Picture</Link></li>
            <li><Link to="/">Edit Account</Link></li>
            <li><Link to="/">Start Fresh</Link></li>
            <li><Link to="/">Return to main website</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}
