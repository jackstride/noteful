import React, { useState, useEffect, Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { clearErrors } from "../../../actions/errorActions";

import RegisterForm from "./registerForm";
import SocialAuth from "./socialAuth.js";
import { ReactComponent as Logo } from "../../../images/noteful_blue.svg";
import RegisterImage from "../../../images/register_image.png";

const Register = props => {
  const [error, setError] = useState();

  useEffect(() => {
    if (props.message) {
      setError(props.message);
    }

    return () => {
      props.clearErrors();
    };
  }, [props.message]);

  return (
    <Fragment>
      <section className="register">
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
              {error ? (
                <span className="error">Error: {error.toString()}</span>
              ) : null}
            </div>
            <RegisterForm />

            <SocialAuth history={props.history} />
          </div>
        </div>
        <div className="register_image">
          <div className="register_content">
            <div className="heading">
              <h3>Take your notes with you everywhere.</h3>
              <p>
                Our progressive webb app can be installed onto your phone and
                inside your browser! Like any other normal app.
              </p>
            </div>
            <div className="register_image">
              <img src={RegisterImage} alt="Register with noteful"></img>
            </div>
            <div className="register_social">
              <FontAwesomeIcon
                icon={["fab", "twitter"]}
                color="white"
                size="2x"
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={["fab", "instagram"]}
                color="white"
                size="2x"
              ></FontAwesomeIcon>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    message: state.error.message
  };
};

const mapDispatchToProps = () => dispatch => ({
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
