import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const ScrollTop = () => {
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [history.location.pathname]);

  return null;
};

export default ScrollTop;
