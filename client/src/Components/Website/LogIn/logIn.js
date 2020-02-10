import React, { Component } from "react";
import {connect} from 'react-redux'

import Form from "./loginForm";
import SocialAuth from '../Register/socialAuth'
import { loadUser } from "../../../actions/authActions";
import {ReactComponent as Jumping} from'../../../images/jumping.svg';

 class LogIn extends Component {
   constructor(props){
     super(props)

     this.state = {
       auth: false
     }
   }

  render() {

    
    return (
      <section className="login">
          <div className="log_left">
          <div className="login_container">
          <div className="form_container">
          <h2>Welcome Back!</h2>
          <p>Don't have an account? <span>Sign up</span></p>
            <Form history={this.props.history} />
            <p style={{margin:"20px 0px"}}>- - - - - - - -  Or - - - - - - - - </p>
            <SocialAuth />
          </div>
          </div>    
          </div>
          <div className="log_right">
            <Jumping />
          </div>  
        </section>
    );
  }
}



const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
})


export default connect(mapStateToProps)(LogIn)



