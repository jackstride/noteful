import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../fontawesome";

import SectionOne from "../Components/Website/sectionOne";
import Card from '../Components/Website/Card'


let Feature = props => {
    console.log(props)
  return (
      <div className="feature_item">
          <div className="feature_icon">
          <FontAwesomeIcon icon={props.data.icon} size="2x"/>
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
        heading: "Simple and Smart.",
        text:
          "Smart & simple. Those are the only two words needed to describe noteful. Get access anywhere on any device, offline and online, to manage your notes, mark your to do's and create events ready for the week ahead.",
        
      },
      features: [
        {
          heading: "Access Offline",
          body: "Get access to everything, even when you're offline.",
          icon: "cloud",
        },
        {
          heading: "Strong Encryption",
          body: "Noteful will always encrypt users private information with the last standards.",
          icon: "lock",
        },
        {
          heading: "Stay Organised",
          body: "Our UI is intuative, easy to learn ready for you to get started out of the box.",
          icon: "pencil-alt",
        },
        {
          heading: "Create Events",
          text: "Simple interface to manage future events.",
          icon: "calendar-week",
        },
        {
            heading: "Manage Todo's",
            text: "Easily Access, add, remove and mark your to do's from the dashboard.",
            icon: "tasks",
          },
          {
            heading: "Get writing with notes",
            text: "Create rich filled notes ready to leave and pick up anytime, anywhere.",
            icon: "sticky-note",
          },
          
          {
            heading: "Free Forever",
            text: "Noteful will always be a free Web Application for you to enjoy.",
            icon: "money-bill-wave",
          },
          
          {
            heading: "Social Sign up",
            text: "Don't want to manually create an account? Login with Twitter, Facebook or Google!",
            icon: "user-plus",
          },
          
      ]
    };
  }

  render() {
    return (
      <div>
        <SectionOne data={this.state.section} />
        <section className="features">
          <div className="inner_container">
          <div className="feature_cards">
            <Card data={this.state.features[0]} />
            <Card data={this.state.features[1]}/>
            <Card data={this.state.features[2]}/>
          </div>
          </div>
        </section>
      </div>
    );
  }
}
