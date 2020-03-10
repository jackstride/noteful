import React, { Component } from "react";
import { connect } from "react-redux";
import { Portal } from "react-portal";

import ContextMenu from "./contextMenu";
import { selectContextMenu } from "./contextMenuSelectors";

import FoldersContextMenu from "../contextMenus/FoldersContextMenu";
import EditContextMenu from "../contextMenus/editContextMenu";
import TasksContextMenu from "../contextMenus/TasksContextMenu";
import NotesContextMenu from "../contextMenus/NotesContextMenu";

const menuTypes = {
  FoldersContextMenu,
  EditContextMenu,
  TasksContextMenu,
  NotesContextMenu
};

export function contextMenuManagerMapState(state) {
  return {
    contextMenu: selectContextMenu(state),
    EditContextMenu: selectContextMenu(state),
    TasksContextMenu: selectContextMenu(state),
    NotesContextMenu: selectContextMenu(state)
  };
}

class ContextMenuManager extends Component {
  render() {
    const { contextMenu } = this.props;
    //type,
    const { show, location, getType, menuArgs = {} } = contextMenu;

    let menu = null;

    if (show) {
      let MenuComponent = menuTypes[getType];

      if (MenuComponent) {
        menu = (
          <Portal isOpened={true}>
            <ContextMenu location={location}>
              <MenuComponent {...menuArgs} />
            </ContextMenu>
          </Portal>
        );
      }
    }
    return menu;
  }
}

export default connect(contextMenuManagerMapState)(ContextMenuManager);
