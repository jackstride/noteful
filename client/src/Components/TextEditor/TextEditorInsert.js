import React, { useState, useRef, useEffect } from "react";
import { Portal } from "react-portal";
import { Range, Editor, Transforms } from "slate";
import { useSlate, ReactEditor } from "slate-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TextEditorIsnert = ({}) => {
  let [show, setShow] = useState(false);
  let [options, setOptions] = useState([
    {
      type: "heading-one",
      text: "Heading One",
      icon: "times"
    },
    {
      type: "heading-two",
      text: "Heading Two",
      icon: "times"
    },
    {
      type: "heading-three",
      text: "Heading Three",
      icon: "times"
    },
    {
      type: "list-item",
      text: "List",
      icon: "times"
    }
  ]);
  const editor = useSlate();

  let handleAdd = (type, text) => {
    Transforms.insertNodes(editor, {
      type,
      children: [
        {
          text
        }
      ]
    });
  };
  return (
    <div className="editor_insert">
      <div onClick={() => setShow(!show)} className="icon">
        <FontAwesomeIcon icon="chevron-down" color="black" />
      </div>
      {show ? (
        <div className="content">
          {options.map((item, index) => {
            return (
              <div
                onClick={() => {
                  handleAdd(item.type, item.text);
                }}
                key={index}
                className="content_background"
              >
                <FontAwesomeIcon icon={item.icon} size="lg" color="white" />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default TextEditorIsnert;
