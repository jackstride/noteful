import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./fontawesome";

import Pablo from "./images/app_preview.jpg";

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
          <div className="BG_SHAPES">
            <div className="circle shape_style"></div>
            <div className="rectangle shape_style"></div>
          </div>
          <div className="header_tagline">
            <h1>
              Get <span>Organised</span>
              <br></br> with noteful..
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
              <div className="feautre_heading">
              <h2>Features</h2>
              </div>
              <div className="features">
              {this.state.features.map(test => (
                <div className="i_features">
                  <FontAwesomeIcon className="font_icon" style={{color: '#323232'}} icon={test.icon} size='2x'/>
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
