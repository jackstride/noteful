import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faClock,
  faTasks,
  faStickyNote,
  faCalendarWeek
} from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import Home from "./Home";
import SideNav from "./Components/SideNav";
import Recent from "./Components/Recent";
import TopBar from "./Components/TopBar";
import AddNote from "./AddNote";
import LogIn from "./Components/LogIn/LogIn.js";
import Register from "./Components/Register/Register";
import ToDo from "./Components/ToDo/ToDo";
import { timingSafeEqual } from "crypto";
import { LOGIN_SUCCESS } from "./actions/types";

library.add(faHome, faClock, faTasks, faStickyNote, faCalendarWeek);

class App extends Component {  
  async componentDidMount() {
    await this.props.isAuthenticated();
    console.log(this.props)
  }
  
  LogInContainer = () => {
    return <Route path="/login" component={LogIn} />;
  };

  RegisterContainer = () => {
    return <Route path="/register" component={Register} />;
  };

  DefaultContainer = () => {
    return (
      <div className="app_container">
        <SideNav />
        <TopBar />
        <Route exact path="/" component={Home} />
        <Route path="/recent" component={Recent} />
        <Route path="/AddNote" component={AddNote} />
        <Route path="/ToDo" component={ToDo} />
      </div>
    );
  };

  // Check for authenticaition

  AuthRoute = ({ component: Component, props, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (this.props.auth.isAuthenticated) {
            return <Component {...props} />;
          } 
          else {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: this.props.location }
                }}
              />
            );
          }
        }}
      />
    );
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={this.LogInContainer} />
          <Route exact path="/register" component={this.RegisterContainer} />
          <this.AuthRoute component={this.DefaultContainer} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => {
  return {
    isAuthenticated: () => {
      dispatch(loadUser());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);