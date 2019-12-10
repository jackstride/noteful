import React, { Component } from "react";
import { connect } from "react-redux";


class SocialLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: null
        }
    }

  render() {
    return (
      <div className="auth0">
        <input type="submit" onClick={this.handleSubmit} placeholder="GOOGLE"></input>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   link: state.auth.url,
//   isAuth: state.auth.isAuthenticated,
// });

// const mapDispatchToProps = (dispatch,state) => {
//   return {
//     google: () => {
//       dispatch(googleLogin());
//     }
//   };
// };

export default (SocialLogin);
