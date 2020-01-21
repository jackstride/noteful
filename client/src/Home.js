import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./fontawesome";

import Tiles from "./images/header_tile.svg";

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features: [
        {
          heading: "Create Events",
          tagline: "Simple interface to manage future events.",
          icon: "calendar-week"
        },
        {
          heading: "Manage To Do's",
          tagline:
            "Easily access, add, remove and mark your todo's easily anywhere on the app.",
          icon: "tasks"
        },
        {
          heading: "Get typing with notes",
          tagline:
            "Create rich filled notes ready to leave and pick up anytime, anywhere.",
          icon: "sticky-note"
        },
        {
          heading: "Access Offline",
          tagline: "Get access to everything even when you're offline.",
          icon: "cloud"
        }
      ]
    };
  }

  createFeatures = () => {
    console.log("HI");
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push("/register");
  };
  render() {
    return (
      <div className="home_app_container">
        <div className="welcome_page">
          <header>
            <div className="inner_container">
              <div className="header_text">
                <div className="header_small">
                  <h3>We think it's time.</h3>
                  <hr></hr>
                </div>
                <h1>
                  Type with <br></br>noteful.
                </h1>
                <p>
                  {" "}
                  It's time to switch away from paper and begin with Noteful.
                  Sign up today. Free of charge
                </p>
                <input
                  type="button"
                  onClick={this.handleSubmit}
                  value="Register"
                ></input>
              </div>
              <div className="header_image">
                <img src={Tiles} alt="Tiles"></img>
              </div>
            </div>
          </header>
          {/* <div className="BG_SHAPES">
            <div className="circle shape_style"></div>
            <div className="rectangle shape_style"></div>
          </div> */}

          <div className="feature_container shape_style">
            <div className="inner_container">
              <div className="feautre_heading">
                <h2>Features</h2>
              </div>
              <div className="features">
                {this.state.features.map((test,index) => (
                  <div className="i_features" key={test + index} >
                    <FontAwesomeIcon
                      className="font_icon"
                      style={{ color: "#323232" }}
                      icon={test.icon}
                      size="2x"
                    />
                    <h3>{test.heading}</h3>
                    <p>{test.tagline}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
