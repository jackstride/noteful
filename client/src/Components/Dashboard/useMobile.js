import React, { useState, useEffect } from "react";

const useMobile = () => {
  const [mobile, isMobile] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (width <= 425) {
      isMobile(true);
    } else {
      isMobile(false);
    }
  }, []);

  useEffect(() => {
    const handleResize = (e) => {
      console.log(e.target.innerWidth);
    };

    window.addEventListener("resize", (e) => handleResize(e));

    return () => {
      window.removeEventListener("resize", (e) => handleResize(e));
    };
  }, []);

  return mobile;
};

export default useMobile;
