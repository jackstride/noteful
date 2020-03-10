import React from "react";
import { Portal } from "react-portal";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteAllNotes } from "../../actions/ResponseActions";
import { useHistory } from "react-router-dom";

const HandleMessage = ({
  show,
  isPositive,
  message,
  deleteAllNotes,
  folder_id
}) => {
  const history = useHistory();

  let handleDelete = id => {
    history.push("/dashboard");
    deleteAllNotes(id);
  };
  return (
    <Portal>
      <div className={show ? "handle_message_container" : null}>
        {show ? (
          isPositive ? (
            <Success message={message} />
          ) : (
            <Warning
              message={message}
              deleteAllNotes={handleDelete}
              id={folder_id}
            />
          )
        ) : null}
      </div>
    </Portal>
  );
};

const mapStateToProps = state => {
  return {
    folder_id: state.handleResponse.folder_id,
    show: state.handleResponse.show,
    isPositive: state.handleResponse.isPositive,
    message: state.handleResponse.message
  };
};

const mapDispatchToProps = dispatch => ({
  deleteAllNotes: id => dispatch(deleteAllNotes(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(HandleMessage);

let Success = ({ message }) => {
  return (
    <div className="handle_message show_success">
      <span>{message}</span>
      <div className="circle">
        <FontAwesomeIcon
          icon="check"
          color="rgb(0, 207, 107)"
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};

let Warning = ({ message, deleteAllNotes, id }) => {
  return (
    <div className="handle_message warning">
      <span>{message}</span>
      <span style={{ cursor: "pointer" }} onClick={() => deleteAllNotes(id)}>
        Delete
      </span>
    </div>
  );
};

let Error = ({ message }) => {
  return (
    <div className="handle_message show_success">
      <span>{message}</span>
      <div className="circle">
        <FontAwesomeIcon
          icon="check"
          color="rgb(0, 207, 107)"
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};
