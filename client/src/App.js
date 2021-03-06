import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { loadUser } from "./actions/authActions";
import store from "./store";
import Home from "./home";
import Dashboard from "./Components/Dashboard/Home";
import LogIn from "./Components/Website/LogIn/logIn";
import Register from "./Components/Website/Register/Page";
import AuthRoute from "./privateRoute";
import Navigation from "./Components/Website/Navigation";
import Footer from "./Components/Website/Footer";
import LogOut from "./Components/Website/logout";
import Features from "./pages/features.js";
import Support from "./pages/support";
import About from "./pages/About";
import Forgot from "./Components/Website/LogIn/ForgotPassword";
import ScrollTop from "./ScrollTop";
import CookieConsent from "./Components/CookieConsent";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import CookiePolicy from "./pages/cookiepolicy";

class App extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  componentDidMount() {
    // loadUser();
  }

  HomeContainer = () => {
    return (
      <div className="website_container">
        <Fragment>
          <Navigation />
          <CookieConsent />
          <Route exact path="/" component={Home} />
          <Route path="/logout" component={LogOut} />
          <Route path="/features" component={Features} />
          <Route path="/support" component={Support} />
          <Route path="/about" component={About} />
          <Route path="/termsandconditions" component={Terms} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/cookie-policy" component={CookiePolicy} />
          <Footer />
          <ScrollTop />
        </Fragment>
      </div>
    );
  };

  RegisterContainer = () => {
    return (
      <Fragment>
        <Route path="/register" component={Register} />
      </Fragment>
    );
  };

  LoginContainer = () => {
    return (
      <Fragment>
        <Route exact path="/login" render={(props) => <LogIn {...props} />} />
        <Route path="/login/forgot" render={(props) => <Forgot {...props} />} />
      </Fragment>
    );
  };

  DefaultContainer = () => {
    return (
      <Fragment>
        <Route path="/dashboard" component={Dashboard} />
      </Fragment>
    );
  };
  //Route path "/" last as switch mates the first instance
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <AuthRoute
              path="/dashboard"
              authed={this.props.auth}
              component={Dashboard}
            />
            <Route path="/register" component={this.RegisterContainer} />
            <Route path="/login" component={this.LoginContainer} />
            <Route path="/" component={this.HomeContainer} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth.isAuthenticated };
};

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(loadUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
