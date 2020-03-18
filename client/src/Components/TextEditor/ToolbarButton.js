import React from "react";
import { Editor } from "slate";
import { useSlate } from "slate-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../fontawesome";

let ToolBarButton = ({ format, icon }) => {
  const editor = useSlate();
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
        className={
          isButtonActive(editor, format) ? "b_icon_active" : "b_icon_unactive"
        }
        icon={icon}
        size="1x"
      />
    </button>
  );
};

export default ToolBarButton;
