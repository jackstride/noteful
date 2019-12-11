import React, { Component } from "react";
import { connect } from "react-redux";
import {googleLogin} from '../../actions/authActions';


class SocialLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: null
        }
    }

    handleSubmit = () => {
      window.location.href ="https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=525473027813-feds73kf7h3ongpbma72ib2uh51ib4ep.apps.googleusercontent.com"
    }

  render() {
    return (
      <div className="auth0">
        <input type="submit" onClick={this.handleSubmit} placeholder="GOOGLE"></input>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   link: state.auth.url,
//   isAuth: state.auth.isAuthenticated,
// });

const mapDispatchToProps = (dispatch) => {
  return {
    google: () => {
      dispatch(googleLogin());
    }
  };
};

export default connect(null,mapDispatchToProps)(SocialLogin);
