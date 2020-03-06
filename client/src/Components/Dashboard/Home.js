import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import SideNav from "../SideNav";
import { loadUser } from "../../actions/authActions";
import Editor from "../TextEditor/Editor";
import Folders from "./Folders/Folders";
import Summary from "./Summary";
import { setDarkMode } from "../../helpers/helperFunctions";
import Search from "./Search";

import Settings from "./Settings";

class Home extends Component {
  componentDidMount() {
    setDarkMode();
  }
  // Maybe update this
  // componentDidMount() {
  //   if (this.props.auth) {
  //     this.props.loadUser();
  //   } else {
  //     this.props.history.push("/");
  //   }
  // }
  render() {
    return (
      <div className="app_container">
        <BrowserRouter>
          <SideNav />
          <Switch>
            <Route exact path="/dashboard" component={Summary} />
            <Route path="/dashboard/settings" component={Settings} />
            <Route exact path="/dashboard/:search" component={Search} />
            <Route exact path="/dashboard/:folder" component={Folders} />
            <Route exact path="/dashboard/notes/:notes" component={Editor} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(loadUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
