import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { loadUser } from "./actions/authActions";
import store from "./store";
import Home from "./home";
import Dashboard from "./Components/Dashboard/Home";
import LogIn from "./Components/Website/LogIn/logIn";
import Register from "./Components/Website/Register/Register";
import AuthRoute from "./privateRoute";
import Navigation from "./Components/Website/Navigation";
import Footer from "./Components/Website/Footer";
import LogOut from "./Components/Website/logout";
import Features from "./pages/features.js";
import Support from "./pages/support";
import About from "./pages/About";

class App extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    store.dispatch(loadUser());
  }

  HomeContainer = () => {
    return (
      <div className="website_container">
        <Navigation />
        <Route exact path="/" component={Home} />
        <Route path="/login" render={props => <LogIn {...props} />} />
        <Route path="/register" component={Register} />
        <Route path="/logout" component={LogOut} />
        <Route path="/features" component={Features} />
        <Route path="/support" component={Support} />
        <Route path="/about" component={About} />
        <Footer />
      </div>
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
              component={this.DefaultContainer}
            />
            <Route path="/" component={this.HomeContainer} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(loadUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
