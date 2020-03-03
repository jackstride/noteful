import React from "react";
import { Editor, Transforms, createEditor } from "slate";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../fontawesome";

let ToolBarButton = ({ format, icon }) => {
  const editor = useSlate();

  const active = {
    backgroundColor: "grey"
  };

  const unactive = {
    backgroundColor: "transparent"
  };

  const isButtonActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const toggleMark = (editor, format) => {
    const isActive = isButtonActive(editor, format);
    console.log(isActive);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  return (
    <button
      style={isButtonActive(editor, format) ? active : unactive}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default ToolBarButton;
