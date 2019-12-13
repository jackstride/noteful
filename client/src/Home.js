import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Navigation from "./Components/Website/Navigation";

import Pablo from "./images/app_preview.jpg";

export default class home extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push("/register");
  };
  render() {
    return (
      <div className="home_app_container">
        <Navigation />
        <div className="welcome_page">
          <div className="BG_SHAPES">
            <div className="circle shape_style"></div>
            <div className="rectangle shape_style"></div>
          </div>
          <div className="header_tagline">
            <h1>
              {" "}
              Get <span>Organised</span>
              <br></br> with noteFul..
            </h1>
            <h3>Sign up today. Free of charge.</h3>
            <input
              type="button"
              onClick={this.handleSubmit}
              value="Register"
            ></input>
          </div>
          <div className="app_preview_image">
            <img src={Pablo} href="noteful Preview"></img>
          </div>
          <div className="feature_container shape_style">
            <div className="inner_container">
              <h2>Features</h2>
              <p>Noteful is built with simple user interface keeping the user in mind. Easy access to notes</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
