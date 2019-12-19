import React, { Component } from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";

import {login} from '../../../actions/authActions';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
      sent: false,
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
  }
  


  handleSubmit = (event) => {
    event.preventDefault();
    let { formValues } = this.state;
    formValues.email = event.target.email.value;
    formValues.password = event.target.password.value;
    this.setState({ formValues });
    this.props.login(formValues);
    this.setState({sent: true})
    this.props.history.push("/dashboard");
    console.log("FORMJS");
  }; 
    
  render() {
    return (      
      <form onSubmit={this.handleSubmit}>
          <input type="text" name="email" placeholder="Email Address"></input>
          <input type="password" name="password" placeholder="Password"></input>
          <input style={this.state.sent ? {backgroundColor:"green"} : null}type="submit" name="submit"></input>        
      </form>
    );
  }
}



const mapStateToProps = state => {  
  return {
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
  }
}




export default connect(mapStateToProps,{login})(Form)
