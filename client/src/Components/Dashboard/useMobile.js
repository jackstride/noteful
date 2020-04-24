import React, { useState, useEffect } from "react";

const useMobile = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (e) => {
      setWidth(e.target.innerWidth);
    };

    window.addEventListener("resize", (e) => handleResize(e));

    return () => {
      window.removeEventListener("resize", (e) => handleResize(e));
    };
  }, []);

  return width <= 425 ? true : false;
};

export default useMobile;
