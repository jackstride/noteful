import React from 'react';
import {connect} from 'react-redux'

import {removeFolder,toggleFolderOpen} from '../../actions/FolderActions'
import {hideMenu, showMenu} from '../../actions/contextMenuActions'

let FolderMenu = props => {
    return (
    <ul>
          <li>
            <a href="#">Add New Note</a>
          </li>
          <li >
            <a href="#">Delete Note</a>
          </li>
          <li>
            <a href="#">Rename Note</a>
          </li>
        </ul>
    )
  }

  const mapStateToProps = state => {
    return {
        type: state.contextMenu.type,
        name: state.contextMenu.menuArgs.name,
        id: state.contextMenu.menuArgs.id,
        x: state.contextMenu.location.x,
        y: state.contextMenu.location.y,
    }
}

 const mapDispatchToProps = dispatch => ({
        removeFolder: id => dispatch(removeFolder(id)),
        hideMenu: () => dispatch(hideMenu()),
        toggleFolderOpen: ()=>dispatch(toggleFolderOpen()),
        showMenu: (x,y,getType,args) => dispatch(showMenu(x,y,getType,args)),
})
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(FolderMenu)
  