import React, { Component, Fragment, useState } from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
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
  }

  toggleAddFolder = () => {
    this.setState({ isShown: !this.state.isShown });
  };

  showFolders = () => {
    return (
    <ul>
    {this.props.folder.map((key, index) => (
      <li><Link to="#">{key.folder_name}</Link></li>
    ))}
    </ul>
    )
  }

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
        <div className="folder_names">
          {this.showFolders()}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {  
  return {
  userId: state.auth.user._id,
  folder: state.folder.data
}
}

export default connect(mapStateToProps, {addFolder,getFolder}) (Folders);


let FolderSubmit = props => {

  const hanldeSubmit = e => {
    e.preventDefault();
    let folderValue = {};
    folderValue.folder_name = e.target.folder_name.value;
    folderValue.id = props.userid
    props.addFolder(folderValue);
  };

  return (
    <Fragment>
      <form className="f_form" onSubmit={hanldeSubmit}>
        <input name="folder_name" type="text"></input>
        <input type="submit"></input>
      </form>
    </Fragment>
  );
};
