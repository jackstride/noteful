import React, { useState, useEffect } from "react";

const DarkMode = () => {
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    if (theme) {
      document.querySelector(".app_container").classList.add("dark-mode");
      localStorage.setItem("dark_mode", theme);
    } else {
    }
  }, [theme]);
  return <span></span>;
};

export default DarkMode;
