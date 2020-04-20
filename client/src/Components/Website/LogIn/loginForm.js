import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { login } from "../../../actions/authActions";

const Form = ({ isAuthenticated, error, history, login, sent, setSent }) => {
  let [values, setValues] = useState({
    email: " ",
    password: " ",
  });
  let [emptyEmail, setEmptyEmail] = useState(true);
  let [emptyPassword, setEmptyPassword] = useState(true);

  let propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
  };

  useEffect(() => {
    !values.password ? setEmptyPassword(false) : setEmptyPassword(true);
    !values.email ? setEmptyEmail(false) : setEmptyEmail(true);
  }, [values.password, values.email]);

  let handleSubmit = (event) => {
    event.preventDefault();
    login(values);
    setSent();
  };

  return (
    <form
      className="auth_form"
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <label htmlFor="email">Email Address</label>
      <input
        className={!emptyEmail ? "error" : null}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
        type="text"
        name="email"
        placeholder="example@noteful.app"
      ></input>

      <label htmlFor="password">Password</label>
      <input
        className={!emptyPassword ? "error" : null}
        onChange={(e) => setValues({ ...values, password: e.target.value })}
        type="password"
        name="password"
        placeholder="Enter your password"
      ></input>
      <span></span>
      {!sent ? (
        <input
          className="login_submit"
          style={sent ? { backgroundColor: "green" } : null}
          type="submit"
          value="Login"
        ></input>
      ) : (
        <div className="loader"></div>
      )}
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
  };
};

const mapDispatchToProps = () => (dispatch) => ({
  login: (values) => dispatch(login(values)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Form);
