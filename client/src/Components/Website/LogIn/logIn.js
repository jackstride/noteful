import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import Form from "./loginForm";
import SocialAuth from "../Register/socialAuth";
import { ReactComponent as Jumping } from "../../../images/jumping.svg";
import { clearErrors } from "../../../actions/errorActions";
import { ReactComponent as Logo } from "../../../images/noteful_blue.svg";
import { Link } from "react-router-dom";
import { loadUser } from "../../../actions/authActions";

const LogIn = ({ isAuth, errors, clearErrors, loadUser, history }) => {
  let [loginErrors, setErrors] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    setErrors(errors);
    return () => {
      clearErrors();
    };
  }, [errors]);

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
              {errors ? <h2>{errors}</h2> : null}
              <p>
                Sign up for an account? <Link to="/register">Sign up</Link>
              </p>
            </div>
            <Form history={history} />
            <p style={{ margin: "10px 0px" }}>
              Forgot your password? Click here{" "}
            </p>
            <SocialAuth />
          </div>
        </div>
      </div>
      <div className="log_right"></div>
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
