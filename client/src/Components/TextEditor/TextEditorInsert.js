import React, { useState, useRef, useEffect } from "react";
import { Portal } from "react-portal";
import { Range, Editor, Transforms, Point, Element } from "slate";
import { useSlate, ReactEditor } from "slate-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon, InlineIcon } from "@iconify/react";
import headingH1 from "@iconify/icons-gridicons/heading-h1";
import headingH2 from "@iconify/icons-gridicons/heading-h2";
import headingH3 from "@iconify/icons-gridicons/heading-h3";

const TextEditorIsnert = ({}) => {
  let [show, setShow] = useState(false);
  let [icons, setIcons] = useState([
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
  let [options, setOptions] = useState([
    {
      type: "bulleted-list",
      text: "Item One",
      icon: "list"
    },
    {
      type: "numbered-list",
      text: "Item One",
      icon: "list-ol"
    }
  ]);
  const editor = useSlate();

  let handleAdd = (type, text) => {
    const LIST_TYPES = ["numbered-list", "bulleted-list"];
    const isList = LIST_TYPES.includes(type);

    //Inserting list then heading will insert the heading as a list..
    if (isList) {
      Transforms.insertNodes(editor, {
        type,
        children: [
          {
            type: "list-item",
            children: [
              {
                text
              }
            ]
          }
        ]
      });
      editor.insertBreak("heading-one");
    } else {
      Transforms.insertNodes(editor, {
        type,
        children: [
          {
            text
          }
        ]
      });
    }

    // Transforms.insertNodes(editor, {
    //   type: isList ? "list-item" : null,
    //   children: [
    //     {
    //       text
    //     }
    //   ]
    // })

    // Transforms.wrapNodes(editor, {
    //   type
    // });
    // Transforms.unsetNodes(editor);
  };

  return (
    <div className="editor_insert">
      <div
        onMouseDown={e => {
          e.preventDefault();
          setShow(!show);
        }}
        className="icon"
      >
        <h5>Insert</h5>
        <FontAwesomeIcon
          className={show ? "rotate" : ""}
          icon="chevron-down"
          color="black"
        />
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
          {options.map((item, index) => {
            return (
              <div
                onClick={() => {
                  handleAdd(item.type, item.text);
                }}
                key={index}
                className="content_background"
              >
                <FontAwesomeIcon icon={item.icon} />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default TextEditorIsnert;
