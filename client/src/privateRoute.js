import React, { Component } from "react";

import { BrowserRouter, Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

 function AuthRoute({ component: Component, authed, ...rest },) {
     console.log(authed)
     let test = false;
    return (
        <Route
            {...rest}
            render={props =>
                authed.isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
      );
    }


// const mapStateToProps = (state) => {
//   {
//     console.log(state);
//     return { isAuth: state.auth }; // change this line
//   }
// };

export default withRouter((AuthRoute));