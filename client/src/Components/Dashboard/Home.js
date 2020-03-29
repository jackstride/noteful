import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { loadUser } from "../../actions/authActions";
import { getFolder } from "../../actions/FolderActions";
import Editor from "../TextEditor/Editor";
import FolderResult from "./Results/FolderResults";
import Summary from ".//Summary/Summary";
import { setDarkMode } from "../../helpers/helperFunctions";
import ContextMenuManager from "../contextMenu/contextMenuManager";
import HandleMessage from "../HandleMessages/handlemessage";
import TopBar from "./TopBar";
import ShortcutAdd from "./ShortcutAdd";

import Settings from "./Settings";

const Home = ({ getFolder, auth, id, isDark }) => {
  useEffect(() => {
    getFolder(id);
  }, [id]);

  return (
    <div className={isDark ? "app_container dark-mode" : "app_container"}>
      <BrowserRouter>
        <ContextMenuManager />
        <HandleMessage />
        <ShortcutAdd />
        <TopBar />
        <Switch>
          <Route path="/dashboard/settings" component={Settings} />
          <Route
            exact
            path="/dashboard/folder/:folder"
            component={FolderResult}
          />
          <Route exact path="/dashboard/notes/:notes" component={Editor} />
          <Route path="/dashboard" component={Summary} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth.isAuthenticated,
    id: state.auth.user._id,
    isDark: state.misc.isDark
  };
};

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(loadUser()),
  getFolder: id => dispatch(getFolder(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
