import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'

import Logo from "../../images/noteful_logo.svg";


let isAuth = (props) => {
  return (
    <h1>is logged in</h1>
  )

}

 class Navigation extends Component {
  render() {
    console.log(this.props)
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
              {!this.props.auth ?
              <Fragment>
              <li>
                <Link to="/register">Sign Up</Link>
              </li>
              <span className="circle_border">
              <li>
                <Link to="/login">Login</Link>
              </li>
              </span> 
              </Fragment>
                : 
                <Fragment>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                </Fragment>}
            </ul>
          </nav>
          
  
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps,null)(Navigation);
