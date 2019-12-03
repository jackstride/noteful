import React, { Component } from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from "axios";

import { register } from  '../../actions/authActions';

 class R_Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
      errors: [],      
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps,prevState) {
    const {error} = this.props;
    console.log(error);
    if(error !== prevProps.error) {
     if(error.id === 'REGISTER_FAIL') {
       this.setState({errors: [...prevState.errors, ...error.message.error]});
     }
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({errors: []})
    let { formValues  } = this.state;
    formValues.firstName = event.target.firstName.value;
    formValues.lastName = event.target.lastName.value;
    formValues.email = event.target.email.value;
    formValues.password = event.target.password.value;
    this.setState({ formValues});
    this.props.register(formValues);
}
  

  render(){
// // document.addEventListener("keyup", function(event) {
// //   // If "caps lock" is pressed, display the warning text
// //   if (event.getModifierState("CapsLock")) {
// //     console.log('down')
// //   } else {
// //     console.log('up')
// //   }
// });
  
    return (
      <div>
        {this.state.errors.length > 0 ?
      <div className ="register_errors">
      <h2>There appears to be some errors:</h2>
      {this.state.errors.map((error,index) => {
        return(
          <li key={`${error}${index}`}><span className="error">{error}</span></li>
        )
      })}
       </div> : null
        }
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name eg. Dave"
        ></input>

        <input className={{}}
          type="text"
          name="lastName"
          placeholder="Last Name eg. Smith"
        ></input>

        <input
          type="text"
          name="email"
          placeholder="Email Adress eg. DaveSmith@gmail.com"
        ></input>

        <input type="password" name="password" placeholder="Password"></input>
        <input type="submit" name="submit"></input>
      </form>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})


export default connect(
  mapStateToProps, {register}) (R_Form)