import React, { useEffect, useState } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import Account from "./settings/Account";
import Password from "./settings/Password";
import { connect } from "react-redux";
import { toggleDarkMode } from "../../actions/MiscAction";

const Settings = ({ toggleDarkMode, isDark }) => {
  let [check, isChecked] = useState();

  useEffect(() => {
    isDark ? isChecked(isDark) : isChecked(isDark);
  }, [isDark, isChecked]);

  let handleToggle = () => {
    toggleDarkMode();
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
                <NavLink activeClassName="settings_active" to="/support">
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
            <Route exact path="/dashboard/settings" component={Account} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isDark: state.misc.isDark,
  };
};

const mapDispatchToProps = () => (dispatch) => ({
  toggleDarkMode: () => dispatch(toggleDarkMode()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
