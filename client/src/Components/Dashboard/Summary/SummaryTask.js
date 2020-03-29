import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadTasks, toggleTask } from "../../../actions/taskActions";
import { showMenu } from "../../../actions/contextMenuActions";
import LazyLoading from "../LazyLoading";

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
        return (
          <TaskItem
            key={i}
            context={e => handleContextMenu(e)}
            handleToggle={id => {
              toggleTask(id);
            }}
            data={data}
          />
        );
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

const TaskItem = ({ data, context, handleToggle }) => {
  let [complete, setComplete] = useState(data.isCompleted);

  useEffect(() => {
    setComplete(data.isCompleted);
  }, [data]);
  return data ? (
    <div className={complete ? "task_item complete" : "task_item"}>
      <div
        id={data.id}
        className={complete ? "task_icon complete" : "task_icon"}
      >
        {complete ? (
          <FontAwesomeIcon
            icon="check"
            color="#50d890"
            size="2x"
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            icon="times"
            color="grey"
            size="2x"
          ></FontAwesomeIcon>
        )}
      </div>
      <h5 className={complete ? "task_text_complete" : null}>
        {data.task_name}
      </h5>
      <h6 className={complete ? "task_text_complete" : null}>
        {data.isCompleted ? "Completed" : "Not Completed"}
      </h6>
      <div
        style={{ cursor: "pointer" }}
        onClick={e => {
          handleToggle(data._id);
        }}
        id={data._id}
        onContextMenu={context}
        className="absolute"
      ></div>
    </div>
  ) : (
    <LazyLoading />
  );
};
