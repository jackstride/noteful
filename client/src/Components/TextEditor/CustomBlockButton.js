import React, { useState, useEffect } from "react";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";
import { Icon, InlineIcon } from "@iconify/react";
import headingH1 from "@iconify/icons-gridicons/heading-h1";
import headingH2 from "@iconify/icons-gridicons/heading-h2";
import headingH3 from "@iconify/icons-gridicons/heading-h3";
import heading from "@iconify/icons-gridicons/heading";

let ToolBarButton = ({ format, icon, size }) => {
  const editor = useSlate();

  const LIST_TYPES = ["numbered-list", "bulleted-list"];

  let [show, setShow] = useState(false);

  useEffect(() => {
    return () => {
      setShow(false);
    };
  }, [setShow]);

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
    <div className="tooltip_headings">
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        <Icon color="white" width="1.5em" icon={heading} />
      </button>
      {show ? (
        <div className="tooltip_headings_container">
          <button
            onClick={() => setShow(false)}
            className={
              isBlockActive(editor, format[0])
                ? "e_button_active"
                : "e_button_unactive"
            }
            onMouseDown={event => {
              event.preventDefault();
              toggleBlock(editor, format[0]);
            }}
          >
            <Icon color="white" width="1.5em" icon={headingH1} />
          </button>
          <button
            onClick={() => setShow(false)}
            className={
              isBlockActive(editor, format[1])
                ? "e_button_active"
                : "e_button_unactive"
            }
            onMouseDown={event => {
              event.preventDefault();
              toggleBlock(editor, format[1]);
            }}
          >
            <Icon color="white" width="1.5em" icon={headingH2} />
          </button>
          <button
            onClick={() => setShow(false)}
            className={
              isBlockActive(editor, format[2])
                ? "e_button_active"
                : "e_button_unactive"
            }
            onMouseDown={event => {
              event.preventDefault();
              toggleBlock(editor, format[2]);
            }}
          >
            <Icon color="white" width="1.5em" icon={headingH3} />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ToolBarButton;
