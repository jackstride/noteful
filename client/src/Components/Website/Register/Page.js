import React, { useState, useEffect, Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { clearErrors } from "../../../actions/errorActions";
import RegisterForm from "./registerForm";
import SocialAuth from "./socialAuth.js";
import { ReactComponent as Logo } from "../../../images/noteful_blue.svg";
import RegisterImage from "../../../images/register_image.png";
import ShowError from "../ShowError";

const Register = ({ history, message, clearErrors }) => {
  const [error, setError] = useState();
  let [sent, setSent] = useState(false);
  let [show, setShow] = useState(true);

  useEffect(() => {
    setError(message);
    setSent(false);
  }, [message]);

  useEffect(() => {
    return () => clearErrors();
  }, []);

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
                sent={sent}
                toggleSent={() => {
                  setSent(!sent);
                }}
              />
              <SocialAuth />
            </div>
          </div>
        </div>
        <div className="register_image">
          <div className="register_content">
            <div className="heading">
              <h2>
                Take your notes with <br></br>you everywhere.
              </h2>
              <p>
                Our progressive web app can be installed onto your phone and
                <br></br>
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
      {show ? (
        <ShowError
          toggleShow={() => {
            setShow(false);
            clearErrors();
            setShow(true);
          }}
          message={error}
        />
      ) : null}
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
