import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "./loginForm";
import SocialAuth from "../Register/socialAuth";
import { ReactComponent as Jumping } from "../../../images/jumping.svg";
import { clearErrors } from "../../../actions/errorActions";

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showErrors: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ showErrors: this.props.errors });
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  render() {
    return (
      <section className="login">
        <div className="log_left">
          <div className="login_container">
            <div className="form_container">
              <h2>Welcome Back!</h2>
              {this.state.showErrors.length ? (
                <h2> There appears to be an errors</h2>
              ) : null}
              <p>
                Don't have an account? <span>Sign up</span>
              </p>
              <Form history={this.props.history} />
              <p style={{ margin: "20px 0px", textAlign: "center" }}>
                - - - - - - - - Or - - - - - - - -{" "}
              </p>
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
  isAuth: state.auth.isAuthenticated,
  errors: state.error.message
});

const mapDispatchToProps = dispatch => ({
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
