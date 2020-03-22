import React, { Component } from "react";

import Twitter from "../../../images/twitter.svg";
import Google from "../../../images/google.svg";

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
      <div className="social_auth">
        <div className="google_auth">
          <span>
            <img alt="Sign up with google" src={Google}></img>
          </span>
          <p>
            <a href={process.env.REACT_APP_GOOGLE}>Sign up with Google</a>
          </p>
        </div>
        <div className="twitter_auth">
          <span>
            <img alt="Sign up with Twitter" src={Twitter}></img>
          </span>
          <p>
            <a href={process.env.REACT_APP_TWITTER}>Sign up with Twitter</a>
          </p>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   link: state.auth.url,
//   isAuth: state.auth.isAuthenticated,
// });

export default SocialLogin;
