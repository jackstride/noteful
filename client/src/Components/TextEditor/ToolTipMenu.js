import React, { useState, useRef, useEffect } from "react";
import { Portal } from "react-portal";
import { Range, Editor } from "slate";
import { useSlate, ReactEditor } from "slate-react";
const ToolTipMenu = ({ children }) => {
  let [currentSelection, setSelection] = useState();
  let [show, setShow] = useState(false);
  const ref = useRef();
  const editor = useSlate();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;
    setSelection(selection);
    if (!el) {
      return;
    }
    if (!selection || Editor.string(editor, selection) === " ") {
      setShow(false);
      el.removeAttribute("style");
      return;
    }
    if (
      currentSelection &&
      selection.anchor.path[0] === currentSelection.anchor.path[0]
    ) {
      return;
    }

    let padding = {
      x: 20,
      y: 40
    };

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    console.log(domSelection);

    let y = domSelection.anchorNode.parentNode.offsetTop;
    let x = domSelection.anchorNode.parentNode.offsetLeft;
    let py = domSelection.anchorNode.parentNode.offsetParent.offsetTop;
    let px = domSelection.anchorNode.parentNode.offsetParent.offsetLeft;

    setShow(true);
    el.style.top = `${y + py + padding.y}px`;
    el.style.left = `${px}px`;
  });

  // document.addEventListener("keyup", () => {
  //   document.querySelector(".text_editor_tooltip").style.display = "none";
  // });

  return (
    <Portal>
      <div ref={ref} className="text_editor_tooltip">
        {show ? children : null}
      </div>
    </Portal>
  );
};

export default ToolTipMenu;
