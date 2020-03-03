import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { Editor, Transforms, createEditor, Text } from "slate";
import FormatToolbar from "./FormatToolbar";
import ToolbarButton from "./ToolbarButton";
import BlockButton from "./BlockButton";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { addNote, editNote } from "../../actions/NoteActions";
import { USER_LOADING } from "../../actions/types";

const TextEditor = ({ match, note, user_id, folder_id, editNote, _id }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const paramId = match.params.notes;
  const [value, setValue] = useState(initialValue);
  const [placeNote, setNote] = useState();
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    paramId ? setId(paramId) : console.log("waiting");
    setNote(note[0]);
    if (placeNote) {
      setValue(JSON.parse(placeNote.body_Data));
    }
  }, [id]);

  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={value => {
        setValue(value);
        const content = JSON.stringify(value);
        let values = {
          _id,
          user_id,
          folder_id,
          body_Data: content
        };
        editNote(values);
      }}
    >
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
        // onKeyDown={event => {
        //   if (!event.ctrlKey) {
        //     return;
        //   }
        //   Replace the `onKeyDown` logic with our new commands.
        //   switch (event.key) {
        //     case "a": {
        //       event.preventDefault();
        //       CustomEditor.toggleCodeBlock(editor);
        //       break;
        //     }

        //     case "b": {
        //       event.preventDefault();
        //       CustomEditor.toggleBoldMark(editor);
        //       break;
        //     }
        //   }
        // }}
      />
    </Slate>
  );
};

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

const mapStateToProps = state => {
  return {
    note: state.note.noteData,
    user_id: state.auth.user._id,
    folder_id: state.note.noteData[0].folder_id,
    _id: state.note.noteData[0]._id
  };
};

const mapDispatchToProps = dispatch => ({
  editNote: values => dispatch(editNote(values))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TextEditor)
);
