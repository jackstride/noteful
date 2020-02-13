import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SideNav from "../SideNav";
import { loadUser } from "../../actions/authActions";
import Editor from '../TextEditor/Editor'

import Settings from "./Settings";

class Home extends Component {
  render() {
    return (
        <div className="app_container">
      <BrowserRouter>
      <SideNav />
        <Switch>
          <Route path="/dashboard/settings" component={Settings} />
          <Route path="/dashboard/notes/" component={Editor} />
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(loadUser())
});

export default connect(null, mapDispatchToProps)(Home);
