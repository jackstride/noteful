import React, { useEffect } from "react";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./NavItem/profileIcon";

let Test = () => {
  useEffect(() => {
    console.log("hello");
  });
  return (
    <div className="hello">
      <h1>HELLLOOOO</h1>
    </div>
  );
};

const Settings = () => {
  return (
    <div className="settings_container">
      <div className="settings_main">
        <div className="settings_nav">
          <nav>
            <ul>
              <Link to="/dashboard/settings/account">Account</Link>

              <li>
                <Link to="/dashboard/settings/password">Password</Link>
              </li>
              <li>
                <Link to="/dashboard/settings/account">Help</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="settings_content">
          <Switch>
            <Route path="/dashboard/settings/account" component={Profile} />
            <Route path="/dashboard/settings/password" component={Test} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Settings;
