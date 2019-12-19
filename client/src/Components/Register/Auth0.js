import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { googleLogin } from "../../actions/authActions";

import Twitter from "../../images/twitter.svg";
import Google from "../../images/google.svg";

class SocialLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null
    };
  }

  handleSubmit = () => {
    // this.props.google();
  };

  render() {
    return (
      <div className="auth0">
        <div className="google_auth">
          <span>
            <img src={Google}></img>
          </span>
          <p><a href="http://localhost:5000/auth/google">Sign up with Google</a></p>
        </div>
        <div className="twitter_auth">
          <span>
            <img src={Twitter}></img>
          </span>
          <p>Sign up with google</p>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   link: state.auth.url,
//   isAuth: state.auth.isAuthenticated,
// });

const mapDispatchToProps = dispatch => {
  return {
    google: () => {
      dispatch(googleLogin());
    }
  };
};

export default connect(null, mapDispatchToProps)(SocialLogin);
