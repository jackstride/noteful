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
      style={isBlockActive(editor, format) ? active : unactive}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default ToolBarButton;
