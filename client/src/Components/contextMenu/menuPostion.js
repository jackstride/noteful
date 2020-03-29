import React, { useState, useEffect, useRef } from "react";

const MenuPosition = props => {
  let [width, setWidth] = useState(window.innerWidth);
  let [halfWay, setHalfWay] = useState(false);

  useEffect(() => {
    let handleScroll = e => {
      let half = window.innerWidth / 2;
      if (e.clientX > half) {
        setHalfWay(true);
      } else {
        setHalfWay(false);
      }

      console.log(halfWay);
    };

    window.addEventListener("click", handleScroll);

    return () => {
      window.removeEventListener("click", handleScroll);
    };
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
    top: props.top - 200,
    left: props.left - 300
  };

  return (
    <div
      style={width > 768 ? style2 : style}
      className={props.className}
      ref={nodeRef}
    >
      {children}
    </div>
  );
};

export default MenuPosition;
