import React, { useState, Fragment } from "react";
import { connect } from "react-redux";

import {
  toggleOpenTask,
  removeTask,
  toggleTask,
  editTask
} from "../../actions/taskActions";
import { UPDATE_TASK_DATE } from "../../actions/types";
import { hideMenu, showMenu } from "../../actions/contextMenuActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let TasksContextMenu = ({
  showMenu,
  x,
  y,
  name,
  id,
  removeTask,
  hideMenu,
  toggleTask,
  editTask
}) => {
  let [dateMenu, setDateMenu] = useState(false);

  let addDays = days => {
    let date = new Date();
    date = date.setDate(date.getDate() + days);
    return date;
  };
  let [days, setDays] = useState([
    {
      day: "Today",
      value: 0
    },
    {
      day: "Tomorrow",
      value: 2
    },
    {
      day: "3 Days time",
      value: 3
    },
    {
      day: "4 Days time",
      value: 4
    },
    {
      day: "5 Days time",
      value: 5
    },
    {
      day: "6 Days time",
      value: 6
    },
    {
      day: "1 Week",
      value: 7
    }
  ]);

  let handleRename = () => {
    showMenu(x, y, "EditContextMenu", { name: name, id: id }, "tasks");
  };

  let handleDelete = (e, id) => {
    e.preventDefault();
    removeTask(id);
    hideMenu();
  };

  let handleMarkTask = (e, id) => {
    e.preventDefault();
    toggleTask(id);
    hideMenu();
  };

  let handleToggleAdd = () => {
    showMenu(x, y, "EditContextMenu", { name: name, id: id }, "addtask");
  };

  let editDueDate = e => {
    e.preventDefault();
    let date = e.target.id;
    editTask({ _id: id, due_date: date }, UPDATE_TASK_DATE);
  };

  return (
    <Fragment>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => hideMenu()}
        className="context_close"
      >
        <FontAwesomeIcon size="xs" icon="times"></FontAwesomeIcon>
      </div>

      <ul>
        <span>
          <FontAwesomeIcon size="xs" icon="plus"></FontAwesomeIcon>
          <li
            onClick={() => {
              handleToggleAdd();
            }}
          >
            Add Tasks
          </li>
        </span>
        <span>
          <FontAwesomeIcon size="xs" icon="pencil-alt"></FontAwesomeIcon>
          <li onClick={e => handleRename(e, id)}>Rename Task</li>
        </span>
        <span>
          <FontAwesomeIcon size="xs" icon="trash"></FontAwesomeIcon>
          <li onClick={e => handleDelete(e, id)}> Delete Task</li>
        </span>
        <span>
          <FontAwesomeIcon size="xs" icon="exchange-alt"></FontAwesomeIcon>
          <li onClick={e => handleMarkTask(e, id)}>Mark Task</li>
        </span>
        <span>
          <FontAwesomeIcon size="xs" icon="exchange-alt"></FontAwesomeIcon>
          <li onClick={e => setDateMenu(!dateMenu)}>Change Due Date</li>
        </span>
        {dateMenu
          ? days.map((days, index) => {
              return (
                <span>
                  <span></span>
                  <li onClick={e => editDueDate(e)} id={days.value}>
                    {days.day}
                  </li>
                </span>
              );
            })
          : null}
      </ul>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    id: state.contextMenu.menuArgs.id,
    x: state.contextMenu.location.x,
    y: state.contextMenu.location.y
  };
};

const mapDispatchToProps = dispatch => ({
  toggleOpenTask: () => dispatch(toggleOpenTask()),
  hideMenu: () => dispatch(hideMenu()),
  removeTask: id => dispatch(removeTask(id)),
  editTask: (values, type) => dispatch(editTask(values, type)),
  toggleTask: id => dispatch(toggleTask(id)),
  showMenu: (x, y, getType, args, name) =>
    dispatch(showMenu(x, y, getType, args, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksContextMenu);
