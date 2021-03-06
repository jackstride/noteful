import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { register } from "../../../actions/authActions";

const R_Form = ({
  register,
  isAuthenticated,
  sent,
  toggleSent,
  setErrorForm,
}) => {
  let [formValues, setValues] = useState({
    firstName: " ",
    lastName: " ",
    email: " ",
    password: " ",
  });

  // let propTypes = {
  //   isAuthenticated: PropTypes.bool,
  //   error: PropTypes.object.isRequired,
  //   register: PropTypes.func.isRequired
  // };

  // Strips away a space to see if the field is empty of not.
  let checkFields = () => {
    let valid = false;
    formValues.firstName.replace(/\s+/g, "") &&
    formValues.lastName.replace(/\s+/g, "") &&
    formValues.email.replace(/\s+/g, "") &&
    formValues.password.replace(/\s+/g, "")
      ? (valid = true)
      : (valid = false);

    return valid;
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (checkFields()) {
      toggleSent();
      register(formValues);
    } else {
      setErrorForm();
    }
  };

  return (
    <div>
      <form
        method="post"
        className="auth_form"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="name">First Name</label>
        <input
          className={!formValues.firstName ? "error" : null}
          onChange={(e) => {
            setValues({
              ...formValues,
              firstName: e.target.value,
            });
          }}
          type="text"
          name="firstName"
          placeholder="eg: John"
        ></input>
        <label htmlFor="lastName">Last Name</label>
        <input
          className={!formValues.lastName ? "error" : null}
          onChange={(e) => {
            setValues({
              ...formValues,
              lastName: e.target.value,
            });
          }}
          type="text"
          name="lastName"
          placeholder="eg: Smith"
        ></input>
        <label htmlFor="email">Last Name</label>
        <input
          className={!formValues.email ? "error" : null}
          onChange={(e) => {
            setValues({
              ...formValues,
              email: e.target.value,
            });
          }}
          type="text"
          name="email"
          placeholder="example@noteful.app"
        ></input>
        <label htmlFor="password">Last Name</label>
        <input
          className={!formValues.password ? "error" : null}
          onChange={(e) => {
            setValues({
              ...formValues,
              password: e.target.value,
            });
          }}
          type="password"
          name="password"
          placeholder="Enter your password"
        ></input>
        <span></span>
        {sent ? (
          <div className="loader"></div>
        ) : (
          <input type="submit" name="submit" value="Sign up"></input>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = () => (dispatch) => ({
  register: (values) => dispatch(register(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(R_Form);
