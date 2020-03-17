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
            reverse ? { backgroundColor: color } : { backgroundColor: color }
          }
        ></span>
        <h3
          style={
            reverse
              ? { marginRight: "20px", textAlign: "right" }
              : { marginLeft: "20px" }
          }
        >
          {title}
        </h3>
        <p style={reverse ? { textAlign: "right" } : null}>{paragraph}</p>
      </div>
    </div>
  );
};

export default LargeHeader;
