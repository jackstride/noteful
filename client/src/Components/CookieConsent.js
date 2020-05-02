import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CookieConsent = () => {
  const history = useHistory();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent) {
      setShow(false);
    }
  });

  let accept = () => {
    localStorage.setItem("cookie_consent", true);
    setShow(false);
  };

  let policy = () => {
    history.push("/push");
  };

  return show ? (
    <div className="cookie_container">
      <FontAwesomeIcon icon="cookie-bite" color="white" size="2x" />
      <div className="cookie_message">
        <p>
          We use cookies to ensure you get the best experience from our
          applicataion
        </p>
      </div>
      <div className="cookie_buttons">
        <button
          onClick={() => {
            policy();
          }}
          className="policy"
        >
          Learn More
        </button>
        <button
          onClick={() => {
            accept();
          }}
          className="accept"
        >
          Allow Cookies
        </button>
      </div>
    </div>
  ) : null;
};

export default CookieConsent;
