import React, { Component } from 'react'
import {connect} from 'react-redux'

import MenuPosition from './menuPostion';

import {showMenu,hideMenu} from '../../actions/contextMenuActions'

export class ContextMenu extends Component {

    componentDidMount() {
        document.addEventListener("click", this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutside, true)
    }

    handleClickOutside = e => {
        this.props.showMenu();
        if(!this.node || !this.node.contains(e.target)) {
            this.props.hideMenu();
        }
    }

    render() {
        const {location} = this.props;
        return (
                <MenuPosition
                left = {location.y}
                top = {location.x}
                classsName = "contextMenu"
                nodeRef = {node => this.node = node} >
                    {this.props.children}
                </MenuPosition>
        )
    }
}
  
  const mapDispatchToProps = dispatch => ({
    hideMenu: () => dispatch( hideMenu ),   
    showMenu: () => dispatch( showMenu ),    
  })




export default connect(null,mapDispatchToProps)(ContextMenu)


