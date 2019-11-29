import React, { Component } from "react";
import {connect} from 'react-redux';
import axios from "axios";
import {useHistory, Redirect} from 'react-router-dom';

import {login} from '../../actions/authActions';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
      sent: false,
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    let { formValues } = this.state;
    formValues.email = event.target.email.value;
    formValues.password = event.target.password.value;
    this.setState({ formValues });
    this.props.login(formValues);
    this.setState({sent: true})
    console.log(this.props);
  }; 

  
  

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <label> Username</label>
          <input type="text" name="email"></input>
          <label> Password</label>
          <input type="password" name="password"></input>
          <input style={this.state.sent ? {backgroundColor:"green"} : null}type="submit" name="submit"></input>        
      </form>
    );
  }
}



const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});




export default connect(mapStateToProps,{login})(Form)
