import React from "react";

let LargeHeader = ({ color, title, paragraph, reverse, cn }) => {
  return (
    <div
      style={reverse ? { justifyContent: "flex-end" } : null}
      className={cn ? `large_header ${cn}` : "large_header"}
    >
      <div
        className="content"
        style={reverse ? { alignItems: "flex-end" } : null}
      >
        <h3
          style={
            reverse
              ? { marginRight: "20px", textAlign: "right" }
              : { marginLeft: "20px" }
          }
        >
          <span
            style={{ backgroundColor: color }}
            style={
              reverse
                ? { backgroundColor: color, right: "-15px" }
                : { backgroundColor: color, left: "-15px" }
            }
          ></span>
          {title}
        </h3>
        <p style={reverse ? { textAlign: "right" } : null}>{paragraph}</p>
      </div>
    </div>
  );
};

export default LargeHeader;
