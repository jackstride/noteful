import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
const axios = require("axios");

const Logout = ({ isAuthenticated, logout }) => {
  const [gif, setGif] = useState();
  const history = useHistory();

  let config = {
    header: {
      "Content-Type": "text/html",
      "Set-Cookie": "HttpOnly;Secure;SameSite=lax"
    }
  };
  useEffect(() => {
    axios
      .get(
        "https:////api.giphy.com/v1/gifs/search?q=goodbye&api_key=Y5snFyvuJWBxCqMFarJq7e3lBtBV046X&limit=10",
        config
      )
      .then(data => {
        let n = Math.floor(Math.random() * 10);
        let image = data.data.data[n].images.original.url;
        setGif(image);
      });
  }, [setGif]);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);
  return (
    <div className="section_logout">
      <div className="gif_container">
        <h2>To continue, click the button below</h2>
        <div className="gif_image">{gif ? <img src={gif}></img> : null}</div>
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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  };
};

export default connect(mapStateToProps, { logout })(Logout);
