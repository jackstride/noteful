import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { addFolder } from "../../../actions/FolderActions";

class Folders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShown: false
    };
  }

  toggleAddFolder = () => {
    this.setState({ isShown: !this.state.isShown });
  };

  render() {
    let { isShown } = this.state;
    return (
      <div className="folder_widget">
        <div className="folder_header">
          <h3> Folders</h3>
          <div className="plus" onClick={this.toggleAddFolder}></div>
        </div>
        <div className="folder_content">
          {isShown ? folderSubmit() : null}
          <ul>
            <li>
              <a href="#"> University </a>
            </li>
            <li>
              <a href="#"> Work </a>
            </li>
            <li>
              <a href="#"> Thesis Introuduction </a>
            </li>
            <li>
              <a href="#"> Events </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}


export default Folders

let folderSubmit = props => {
  const hanldeSubmit = e => {
    e.preventDefault();
    let name = e.target.folder_name.value;
    addFolder(name);
  };

  return (
    <Fragment>
      <form onSubmit={hanldeSubmit}>
        <input name="folder_name" type="text"></input>
        <input type="submit"></input>
      </form>
    </Fragment>
  );
};


connect(null,addFolder)(folderSubmit)