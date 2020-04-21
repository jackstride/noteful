import React, { Fragment } from "react";

let widgetSubmit = ({ addFolder, userid, toggle, values }) => {
  const hanldeSubmit = (e) => {
    e.preventDefault();
    let keys = Object.keys(values);
    values[keys[0]] = userid;
    values[keys[1]] = e.target.title.value;
    addFolder(values);
    toggle();
  };

  window.SyncTest = () => {
    console.log("caleld");
    navigator.serviceWorker.ready.then((reg) => {
      reg.sync.register("test").then((res) => {
        console.log("registered");
      });
    });
  };

  return (
    <div className="input_holder">
      <form
        id="ButtonTest"
        className="f_form"
        onSubmit={(e) => {
          hanldeSubmit(e);
          window.SyncTest();
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
