import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor, Editor, Text } from "slate";
import FormatToolbar from "./FormatToolbar";
import ToolbarButton from "./ToolbarButton";
import BlockButton from "./BlockButton";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { editNote, getNoteById, clearValues } from "../../actions/NoteActions";
import CustomBlockButton from "./CustomBlockButton";
import ToolTipMenu from "./ToolTipMenu";
import TextEditorInsert from "./TextEditorInsert";
import useMobile from "../Dashboard/useMobile";

const TextEditor = ({
  match,
  note,
  user_id,
  folder_id,
  editNote,
  _id,
  getNoteById,
  clearValues,
}) => {
  const mobile = useMobile();
  const editor = useMemo(() => withReact(createEditor()), []);
  const paramId = match.params.notes;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    getNoteById(paramId);
    return () => {
      clearValues();
    };
  }, [paramId, clearValues, paramId]);

  useEffect(() => {
    if (note !== undefined) {
      if (note == null) {
        setValue(initialValue);
      } else {
        setValue(JSON.parse(note));
      }
    }
  }, [note, setValue]);

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <div className="editor_container">
      {value ? (
        <Slate
          editor={editor}
          value={value}
          onChange={(value) => {
            setValue(value);
            const content = JSON.stringify(value);
            console.log(editor);
            let note_title = editor.children[0].children[0].text.split(" ")[0];
            const values = {
              _id,
              user_id,
              folder_id,
              note_title,
              body_Data: content,
            };
            // editNote(values);
          }}
        >
          {mobile ? null : (
            <FormatToolbar>
              <ToolbarButton format="bold" icon="bold" />
              <ToolbarButton format="italic" icon="italic" />
              <span className="editor_spacer"></span>
              <ToolbarButton format="code" icon="code" />
              <ToolbarButton format="underline" icon="underline" />
              <BlockButton format="heading-one" icon="heading" />
              <span className="editor_spacer"></span>
              <BlockButton format="heading-two" icon="heading" />
              <BlockButton format="heading-three" icon="heading" />
              <span className="editor_spacer"></span>
              <BlockButton format="list-item" icon="list" />
              <BlockButton format="numbered-list" icon="list-ol" />
              <span className="editor_spacer"></span>
              <BlockButton format="align-left" icon="align-left" />
              <BlockButton format="align-center" icon="align-center" />
              <BlockButton format="align-right" icon="align-right" />
            </FormatToolbar>
          )}

          {mobile ? (
            <ToolTipMenu>
              <ToolbarButton format="bold" icon="bold" />
              <ToolbarButton format="italic" icon="italic" />
              <span className="editor_spacer"></span>
              <ToolbarButton format="code" icon="code" />
              <ToolbarButton format="underline" icon="underline" />
              <span className="editor_spacer"></span>
              <CustomBlockButton
                format={["heading-one", "heading-two", "heading-three"]}
              />
              <span className="editor_spacer"></span>
              <BlockButton format="bulleted-list" icon="list" />
              <BlockButton format="numbered-list" icon="list-ol" />
              <span className="editor_spacer"></span>
              <BlockButton format="align-left" icon="align-left" />
              <BlockButton format="align-center" icon="align-center" />
              <BlockButton format="align-right" icon="align-right" />
            </ToolTipMenu>
          ) : null}
          {mobile ? <TextEditorInsert /> : null}

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
      ) : (
        <h2> Loading </h2>
      )}
    </div>
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
        text: "Begin tying your masterpiece..",
      },
    ],
  },
];

const mapStateToProps = (state) => {
  return {
    note: state.note.singleNoteData.body_Data,
    user_id: state.auth.user._id,
    _id: state.note.singleNoteData._id,
    folder_id: state.note.singleNoteData.folder_id,
  };
};

const mapDispatchToProps = (dispatch) => ({
  editNote: (values) => dispatch(editNote(values)),
  getNoteById: (values) => dispatch(getNoteById(values)),
  clearValues: () => dispatch(clearValues()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TextEditor)
);
