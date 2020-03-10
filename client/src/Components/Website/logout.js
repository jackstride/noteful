import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";

class Logout extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="section_logout">
        <h2>Are you sure you want to logout?</h2>
        <p>Click the link below to continue</p>
        <h2 onClick={this.props.logout}>Click here</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  };
};

export default connect(mapStateToProps, { logout })(Logout);
