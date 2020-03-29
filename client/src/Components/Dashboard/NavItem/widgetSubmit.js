import React, { Fragment } from "react";

let widgetSubmit = ({ addFolder, userid, toggle, values }) => {
  const hanldeSubmit = e => {
    e.preventDefault();
    let keys = Object.keys(values);
    values[keys[0]] = userid;
    values[keys[1]] = e.target.title.value;
    addFolder(values);
    toggle();
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
