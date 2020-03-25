import React, { Component } from "react";

import Github from "../../../images/github.svg";
import Google from "../../../images/google.svg";

class SocialLogin extends Component {
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
            <img alt="Sign up with Github" src={Github}></img>
          </span>
          <p>
            <a href={process.env.REACT_APP_GITHUB}>Sign up with Github</a>
          </p>
        </div>
      </div>
    );
  }
}

export default SocialLogin;
