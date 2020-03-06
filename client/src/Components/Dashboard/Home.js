import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import SideNav from "../SideNav";
import { loadUser } from "../../actions/authActions";
import { getFolder } from "../../actions/FolderActions";
import Editor from "../TextEditor/Editor";
import Folders from "./Folders/Folders";
import Summary from ".//Summary/Summary";
import { setDarkMode } from "../../helpers/helperFunctions";
import Search from "./Search";

import Settings from "./Settings";

class Home extends Component {
  componentDidMount() {
    setDarkMode();
  }

  componentDidMount() {
    this.props.getFolder(this.props.id);
  }
  render() {
    return (
      <div className="app_container">
        <BrowserRouter>
          <SideNav />
          <Switch>
            <Route exact path="/dashboard" component={Summary} />
            <Route exact path="/dashboard/settings" component={Settings} />
            <Route exact path="/dashboard/:folder" component={Folders} />
            <Route exact path="/dashboard/notes/:notes" component={Editor} />
            <Route exact path="/dashboard/search/search" component={Search} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.isAuthenticated,
    id: state.auth.user._id
  };
};

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(loadUser()),
  getFolder: id => dispatch(getFolder(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
