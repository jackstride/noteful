import React from "react";
import { Editor } from "slate";
import { useSlate } from "slate-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../fontawesome";

let ToolBarButton = ({ format, icon }) => {
  const editor = useSlate();

  const active = {
    color: "blue"
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
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  return (
    <button
      className={
        isButtonActive(editor, format) ? "e_button_active" : "e_button_unactive"
      }
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <FontAwesomeIcon
        classname={
          isButtonActive(editor, format) ? "b_icon_active" : "b_icon_unactive"
        }
        icon={icon}
        size="lg"
      />
    </button>
  );
};

export default ToolBarButton;
