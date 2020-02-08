import React, { Component } from 'react'
import {connect} from 'react-redux'

import MenuPosition from './menuPostion';

import {showMenu,hideMenu} from '../../actions/contextMenuActions'

export class ContextMenu extends Component {

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    handleClickOutside = (e) => {
        if (!this.node || !this.node.contains(e.target) ) {
            this.props.hideMenu();
        }
    }

    render() {
        let {location} = this.props
        
        return (
                <MenuPosition
                left = {location.x + 2}
                top = {location.y}
                classsName = "contextMenu"
                nodeRef = {node => this.node = node} >
                    {this.props.children}
                </MenuPosition>
        )
    }
}
  
  const mapDispatchToProps = dispatch => ({
    hideMenu: () => dispatch( hideMenu()),   
    showMenu: () => dispatch( showMenu()),    
  })




export default connect(null,mapDispatchToProps)(ContextMenu)


