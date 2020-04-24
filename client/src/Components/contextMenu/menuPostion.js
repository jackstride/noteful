import React, { useState, useEffect, useRef } from "react";

const MenuPosition = (props) => {
  const [width, setWidth] = useState(window.innerWidth);

  let [halfWay, setHalfWay] = useState(false);

  let [mouse, setMouse] = useState();

  useEffect(() => {
    let el = document.querySelector(".contextMenu");
    let top = el.getBoundingClientRect().left;
    console.log(top);

    if (top > window.innerWidth / 2) {
      setHalfWay(true);
    } else {
      setHalfWay(false);
    }
    // if (window.innerWidth <= 768) {
    //   setHalfWay(true);
    // } else {
    //   window.addEventListener("contextmenu", handleWidth);
    // }
    // return () => {
    //   window.removeEventListener("contextmenu", handleWidth);
    // };
  }, []);

  const { children, nodeRef } = props;

  let handleWidth = (e) => {
    let half = window.innerWidth / 2;
    if (e.clientX > half) {
      setHalfWay(true);
    } else {
      setHalfWay(false);
    }
    console.log(halfWay);
  };

  const style = {
    position: "absolute",
    top: props.top,
    bottom: props.bottom,
    left: props.left - 20,
    right: props.right,
  };

  const style2 = {
    position: "absolute",
    top: props.top - 150,
    left: props.left - 300,
  };

  return (
    <div
      style={halfWay ? style2 : style}
      className={props.className}
      ref={nodeRef}
      // onMouseEnter={(e) => handleWidth(e)}
      // onTouchStart={(e) => handleWidth(e)}
    >
      {children}
    </div>
  );
};

export default MenuPosition;
