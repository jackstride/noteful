import React from "react";

let LargeHeader = ({ color, title, paragraph, reverse }) => {
  return (
    <div
      style={reverse ? { justifyContent: "flex-end" } : null}
      className="large_header"
    >
      <div
        className="content"
        style={reverse ? { alignItems: "flex-end" } : null}
      >
        <span
          className="point"
          style={{ backgroundColor: color }}
          style={
            reverse
              ? { right: "-25px", backgroundColor: color }
              : { left: "-25px", backgroundColor: color }
          }
        ></span>
        <h3 style={reverse ? { textAlign: "right" } : null}>{title}</h3>
        <p style={reverse ? { textAlign: "right" } : null}>{paragraph}</p>
      </div>
    </div>
  );
};

export default LargeHeader;
