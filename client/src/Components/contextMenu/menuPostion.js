import React, { useState, useEffect, useRef } from "react";

const MenuPosition = props => {
  let [width, setWidth] = useState();

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const { children, nodeRef } = props;

  const style = {
    position: "absolute",
    top: props.top,
    bottom: props.bottom,
    left: props.left - 20,
    right: props.right
  };

  const style2 = {
    position: "absolute",
    top: props.top + 25,
    left: "5%",
    transform: "origin(bottom right)"
  };

  return (
    <div
      style={width <= 768 ? style2 : style}
      className={props.className}
      ref={nodeRef}
    >
      {children}
    </div>
  );
};

export default MenuPosition;
