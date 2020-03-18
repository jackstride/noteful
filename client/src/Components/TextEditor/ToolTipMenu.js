import React, { useState, useRef, useEffect } from "react";
import { Portal } from "react-portal";
import { Range, Editor } from "slate";
import { useSlate, ReactEditor } from "slate-react";
const ToolTipMenu = ({ children }) => {
  const ref = useRef();
  const editor = useSlate();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;
    console.log(selection);
    if (!el) {
      return;
    }

    if (!selection || !ReactEditor.isFocused(editor)) {
      console.log("true");
      el.removeAttribute("style");
      return;
    }

    // attach handler to the click event of the document
    if (document.attachEvent) document.attachEvent("onclick", handler);
    else document.addEventListener("click", handler);

    const domSelection = window.getSelection();
    console.log(domSelection);
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();

    function handler(e) {
      e = e || window.event;

      var pageX = e.pageX;
      var pageY = e.pageY;

      el.style.display = "block";
      el.style.top = `${pageY}px`;
      el.style.left = `${pageX}px`;
    }
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
