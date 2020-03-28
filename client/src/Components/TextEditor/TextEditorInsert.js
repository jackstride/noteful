import React, { useState, useRef, useEffect } from "react";
import { Portal } from "react-portal";
import { Range, Editor, Transforms } from "slate";
import { useSlate, ReactEditor } from "slate-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon, InlineIcon } from "@iconify/react";
import headingH1 from "@iconify/icons-gridicons/heading-h1";
import headingH2 from "@iconify/icons-gridicons/heading-h2";
import headingH3 from "@iconify/icons-gridicons/heading-h3";

const TextEditorIsnert = ({}) => {
  let [show, setShow] = useState(false);
  let [icons, setOptions] = useState([
    {
      type: "heading-one",
      text: "Heading One",
      icon: headingH1
    },
    {
      type: "heading-two",
      text: "Heading Two",
      icon: headingH2
    },
    {
      type: "heading-three",
      text: "Heading Three",
      icon: headingH3
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
        <h5>Insert</h5>
        <FontAwesomeIcon icon="chevron-down" color="black" />
      </div>
      {show ? (
        <div className="content">
          {icons.map((item, index) => {
            return (
              <div
                onClick={() => {
                  handleAdd(item.type, item.text);
                }}
                key={index}
                className="content_background"
              >
                <Icon width="1.5em" icon={item.icon} />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default TextEditorIsnert;
