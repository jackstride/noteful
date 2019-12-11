import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import PropTypes from "prop-types";
import {
  faHome,
  faClock,
  faTasks,
  faStickyNote,
  faCalendarWeek
} from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import { loadUser, checkAuth } from "./actions/authActions";
import store from "./store";
import Home from "./home";
import Dashboard from "./Components/Dashboard/Home";
import SideNav from "./Components/SideNav";
import Recent from "./Components/Recent";
import TopBar from "./Components/TopBar";
import AddNote from "./AddNote";
import LogIn from "./Components/LogIn/LogIn.js";
import Register from "./Components/Register/Register";
import ToDo from "./Components/ToDo/ToDo";
import AuthRoute from "./privateRoute";

library.add(faHome, faClock, faTasks, faStickyNote, faCalendarWeek);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    store.dispatch(loadUser());
  }

  HomeContainer = () => {
    return <Route path="/" component={Home} />;
  };

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
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/dashboard/recent" component={Recent} />
        <Route path="/dashboard/AddNote" component={AddNote} />
        <Route path="/dashboard/ToDo" component={ToDo} />
      </div>
    );
  };

  render() {
    return (
      <div>
        <h1>{this.props.auth.isAuthenticated.toString()}</h1>
        <BrowserRouter>
          <Switch>
          <Route exact path ="/" component={this.HomeContainer} />
            <Route path="/login" render={props => <this.LogInContainer {...props} />} />
            <Route path ="/register" component={this.RegisterContainer} />
            <AuthRoute path="/dashboard" authed={this.props.auth} component={this.DefaultContainer} />
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
