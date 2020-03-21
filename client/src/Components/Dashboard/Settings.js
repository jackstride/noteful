import React, { useEffect, useState } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import Profile from "./NavItem/profileIcon";
import Account from "./settings/Account";
import Password from "./settings/Password";

const Settings = () => {
  let [check, isChecked] = useState();

  useEffect(() => {
    let dark = JSON.parse(localStorage.getItem("dark_mode"));
    isChecked(dark);
    dark
      ? document.querySelector(".app_container").classList.add("dark-mode")
      : document.querySelector(".app_container").classList.remove("dark-mode");
  }, [check]);

  let handleToggle = () => {
    isChecked(!check);
    localStorage.setItem("dark_mode", JSON.stringify(!check));
  };

  return (
    <div className="inner_app_container">
      <div className="settings_main">
        <div className="settings_nav">
          <h1> Settings </h1>
          <nav>
            <ul>
              <li>
                <NavLink
                  activeClassName="settings_active"
                  exact
                  to="/dashboard/settings"
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
              <div className="toggle_theme">
                <label className="switch">
                  <input
                    onClick={() => {
                      handleToggle();
                    }}
                    defaultChecked={check}
                    type="checkbox"
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </ul>
          </nav>

          <hr className="settings_hr"></hr>
        </div>
        <div className="settings_content">
          <Switch>
            <Route path="/dashboard/settings/password" component={Password} />
            <Route path="/dashboard/settings/help" component={Profile} />
            <Route exact path="/dashboard/settings" component={Account} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Settings;
