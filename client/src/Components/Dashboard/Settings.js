import React, { useEffect } from "react";
import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Profile from "./NavItem/profileIcon";
import Account from "./settings/Account";

const Settings = () => {
  return (
    <div className="settings_container">
      <div className="settings_main">
        <div className="settings_nav">
          <h1> Settings </h1>
          <nav>
            <ul>
              <li>
                <NavLink
                  activeClassName="settings_active"
                  to="/dashboard/settings/account"
                >
                  Account
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="settings_active"
                  to="/dashboard/settings/password"
                >
                  Password
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="settings_active"
                  to="/dashboard/settings/help"
                >
                  Help
                </NavLink>
              </li>
            </ul>
          </nav>
          <hr className="settings_hr"></hr>
        </div>
        <div className="settings_content">
          <Switch>
            <Route path="/dashboard/settings/account" component={Account} />
            <Route path="/dashboard/settings/password" component={Profile} />
            <Route path="/dashboard/settings/help" component={Profile} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Settings;
