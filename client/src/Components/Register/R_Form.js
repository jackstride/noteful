import React, { Component } from "react";
import axios from "axios";

export default class R_Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
      errors: [],      
    };
  }

  validate = (formValues) => {
    
    let errors = [];
    console.log(errors);

    if (!formValues.firstName) {
      errors.push('Please Enter your first name.')
    }
    if (!formValues.lastName) {
      errors.push('Please Enter your last name.')
    }
    if (!formValues.email.includes("@")) {
      errors.push('Please enter a valid email address.')
    }
    if (!formValues.password) {
      errors.push('Please enter a strong password.')
    }
    if(errors.length === 0) {
      return true;
    }
    if(errors) {
      this.setState(({
        errors
      }))
      return false;
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    let { formValues  } = this.state;

    formValues.firstName = event.target.firstName.value;
    formValues.lastName = event.target.lastName.value;
    formValues.email = event.target.email.value;
    formValues.password = event.target.password.value;
    this.setState({ formValues});
    this.setState({errors:[]});
    const valid = this.validate(formValues)   
    
    if (valid) {
      console.log("form sent")
      axios
        .post("/register", this.state)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("false");
    }
  };

  

  render() {

document.addEventListener("keyup", function(event) {
  // If "caps lock" is pressed, display the warning text
  if (event.getModifierState("CapsLock")) {
    console.log('down')
  } else {
    console.log('up')
  }
});
  
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name eg. Dave"
        ></input>

        <input
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

      {this.state.errors.length > 0 ?
      <div className ="register_errors">
      <h2> Whoops! There appears to be some errors: Please see below:</h2>
      {this.state.errors.map((error,index) => {
        return(
          <li><span className="error">{error}</span></li>
        )
      })}
       </div> : null
        }
      </div>
    );
  }
}
