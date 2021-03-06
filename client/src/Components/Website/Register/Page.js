import React, { useState, useEffect, Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors } from "../../../actions/errorActions";
import RegisterForm from "./registerForm";
import SocialAuth from "./socialAuth.js";
import { ReactComponent as Logo } from "../../../images/noteful_blue.svg";
import ShowError from "../ShowError";

const Register = ({ history, message, clearErrors, redirect }) => {
  const [error, setError] = useState();
  let [sent, setSent] = useState(false);

  let [formError, setFormError] = useState(false);
  let [show, setShow] = useState(true);

  useEffect(() => {
    setError(message);
    setSent(false);
    setShow(true);
    resetErrors();
  }, [message]);

  useEffect(() => {
    return () => {
      resetErrors();
    };
  }, []);

  useEffect(() => {
    if (redirect) {
      history.push("/login");
    }
  }, [redirect]);

  // useEffect(() => {
  //   if (show || formError) {
  //     hideError();
  //   }
  // }, [show]);

  let resetErrors = () => {
    setTimeout(() => {
      clearErrors();
      setFormError(false);
      setShow(false);
    }, 5000);
  };

  return (
    <Fragment>
      <section className="register">
        <div className="reg">
          <div className="reg_container">
            <div className="form_container">
              <div className="auth_header">
                <Link to="/">
                  <Logo className="mobile_change" />
                </Link>
                <h2>Sign up</h2>
                <p>
                  Already have an account? <Link to="/login">Sign in</Link>
                </p>
              </div>
              <RegisterForm
                setErrorForm={() => {
                  setFormError(true);
                }}
                sent={sent}
                toggleSent={() => {
                  setSent(!sent);
                }}
              />
              <SocialAuth />
            </div>
          </div>
        </div>
      </section>
      {show ? (
        <ShowError
          toggleShow={() => {
            // Probably a better way to do this but i'm tired
            setShow(false);
            clearErrors();
            setShow(true);
          }}
          message={error}
        />
      ) : null}
      {formError ? (
        <ShowError message="Please ensure all fields are filled" />
      ) : null}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    message: state.error.message,
    redirect: state.auth.redirect,
  };
};

const mapDispatchToProps = () => (dispatch) => ({
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
