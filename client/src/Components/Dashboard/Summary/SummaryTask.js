import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadTasks, toggleTask } from "../../../actions/taskActions";
import { showMenu } from "../../../actions/contextMenuActions";
import LazyLoading from "../LazyLoading";
const moment = require("moment");

let TasksHolder = ({ task, showMenu, loadTasks, toggleTask, id }) => {
  useEffect(() => {
    loadTasks(id);
  }, [id]);

  let handleContextMenu = (e) => {
    e.preventDefault();
    const { pageX, pageY } = e;
    showMenu(pageX, pageY, "TasksContextMenu", {
      name: e.target.name,
      id: e.target.id,
    });
  };

  return (
    <div className="tasks_holder">
      {task.map((data, i) => {
        return (
          <TaskItem
            key={i}
            context={(e) => handleContextMenu(e)}
            handleToggle={(id) => {
              toggleTask(id);
            }}
            data={data}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    id: state.auth.user._id,
    task: state.task.taskData,
  };
};

let mapDispatchToProps = (dispatch) => ({
  showMenu: (x, y, getType, args, name) =>
    dispatch(showMenu(x, y, getType, args, name)),
  loadTasks: (id) => dispatch(loadTasks(id)),
  toggleTask: (id) => dispatch(toggleTask(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksHolder);

const TaskItem = ({ data, context, handleToggle }) => {
  let dueDate = () => {
    let x = new moment();
    let date = data.due_date;
    date = moment.duration(moment(date).diff(x));
    date = date._data.days;

    switch (date) {
      case 0:
        date = "Due Today";
        break;
      case 1:
        date = "Due Tomorrow";
        break;
      default:
        date = "Due in " + date + " Days";
    }
    return date;
  };

  let numDate = () => {
    let x = new moment();
    let date = data.due_date;
    date = moment.duration(moment(date).diff(x));
    date = date._data.days;
    return date;
  };

  let [complete, setComplete] = useState(data.isCompleted);

  useEffect(() => {
    setComplete(data.isCompleted);
  }, [data]);
  return data ? (
    <div
      onTouchStart={(e) => {
        console.log("hello");
        handleToggle(data._id);
      }}
      className={complete ? "task_item shadow complete" : "task_item shadow"}
    >
      <div
        id={data.id}
        className={complete ? "task_icon complete" : "task_icon"}
      >
        {complete ? (
          <FontAwesomeIcon
            icon="check"
            color="#62e980"
            size="2x"
          ></FontAwesomeIcon>
        ) : (
          <h4>{numDate()}</h4>
        )}
      </div>
      <h5 className={complete ? "task_text_complete" : "task_text"}>
        {data.task_name}
      </h5>
      <h5 className={complete ? "task_text_complete" : "task_text"}>
        {complete ? "Completed, well done!" : dueDate()}
      </h5>
      <div
        style={{ cursor: "pointer" }}
        onClick={(e) => {
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
