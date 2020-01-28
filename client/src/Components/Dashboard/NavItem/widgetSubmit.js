import React, { Fragment } from "react";

let widgetSubmit = props => {
  const hanldeSubmit = e => {
    e.preventDefault();
    let values = {};
    values.title = e.target.title.value;
    values.id = props.userid;
    props.addFolder(values);
    
  };

  return (
    <form className="f_form" onSubmit={hanldeSubmit}>
      <input name="title" placeholder="Add Folder" type="text"></input>
      <input type="submit" style={{ display: "none" }}></input>
    </form>
  );
};

export default widgetSubmit;
