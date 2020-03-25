import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { login } from "../../../actions/authActions";

const Form = ({ isAuthenticated, error, history, login }) => {
  let [values, setValues] = useState({
    email: "",
    password: ""
  });
  let [sent, setSent] = useState(false);

  let propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated]);

  let handleSubmit = event => {
    event.preventDefault();
    login(values);
    setSent(true);
  };

  return (
    <form
      className="auth_form"
      onSubmit={event => {
        handleSubmit(event);
      }}
    >
      <input
        onChange={e => setValues({ ...values, email: e.target.value })}
        type="text"
        name="email"
        placeholder="Email Address"
      ></input>
      <input
        onChange={e => setValues({ ...values, password: e.target.value })}
        type="password"
        name="password"
        placeholder="Password"
      ></input>
      <p style={{ alignSelf: "start" }}> Forgot your password? Click Here</p>
      <input
        style={sent ? { backgroundColor: "green" } : null}
        type="submit"
        value="Login"
      ></input>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  };
};

const mapDispatchToProps = () => dispatch => ({
  login: values => dispatch(login(values))
});
export default connect(mapStateToProps, mapDispatchToProps)(Form);
