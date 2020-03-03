import React from "react";
import { Editor, Transforms, createEditor } from "slate";
import { Editable, withReact, useSlate, Slate } from "slate-react";

let ToolBarButton = ({ format, icon, Custom }) => {
  const editor = useSlate();
  return (
    <button
      onMouseDown={event => {
        event.preventDefault();
        Custom.toggleBoldMark(editor);
      }}
    >
      Click Me
    </button>
  );
};

export default ToolBarButton;
