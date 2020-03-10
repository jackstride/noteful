import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../fontawesome";

import SectionOne from "../Components/Website/sectionOne";
import Card from "../Components/Website/Card";
import Swing from "../images/women_swing.png";
import Image_One from "../images/reading_book.png";

let Feature = props => {
  console.log(props);
  return (
    <div className="feature_item">
      <div className="feature_icon">
        <FontAwesomeIcon icon={props.data.icon} size="2x" />
      </div>
      <div className="feature_content">
        <h6 style={{ color: "black" }}>{props.data.heading}</h6>
        <p>{props.data.text}</p>
      </div>
    </div>
  );
};

export default class features extends Component {
  constructor(props) {
    super(props);

    this.state = {
      section: {
        heading: "Smart,simple and ready to use.",
        text:
          "Not only can you create rich notes, you can also create tasks and events. It's quick and simple to add a note or task and just as satisfying to mark as complete."
      },
      features: [
        {
          heading: "Access Offline",
          body: "Get access to everything, even when you're offline.",
          icon: "cloud"
        },
        {
          heading: "Strong Encryption",
          body:
            "Noteful will always encrypt users private information with the last standards.",
          icon: "lock"
        },
        {
          heading: "Stay Organised",
          body:
            "Our UI is intuative, easy to learn ready for you to get started out of the box.",
          icon: "pencil-alt"
        },
        {
          heading: "Create Tasks",
          body:
            "Tasks are like To-Do's but we call them tasks. Easily add, remove, and mark them off when complete!"
        },
        {
          heading: "Type Notes",
          body:
            "Create rich filled notes ready to leave and pick up anywhere, anytime!"
        },
        {
          heading: "Have an event coming up?",
          body: "Simple interface to manage your future events. Can we come?"
        }
      ]
    };
  }

  render() {
    return (
      <div className="inner_container">
        <SectionOne
          title={this.state.section.heading}
          image={Image_One}
          heading="Jump straight In"
          body={this.state.section.text}
        />
        <section className="features">
          <div className="feature_cards">
            <Card data={this.state.features[0]} />
            <Card data={this.state.features[1]} />
            <Card data={this.state.features[2]} />
          </div>
        </section>
        <section className="features_2">
          <div className="features_text">
            <h3>What are the features of noteful?</h3>
            {this.state.features.slice(3, 6).map((item, index) => {
              return (
                <div className="features_content">
                  <h4>{item.heading}</h4>
                  <p>{item.body}</p>
                </div>
              );
            })}
          </div>
          <div className="features_image">
            <img src={Swing} alt="Noteful on a swing"></img>
          </div>
        </section>
      </div>
    );
  }
}
