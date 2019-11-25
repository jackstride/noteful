import React, { Component } from "react";
import axios from "axios";

export default class R_Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {}
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    let { formValues } = this.state;

    formValues.firstName = event.target.firstName.value;
    formValues.lastName = event.target.lastName.value;
    formValues.email = event.target.email.value;
    formValues.password = event.target.password.value;

    this.setState({formValues});

    axios.post("/register", this.state)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {" "}
        ¦<label>First Name</label>
        <input type="text" name="firstName"></input>
        <label>Last Name</label>
        <input type="text" name="lastName"></input>
        <label>Email Address</label>
        <input type="text" name="email"></input>
        <label>Password</label>
        <input type="password" name="password"></input>
        <input type="submit" name="submit"></input>
      </form>
    );
  }
}
