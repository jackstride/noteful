import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { register } from "../../../actions/authActions";

class R_Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
      errors: []
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ errors: [] });
    let { formValues } = this.state;
    formValues.firstName = event.target.firstName.value;
    formValues.lastName = event.target.lastName.value;
    formValues.email = event.target.email.value;
    formValues.password = event.target.password.value;
    this.setState({ formValues });
    this.props.register(formValues);
  };

  render() {
    return (
      <div>
        {this.state.errors.length > 0 ? (
          <div className="register_errors">
            <h2>There appears to be some errors:</h2>
            {this.state.errors.map((error, index) => {
              return (
                <li key={`${error}${index}`}>
                  <span className="error">{error}</span>
                </li>
              );
            })}
          </div>
        ) : null}
        <form className="auth_form" onSubmit={this.handleSubmit}>
          <label for="name">First Name</label>
          <input type="text" name="firstName" placeholder="eg: John"></input>
          <label for="lastName">Last Name</label>
          <input
            className={{}}
            type="text"
            name="lastName"
            placeholder="eg: Smith"
          ></input>
          <label for="email">Last Name</label>
          <input
            type="text"
            name="email"
            placeholder="example@noteful.app"
          ></input>
          <label for="password">Last Name</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
          ></input>
          <span></span>
          <input type="submit" name="submit" value="Sign up"></input>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register })(R_Form);
