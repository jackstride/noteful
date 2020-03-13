import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontawesome";
import { showMenu } from "../../../actions/contextMenuActions";

let TasksHolder = ({ task, mark, showMenu }) => {
  let [complete, setComplete] = useState(task.isCompleted);

  useEffect(() => {
    setComplete(task.isCompleted);
  }, [task]);

  let handleContextMenu = e => {
    e.preventDefault();
    const { pageX, pageY } = e;
    console.log("this");
    showMenu(pageX, pageY, "TasksContextMenu", {
      name: e.target.name,
      id: e.target.id
    });
  };

  return (
    <div className="summary_holder tasks">
      <div
        style={complete ? null : { backgroundColor: "#ECECEC" }}
        className={complete ? "circle tasks complete" : "circle tasks"}
      >
        {complete ? (
          <FontAwesomeIcon
            icon="check"
            color="#85FF00"
            size="2x"
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            icon="times"
            color="white"
            size="2x"
          ></FontAwesomeIcon>
        )}
      </div>
      <h5>{task.task_name}</h5>
      <h6>{task.isCompleted ? "Completed" : "Not Completed"}</h6>
      <div
        id={task._id}
        onClick={() => {
          mark(task._id);
        }}
        onContextMenu={e => handleContextMenu(e)}
        className="absolute"
      ></div>
    </div>
  );
};

let mapDispatchToProps = dispatch => ({
  showMenu: (x, y, getType, args, name) =>
    dispatch(showMenu(x, y, getType, args, name))
});

export default connect(null, mapDispatchToProps)(TasksHolder);
