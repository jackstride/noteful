import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import Form from "./loginForm";
import SocialAuth from "../Register/socialAuth";
import { ReactComponent as Jumping } from "../../../images/jumping.svg";
import { clearErrors } from "../../../actions/errorActions";
import { ReactComponent as Logo } from "../../../images/noteful_blue.svg";
import { Link } from "react-router-dom";
import { loadUser } from "../../../actions/authActions";

const LogIn = props => {
  let [errors, setErrors] = useState("");
  useEffect(() => {
    props.loadUser();
    setErrors(props.error);
    return () => {
      props.clearErrors();
    };
  }, [props.error]);

  return (
    <section className="login">
      <div className="log_left">
        <div className="login_container">
          <div className="form_container">
            <Link to="/">
              <Logo />
            </Link>
            <h2>Welcome Back!</h2>
            {errors ? <h2>{errors}</h2> : null}
            <p>
              Don't have an account? <span>Sign up</span>
            </p>
            <Form history={props.history} />
            <p style={{ margin: "20px 0px", textAlign: "center" }}>
              - - - - - - - - Or - - - - - - - -{" "}
            </p>
            <SocialAuth />
          </div>
        </div>
      </div>
      <div className="log_right">
        <Jumping />
      </div>
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
