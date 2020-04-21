import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, authed, ...rest }) => {
  useEffect(() => {});
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
