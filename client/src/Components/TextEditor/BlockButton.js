import React from "react";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../fontawesome";

let ToolBarButton = ({ format, icon, size }) => {
  const editor = useSlate();

  const LIST_TYPES = ["numbered-list", "bulleted-list"];

  const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === format
    });

    return !!match;
  };

  let toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: n => LIST_TYPES.includes(n.type),
      split: true
    });

    Transforms.setNodes(editor, {
      type: isActive ? "paragraph" : isList ? "list-item" : format
    });

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  };

  return (
    <button
      className={
        isBlockActive(editor, format) ? "e_button_active" : "e_button_unactive"
      }
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <FontAwesomeIcon
        className={
          isBlockActive(editor, format) ? "b_icon_unactive" : "b_icon_active"
        }
        icon={icon}
      />
    </button>
  );
};

export default ToolBarButton;
