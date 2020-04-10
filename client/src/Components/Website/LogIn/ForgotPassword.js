import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { forgotPassword, resetAuth } from "../../../actions/authActions";

const ForgotPassword = ({ forgotPassword, success, resetAuth }) => {
  let [value, setValue] = useState({
    email: "",
  });

  let [sent, setSent] = useState(false);

  useEffect(() => {
    if (success === true) {
      setSent(false);
    }
  }, [success, forgotPassword]);

  useEffect(() => {
    return () => {
      resetAuth();
    };
  }, []);

  let handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(value);
    setSent(true);
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
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="emal"></label>
          <input
            placeholder="eg: frank@paddys.com"
            type="text"
            name="email"
            onChange={(e) => {
              setValue({
                email: e.target.value,
              });
            }}
          ></input>
          <span></span>
          {sent ? (
            <div className="loader"></div>
          ) : (
            <input
              className={success ? "success" : null}
              id="f_submit"
              type="submit"
              name="submit"
              value={success ? "Sent!" : "Submit"}
            ></input>
          )}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    success: state.auth.forgetRes,
  };
};

const mapDispatchToProps = (dispatch) => ({
  forgotPassword: (value) => dispatch(forgotPassword(value)),
  resetAuth: () => dispatch(resetAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
