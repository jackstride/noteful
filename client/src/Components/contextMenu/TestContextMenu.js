import React, { Component } from "react";
import { connect } from "react-redux";
import { removeFolder, addFolder } from "../../actions/FolderActions";
import {hideMenu} from '../../actions/contextMenuActions';
 class TestContextMenu extends Component {


    handleRemove = (e,id) => {
        e.preventDefault();
        this.props.removeFolder(id);
        this.props.hideMenu();
    }
  render() {
      console.log(this.props)
    return (
      <ul>
        <li>
          <a href="#">Add New Note</a>
        </li>
        <li onClick={(e => this.handleRemove(e,this.props.id))}>
          <a href="#">Delete Note</a>
        </li>
        <li>
          <a href="#">Rename Note</a>
        </li>
      </ul>
    );
  }
}



const mapStateToProps = state => {
    return {
        name: state.contextMenu.menuArgs.name,
        id: state.contextMenu.menuArgs.id,
    }
}

const mapDispatchToProps = dispatch => ({
        removeFolder: id => dispatch(removeFolder(id)),
        hideMenu: () => dispatch(hideMenu()),
})




export default connect(mapStateToProps,mapDispatchToProps)(TestContextMenu)