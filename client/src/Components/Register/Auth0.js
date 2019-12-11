import React, { Component } from "react";
import {Link} from 'react-router-dom'
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
     
    // this.props.google();
    }

  render() {
    return (
      <div className="auth0">
        <a href="http://localhost:5000/auth/google">Hello</a>
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
