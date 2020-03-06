import React, { useState, useEffect } from "react";

const DarkMode = () => {
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    if (theme) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("dark_mode", theme);
    }
  }, [theme]);
  return <span></span>;
};

export default DarkMode;
