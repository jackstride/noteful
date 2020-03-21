import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadTasks, toggleTask } from "../../../actions/taskActions";
import { showMenu } from "../../../actions/contextMenuActions";

let TasksHolder = ({ task, showMenu, loadTasks, toggleTask, id }) => {
  useEffect(() => {
    loadTasks(id);
  }, [id]);

  let handleContextMenu = e => {
    e.preventDefault();
    const { pageX, pageY } = e;
    showMenu(pageX, pageY, "TasksContextMenu", {
      name: e.target.name,
      id: e.target.id
    });
  };

  return (
    <div className="tasks_holder">
      {task.map((data, i) => {
        return <TaskItem context={e => handleContextMenu(e)} data={data} />;
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    id: state.auth.user._id,
    task: state.task.taskData
  };
};

let mapDispatchToProps = dispatch => ({
  showMenu: (x, y, getType, args, name) =>
    dispatch(showMenu(x, y, getType, args, name)),
  loadTasks: id => dispatch(loadTasks(id)),
  toggleTask: id => dispatch(toggleTask(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksHolder);

const TaskItem = ({ data, context }) => {
  let [complete, setComplete] = useState(data.isCompleted);

  useEffect(() => {
    setComplete(data.isCompleted);
  }, [data]);
  return (
    <div className="task_item">
      <div
        id={data.id}
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
      <h5>{data.task_name}</h5>
      <h6>{data.isCompleted ? "Completed" : "Not Completed"}</h6>
      <div id={data._id} onContextMenu={context} className="absolute"></div>
    </div>
  );
};
