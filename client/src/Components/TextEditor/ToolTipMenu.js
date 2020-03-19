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
      return;
    }

    let padding = {
      x: 20,
      y: 50
    };

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();

    el.style.display = "block";
    el.style.top = `${rect.top - padding.y}px`;
    el.style.left = `${rect.left + padding.x}px`;
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
