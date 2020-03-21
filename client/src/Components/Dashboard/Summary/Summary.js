import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import SummaryFolder from "./SummaryFolder";
import SummaryNotes from "./SummaryNotes";
import SummaryTask from "./SummaryTask";
import { getNotes } from "../../../actions/NoteActions";
import { getFolder } from "../../../actions/FolderActions";

let Summary = ({ id, notes, getNotes, folder }) => {
  let [data, setData] = useState();

  useEffect(() => {
    getNotes(id);
    getFolder(id);
    setData(folder);
  }, [id]);

  return (
    <div className="inner_app_container">
      <div className="summaries">
        <div className="summaries_nav">
          <h1> Summary</h1>
          <ul>
            <li>
              <NavLink activeClassName="summary_active" exact to="/dashboard">
                Folders
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="summary_active" to="/dashboard/notes">
                Notes
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="summary_active" to="/dashboard/tasks">
                Tasks
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="summary_active" to="/dashboard/stats">
                Stats
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="summary_content">
          <Switch>
            <Route
              path="/dashboard/notes"
              render={props => (
                <SummaryNotes folder={folder} notes={notes} {...props} />
              )}
            />
            <Route path="/dashboard/stats" component={SummaryFolder} />
            <Route path="/dashboard/tasks" component={SummaryTask} />

            <Route
              exact
              path="/dashboard"
              render={props => (
                <SummaryFolder data={folder} notes={notes} {...props} />
              )}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    id: state.auth.user._id,
    notes: state.note.noteData,
    tasks: state.task.taskData,
    folder: state.folder.data
  };
};

const mapDispatchToProps = dispatch => ({
  getNotes: id => dispatch(getNotes(id)),
  getFolder: id => dispatch(getFolder(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
