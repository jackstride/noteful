import React, { Component } from "react";

import { BrowserRouter, Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

 function AuthRoute({ component: Component, authed, ...rest },) {
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
                        }}
                    />
                )
            }
        />
      );
    }




export default (AuthRoute);