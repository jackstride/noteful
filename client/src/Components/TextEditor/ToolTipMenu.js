import React, { useState, useRef, useEffect } from "react";
import { Portal } from "react-portal";
import { Range, Editor } from "slate";
import { useSlate, ReactEditor } from "slate-react";
const ToolTipMenu = ({ children }) => {
  let [currentSelection, setSelection] = useState();
  const ref = useRef();
  const editor = useSlate();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;
    setSelection(selection);

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Editor.string(editor, selection) === " "
    ) {
      el.removeAttribute("style");
      return;
    }

    if (
      currentSelection &&
      selection.anchor.path[0] === currentSelection.anchor.path[0]
    ) {
      // const index = selection.anchor.path[0];
      // console.log(editor.children[index]);
      console.log(editor);
      return;
    }

    let padding = {
      x: 20,
      y: 50
    };

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();

    let y = domSelection.anchorNode.parentNode.offsetTop;
    let x = domSelection.anchorNode.parentNode.offsetLeft;
    let py = domSelection.anchorNode.parentNode.offsetParent.offsetTop;
    let px = domSelection.anchorNode.parentNode.offsetParent.offsetLeft;

    el.style.display = "block";
    el.style.top = `${y + py + padding.y}px`;
    el.style.left = `${x + px}px`;
  });

  document.addEventListener("keyup", () => {
    document.querySelector(".text_editor_tooltip").style.display = "none";
  });

  return (
    <Portal>
      <div ref={ref} className="text_editor_tooltip">
        {children}
      </div>
    </Portal>
  );
};

export default ToolTipMenu;

// const domSelection = window.getSelection();
// const domRange = domSelection.getRangeAt(0);
// const rect = domRange.getBoundingClientRect();

// let x = domSelection.anchorNode.parentNode.offsetWidth;
// let y = domSelection.anchorNode.parentNode.offsetHeight;
// console.log(x);
// console.log(y);

// el.style.display = "block";
// el.style.top = `${y - padding.y}px`;
// el.style.left = `${x + padding.x}px`;

// el.style.bottom = `${x}px`;
// el.style.left = `${y +
//   window.pageXOffset +
//   el.offsetWidth / 2 +
//   rect.width / 2}px`;
