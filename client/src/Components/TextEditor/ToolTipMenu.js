import React, { useState } from "react";
import { Portal } from "react-portal";
const ToolTipMenu = ({ children, menu }) => {
  let [ttShow, setTTshow] = useState(false);
  return (
    <Portal>
      {menu.show ? (
        <div
          style={menu.x ? { left: menu.x, top: menu.y } : null}
          className="text_editor_tooltip"
        >
          <li
            onClick={() => {
              setTTshow(!ttShow);
            }}
          >
            Show
          </li>
          {ttShow ? children : null}
          {}
        </div>
      ) : null}
    </Portal>
  );
};

export default ToolTipMenu;
