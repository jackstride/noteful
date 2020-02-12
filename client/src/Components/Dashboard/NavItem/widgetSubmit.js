import React, { Fragment } from "react";
import {connect} from 'react-redux';
import {toggleFolderOpen} from "../../../actions/FolderActions";

let widgetSubmit = props => {
  const hanldeSubmit = e => {
    e.preventDefault();
    let values = {};
    values.title = e.target.title.value;
    values.id = props.userid;
    props.addFolder(values);
    props.toggleFolderOpen();
  };

  return (
    <div className="input_holder">
    <form className="f_form" onSubmit={hanldeSubmit}>
      <input name="title" placeholder="Untitled Folder" type="text" autoFocus contentEditable="false"></input>
      <input type="submit" style={{ display: "none" }}></input>
    </form>
    </div>
  );
};


const mapDispatchToProps = dispatch => ({
  toggleFolderOpen: ()=>dispatch(toggleFolderOpen())
});

export default connect(null,mapDispatchToProps)(widgetSubmit);
