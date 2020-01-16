import React, { Component, Fragment, useState } from "react";
import { connect, useDispatch } from "react-redux";

import { addFolder, getFolder } from "../../../actions/FolderActions";

class Folders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false, 
    };
  }


  componentDidMount(){
    this.props.getFolder(this.props.userId);
    console.log(this.props);
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
          {isShown ? <FolderSubmit addFolder={this.props.addFolder} userid={this.props.userId} /> : null}
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
const mapStateToProps = state => {  
  return {
  userId: state.auth.user._id,
}
}

export default connect(mapStateToProps, {addFolder,getFolder}) (Folders);

let FolderSubmit = props => {

  const hanldeSubmit = e => {
    e.preventDefault();
    let folderValue = {};
    folderValue.name = e.target.folder_name.value;
    folderValue.id = props.userid
    props.addFolder(folderValue);
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
