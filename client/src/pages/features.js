import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../fontawesome";

import SectionOne from "../Components/Website/sectionOne";
import Illustration from "../images/illustration_man.svg";

let Feature = props => {
    console.log(props)
  return (
      <div className="feature_item">
          <div className="feature_icon">
          <FontAwesomeIcon icon={props.data.icon} size="lg" />
          </div>
          <div className="feature_content">
          <h6 style={{color: "black"}}>{props.data.heading}</h6>
          <p>{props.data.text}</p>
          </div>
          
      </div>
  )
};

export default class features extends Component {
  constructor(props) {
    super(props);

    this.state = {
      section: {
        heading: "Simple and Smart",
        text:
          "Smart & simple. Those are the only two words needed to describe noteful. Get access anywhere on any device, offline and online, to manage your notes, mark your to do's and create events ready for the week ahead.",
        image: Illustration
      },
      features: [
        {
          heading: "Create Events",
          text: "THis is some test text",
          icon: "cog",
        },
        {
            heading: "Manage Todo's",
            text: "THis is some test text",
            icon: "cog",
          },
          {
            heading: "Get writing with notes",
            text: "THis is some test text",
            icon: "cog",
          },
          {
            heading: "Access Offline",
            text: "THis is some test text",
            icon: "cog",
          },
          {
            heading: "Free Forever",
            text: "THis is some test text",
            icon: "cog",
          },
          {
            heading: "Strong Encryption",
            text: "THis is some test text",
            icon: "cog",
          },
          {
            heading: "Social Sign up",
            text: "THis is some test text",
            icon: "cog",
          },
          {
            heading: "Stay Organised",
            text: "THis is some test text",
            icon: "cog",
          },
      ]
    };
  }

  render() {
    return (
      <div>
        <SectionOne data={this.state.section} />
        <section className="features inner_container">
          <div className="f_heading">
            <h2>Features</h2>
          </div>
          <div className="features_individual">
              {this.state.features.map((item,i) => 
                  <Feature data={item} />
              )}
          </div>
        </section>
      </div>
    );
  }
}
