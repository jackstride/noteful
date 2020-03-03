import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { Editor, Transforms, createEditor, Text } from "slate";
import FormatToolbar from "./FormatToolbar";
import ToolbarButton from "./ToolbarButton";
import BlockButton from "./BlockButton";

const TextEditor = props => {
  const editor = useMemo(() => withReact(createEditor()), []);
  // Add the initial value when setting up our state.
  const [value, setValue] = useState(initialValue);

  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <FormatToolbar>
        <ToolbarButton format="bold" icon="bold" />
        <ToolbarButton format="italic" icon="italic" />
        <ToolbarButton format="code" icon="code" />
        <ToolbarButton format="underline" icon="underline" />
        <BlockButton format="heading-one" icon="underline" />
        <BlockButton format="heading-two" icon="underline" />
        <BlockButton format="heading-three" icon="underline" />
        <BlockButton format="list-item" icon="list" />
        <BlockButton format="numbered-list" icon="list-ol" />
        <BlockButton format="align-left" icon="align-left" />
        <BlockButton format="align-center" icon="align-center" />
        <BlockButton format="align-right" icon="align-right" />
      </FormatToolbar>
      <Editable
        className="main_editor"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
        //Defines shortvut Keys
        onKeyDown={event => {
          if (!event.ctrlKey) {
            return;
          }
          // Replace the `onKeyDown` logic with our new commands.
          // switch (event.key) {
          //   case "a": {
          //     event.preventDefault();
          //     CustomEditor.toggleCodeBlock(editor);
          //     break;
          //   }

          //   case "b": {
          //     event.preventDefault();
          //     CustomEditor.toggleBoldMark(editor);
          //     break;
          //   }
          // }
        }}
      />
    </Slate>
  );
};

// const CustomEditor = {

//   toggleBoldMark(editor) {
//     const isActive = CustomEditor.isBoldMarkActive(editor);
//     Transforms.setNodes(
//       editor,
//       { bold: isActive ? null : true },
//       { match: n => Text.isText(n), split: true }
//     );
//   },

//   toggleCodeBlock(editor) {
//     const isActive = CustomEditor.isCodeBlockActive(editor);
//     Transforms.setNodes(
//       editor,
//       { type: isActive ? null : "code" },
//       { match: n => Editor.isBlock(editor, n) }
//     );
//   }
// };

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "heading-three":
      return <h3 {...attributes}>{children}</h3>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "align-left":
      return (
        <span
          style={{ display: "flex", justifyContent: "flex-start" }}
          {...attributes}
        >
          <p>{children}</p>
        </span>
      );
    case "align-right":
      return (
        <span
          style={{ display: "flex", justifyContent: "flex-end" }}
          {...attributes}
        >
          <p>{children}</p>
        </span>
      );
    case "align-center":
      return (
        <span
          style={{ display: "flex", justifyContent: "center" }}
          {...attributes}
        >
          <p>{children}</p>
        </span>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.paragraph) {
    children = <p>{children}</p>;
  }

  return <span {...attributes}>{children}</span>;
};

const initialValue = [
  {
    type: "heading-one",
    children: [
      {
        text: "Create your notes with headings!"
      }
    ]
  },
  {
    type: "heading-two",
    children: [
      {
        text: "Or smaller Headings"
      }
    ]
  },
  {
    type: "heading-three",
    children: [
      {
        text: "Maybe a smaller one"
      }
    ]
  },

  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" }
    ]
  },
  {
    type: "paragraph",
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text "
      },
      { text: "bold", bold: true },
      {
        text:
          ", or add a semantically rendered block quote in the middle of the page, like this:"
      }
    ]
  },
  {
    type: "block-quote",
    children: [{ text: "A wise quote." }]
  },
  {
    type: "paragraph",
    children: [{ text: "Try it out for yourself!" }]
  }
];

export default TextEditor;
