import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { login } from "../../../actions/authActions";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
      sent: false
    };
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    return true;
  }

  handleSubmit = event => {
    event.preventDefault();
    let { formValues } = this.state;
    formValues.email = event.target.email.value;
    formValues.password = event.target.password.value;
    this.setState({ formValues });
    this.props.login(formValues);
    this.setState({ sent: true });
  };

  render() {
    return (
      <form className="auth_form" onSubmit={this.handleSubmit}>
        <input type="text" name="email" placeholder="Email Address"></input>
        <input type="password" name="password" placeholder="Password"></input>
        <p style={{ alignSelf: "start" }}> Forgot your password? Click Here</p>
        <input
          style={this.state.sent ? { backgroundColor: "green" } : null}
          type="submit"
          value="Login"
        ></input>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  };
};

export default connect(mapStateToProps, { login })(Form);
