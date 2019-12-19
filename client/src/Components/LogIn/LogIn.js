import React, { Component } from "react";
import {connect} from 'react-redux'

import Form from "./Form";

 class LogIn extends Component {


  render() {
    
    return (
      <div className="center_container">
        <div className="login_container">
          <h1>Welcome</h1>
          <div className="form_container">
            <Form history={this.props.history} />
          </div>
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
})


export default connect(mapStateToProps)(LogIn)



