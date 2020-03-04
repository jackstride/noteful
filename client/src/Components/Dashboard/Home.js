import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import SideNav from "../SideNav";
import { loadUser } from "../../actions/authActions";
import Editor from "../TextEditor/Editor";
import Folders from "./Folders/Folders";
import Summary from "./Summary";

import Settings from "./Settings";

class Home extends Component {
  render() {
    return (
      <div className="app_container">
        <BrowserRouter>
          <SideNav />
          <Switch>
            <Route path="/dashboard" component={Summary} />
            <Route path="/dashboard/settings" component={Settings} />
            <Route exact path="/dashboard/:folder" component={Folders} />
            <Route exact path="/dashboard/notes/:notes" component={Editor} />
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
