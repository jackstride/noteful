import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Space from "../../images/logout_space.png";
const axios = require("axios");

const Logout = ({ isAuthenticated, logout, name }) => {
  const [gif, setGif] = useState();
  const history = useHistory();

  const [social, setSocial] = useState([
    {
      text: "@notefulapp",
      link: "https://twitter.com/notefulapp",
      icon: ["fab", "twitter"],
    },
    {
      text: "@notefullapp",
      link: "https://instagram.com/notefulapp",
      icon: ["fab", "instagram"],
    },
  ]);

  let config = {
    header: {
      "Content-Type": "text/html",
      "Set-Cookie": "HttpOnly;Secure;SameSite=lax",
    },
  };
  // useEffect(() => {
  //   axios
  //     .get(
  //       "https:////api.giphy.com/v1/gifs/search?q=goodbye&api_key=Y5snFyvuJWBxCqMFarJq7e3lBtBV046X&limit=10",
  //       config
  //     )
  //     .then((data) => {
  //       let n = Math.floor(Math.random() * 10);
  //       let image = data.data.data[n].images.original.url;
  //       setGif(image);
  //     });
  // }, [setGif]);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);
  return (
    <div className="section_logout">
      <div className="logout_container">
        <div className="logout_card">
          <div className="profile"></div>
          <h4> Logging out {name}?</h4>
          <div className="social_message">
            <h6> Remember to support us using the links below!</h6>
            <div className="social_links">
              <span>
                <FontAwesomeIcon
                  icon={social[0].icon}
                  size="2x"
                  color="#2962FF"
                />
              </span>
              <span>
                <FontAwesomeIcon
                  icon={social[1].icon}
                  size="2x"
                  color="#2962FF"
                />
              </span>
            </div>
          </div>
          <h6>Click below to securely logout</h6>
        </div>

        <div className="log_message"></div>
        <button
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    name: state.auth.user.firstName,
  };
};

export default connect(mapStateToProps, { logout })(Logout);
