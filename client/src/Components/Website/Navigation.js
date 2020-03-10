import React, { Component, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Logo from "../../images/noteful_bw.svg";

class Navigation extends Component {
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
              {!this.props.auth ? (
                <Fragment>
                  <li>
                    <Link to="/register">Sign Up</Link>
                  </li>
                  <span className="circle_border">
                    <Link to="/login">Login</Link>
                  </span>
                </Fragment>
              ) : (
                <Fragment>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/logout">Logout</Link>
                  </li>
                </Fragment>
              )}
            </ul>
          </nav>
        </div>
        <Mobilenav auth={this.props.auth} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps, null)(Navigation);

let Mobilenav = ({ auth }) => {
  let [open, isOpen] = useState(false);
  let handleOnClick = () => {
    document.getElementById("nav-icon3").classList.toggle("open");
    isOpen(!open);
  };
  return (
    <div className="ham_nav">
      <div
        onClick={() => {
          handleOnClick();
        }}
        id="nav-icon3"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {open && (
        <div className="open_nav">
          <div className="logo">
            <img src={Logo} alt="Noteful Logo"></img>
          </div>
          <nav>
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
              {auth ? (
                <Fragment>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/logout">Logout</Link>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li>
                    <Link to="/register">Sign Up</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </Fragment>
              )}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};
