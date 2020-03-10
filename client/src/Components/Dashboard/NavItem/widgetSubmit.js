import React, { Fragment } from "react";

let widgetSubmit = props => {
  const hanldeSubmit = e => {
    e.preventDefault();
    let values = {};
    values.title = e.target.title.value;
    values.id = props.userid;
    props.addFolder(values);
    props.toggle();
  };

  return (
    <div className="input_holder">
      <form
        className="f_form"
        onSubmit={e => {
          hanldeSubmit(e);
        }}
      >
        <input
          name="title"
          placeholder="Untitled"
          type="text"
          autoFocus
          contentEditable="false"
        ></input>
        <input type="submit" style={{ display: "none" }}></input>
      </form>
    </div>
  );
};

export default widgetSubmit;
