import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logo from "../../images/noteful_blue.svg";
import WhiteLogo from "../../images/noteful_logo.svg";

const Navigation = ({ auth }) => {
  const [light, isLight] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (
      history.location.pathname.includes("reg") ||
      history.location.pathname.includes("log") ||
      history.location.pathname.includes("fea")
    ) {
      isLight(true);
    } else {
      isLight(false);
    }
  }, [history.location.pathname]);

  return (
    <div className="website_navigation">
      <div className="inner_container center_center">
        <div className="tablet_logo">
          <Link to="/">
            {light ? (
              <img alt="NoteFul Logo" src={WhiteLogo}></img>
            ) : (
              <img alt="NoteFul Logo" src={Logo}></img>
            )}
          </Link>
        </div>
        <nav className="website_nav">
          <Link to="/">
            {light ? (
              <img alt="NoteFul Logo" src={WhiteLogo}></img>
            ) : (
              <img alt="NoteFul Logo" src={Logo}></img>
            )}
          </Link>
          <ul>
            <li>
              <Link style={light ? { color: "white" } : null} to="/features">
                Features
              </Link>
            </li>
            <li>
              <Link style={light ? { color: "white" } : null} to="/about">
                About
              </Link>
            </li>
            <li>
              <Link style={light ? { color: "white" } : null} to="/support">
                Support
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="website_nav_login">
          <ul>
            {!auth ? (
              <Fragment>
                <li>
                  <Link
                    style={light ? { color: "white" } : null}
                    to="/register"
                  >
                    Sign Up
                  </Link>
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
      <Mobilenav auth={auth} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Navigation);

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
            <img src={WhiteLogo} alt="Noteful Logo"></img>
          </div>
          <nav>
            <ul>
              {auth ? (
                <div className="dashboard_links">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/logout">Logout</Link>
                  </li>
                </div>
              ) : (
                <div className="dashboard_links">
                  <li>
                    <FontAwesomeIcon icon="user-plus" color="white" />
                    <Link to="/register">Sign Up</Link>
                  </li>
                  <li>
                    <FontAwesomeIcon icon="sign-in-alt" color="white" />
                    <Link to="/login">Login</Link>
                  </li>
                </div>
              )}
              <div className="website_links">
                <hr className="navhr"></hr>
                <li onClick={() => handleOnClick()}>
                  <Link to="/features">Features</Link>
                </li>
                <li onClick={() => handleOnClick()}>
                  <Link to="/about">About</Link>
                </li>
                <li onClick={() => handleOnClick()}>
                  <Link to="/support">Support</Link>
                </li>
              </div>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};
