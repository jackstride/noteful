import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { set } from "mongoose";

const AuthRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? (
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
};

export default AuthRoute;
