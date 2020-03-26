import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { forgotPassword } from "../../../actions/authActions";

const ForgotPassword = ({ reset }) => {
  let [value, setValue] = useState({
    email: ""
  });

  let handleSubmit = e => {
    e.preventDefault();
    reset(value);
  };

  return (
    <div className="forgot">
      <div className="forgot_container">
        <div className="forgot_heading">
          <h2> Forgot your password?</h2>
          <p>Please enter your email below</p>
        </div>
        <form
          className="auth_form"
          method="post"
          onSubmit={e => handleSubmit(e)}
        >
          <label htmlFor="emal"></label>
          <input
            placeholder="eg: frank@paddys.com"
            type="text"
            name="email"
            onChange={e => {
              setValue({
                email: e.target.value
              });
            }}
          ></input>
          <span></span>
          <input type="submit" name="submit" value="Submit"></input>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  reset: value => dispatch(forgotPassword(value))
});

export default connect(null, mapDispatchToProps)(ForgotPassword);
