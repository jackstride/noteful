import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Portal} from 'react-portal';

import ContextMenu from './contextMenu';

import {selectContextMenu} from './contextMenuSelectors';
import Folder from '../Dashboard/NavItem/Folders'

import TestContextMenu from './TestContextMenu';

const menuTypes = {
    TestContextMenu,
}

export function contextMenuManagerMapState(state) {
    return {
        contextMenu : selectContextMenu(state)
    };
}


class ContextMenuManager extends Component {

    render() {
        const {contextMenu} = this.props;
        
        const {show, location, type, menuArgs = {}} = contextMenu;
        console.log(type)

        let menu = null;

        if(show) {

            let MenuComponent = menuTypes[type];

            console.log(MenuComponent);
            
            if(MenuComponent) {
                
                menu = (
                    <Portal isOpened={true}>
                        <ContextMenu location={location}>
                            <MenuComponent {...menuArgs} />
                        </ContextMenu>
                    </Portal>
                )
            }
        }
        console.log(menu)
        return menu;
        
    }
}

export default connect(contextMenuManagerMapState)(ContextMenuManager);
