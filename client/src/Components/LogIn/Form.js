import React, { Component } from "react";
import { ECONNRESET } from "constants";
import axios from "axios";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {}
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    let { formValues } = this.state;

    formValues.email = event.target.email.value;
    formValues.password = event.target.password.value;
    this.setState({ formValues });

    axios
      .post("/user/login", this.state)
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
        <div>
          <label> Username</label>
          <input type="text" name="email"></input>
          <label> Password</label>
          <input type="password" name="password"></input>
          <input type="submit" name="submit"></input>
        </div>
      </form>
    );
  }
}
