import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import Form from "./loginForm";
import SocialAuth from "../Register/socialAuth";
import { clearErrors } from "../../../actions/errorActions";
import { ReactComponent as Logo } from "../../../images/noteful_blue.svg";
import { Link } from "react-router-dom";
import { loadUser } from "../../../actions/authActions";
import ShowError from "../ShowError";

const LogIn = ({ isAuth, errors, clearErrors, loadUser, history }) => {
  let [loginErrors, setErrors] = useState();
  let [sent, setSent] = useState(false);
  let [show, setShow] = useState(true);

  useEffect(() => {
    loadUser();
    setErrors(errors);
    setSent(false);
  }, [errors]);

  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, []);

  return (
    <section className="login">
      <div className="log_left">
        <div className="login_container">
          <div className="form_container">
            <div className="auth_header">
              <Link to="/">
                <Logo className="mobile_change" />
              </Link>
              <h2>Welcome back</h2>
              <p>
                Sign up for an account? <Link to="/register">Sign up</Link>
              </p>
            </div>
            <Form
              setSent={() => {
                setSent(!sent);
              }}
              sent={sent}
              history={history}
            />
            <p style={{ margin: "10px 0px" }}>
              Forgot your password? <Link to="/login/forgot">Click here</Link>
            </p>
            <SocialAuth />
          </div>
        </div>
      </div>
      <div className="log_right"></div>
      {show ? (
        <ShowError
          toggleShow={() => {
            setShow(false);
            clearErrors();
            setShow(true);
          }}
          message={loginErrors}
        />
      ) : null}
    </section>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated,
  errors: state.error.message
});

const mapDispatchToProps = dispatch => ({
  clearErrors: () => dispatch(clearErrors()),
  loadUser: () => dispatch(loadUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
