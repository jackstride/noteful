import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { loadUser, checkAuth } from "./actions/authActions";
import store from "./store";
import Home from "./home";
import Dashboard from "./Components/Dashboard/Home";
import LogIn from "./Components/Website/LogIn/logIn.js";
import Register from "./Components/Website/Register/Register";
import AuthRoute from "./privateRoute";
import Navigation from "./Components/Website/Navigation";
import Footer from './Components/Website/Footer';
import LogOut from './Components/Website/logout.js';


class App extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    store.dispatch(loadUser());
  }

  HomeContainer = () => {
    return (
      <div>
      <Navigation />
      <Route exact path="/" component={Home} />
      <Route path="/login" render={props => <LogIn {...props} />} />
      <Route path ="/register" component={Register} />
      <Route path ="/logout" component={LogOut} />
      <Footer />
      </div>
      ) 
  };

  DefaultContainer = () => {
    return (
      <div className="app_container">
        <Route path="/dashboard" component={Dashboard} />
      </div>
    );
  };
//Route path "/" last as switch mates the first instance
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <AuthRoute path="/dashboard" authed={this.props.auth} component={this.DefaultContainer} />
            <Route path ="/" component={this.HomeContainer} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(App);