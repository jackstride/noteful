import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./fontawesome";

import Tiles from "./images/header_tile.svg";

import Preview from "./images/browser_preview.jpg";
import PhonePreview from "./images/iphone_preview.png";

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features: [
        {
          heading: "Type Anywhere.",
          text:
            "Are you full of interesting ideas or typing up your biography? Start where you last left off on any device and use any browser."
        },
        {
          heading: "Remember Todays Tasks.",
          text:
            "Not only can you create rich notes, you can also create tasks and events. It's quick and simple to add a note or task and just as satisfying to mark as complete."
        },
        {
          heading: "Easier Workflow.",
          text: "Workflow has never been easier wand simpler. Try it yourself."
        },
        {
          heading: "Dark Mode.",
          text:
            "Working late in the evening? Don't worry, we have dark mode for that."
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
      <Fragment>
          <header>
            <div className="left">
            <div className="inner_container">
              <div className="header_text">
                <div className="header_small">
                  <h4>We think it's time.</h4>
                  <hr></hr>
                </div>
                <div className="header_main">
                <h1>
                  Begin typing with <br></br>noteful.
                </h1>
                <h6>
                  Switch away from paper and begin typing with Noteful.
                  Sign up today. Free of charge!
                </h6>
                <input
                  type="button"
                  onClick={this.handleSubmit}
                  value="Register"
                ></input>
                </div>
              </div>
              </div>
              </div>
              <div className="header_image">
              </div>
          </header>

          <div className="previews">
          <div className="blue_seperator"></div>
            <div className="orange_seperator"></div>
            <div className="white_seperator">
            <div className="app_info inner_container">
                {this.state.features.map((data, i) => (
                  <React.Fragment>
                    <div className="info_block">
                      <div className="info_header">
                        <h3 style={{ color: "black" }}>{data.heading}</h3>
                      </div>
                      <div className="info_para">
                        <p style={{ color: "black" }}>{data.text}</p>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="preview_content">
              <div className="tag_info col-1 inner_container">
                <h4>
                  Browser<br></br>Based.
                </h4>
                <h4>
                  Social<br></br>Login.
                </h4>
                <h4>
                  All<br></br>Devices.
                </h4>
              </div>
              <div className="dashboard_preview inner_container">
                <img src={Preview} alt="Noteful dashboard preview"></img>
              </div>
              <div className="iphone_preview inner_container">
                <img src={PhonePreview} alt="Noteful dashboard preview"></img>
              </div>
              
            </div>
          </div>
          </Fragment>        
    );
  }
}
