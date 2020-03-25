import React, { Component, Fragment } from "react";
import "../fontawesome";
import Swing from "../images/reading_book.png";
import Pencil from "../images/pencil.png";
import LargeHeader from "../Components/Website/LargeHeader";

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
      <Fragment>
        <div className="bg_gradient">
          <div className="inner_container">
            <div className="features">
              <div className="features_title">
                <h2>
                  Smart,simple and <br></br> ready to use.
                </h2>
              </div>
              <div className="feature_image">
                <LargeHeader
                  title="Jump straight in"
                  paragraph={this.state.section.text}
                  color="blue"
                />
                <img src={Pencil} alt="Type with noteful"></img>
              </div>
            </div>

            <div className="small_heading">
              {this.state.features.slice(0, 3).map((item, index) => {
                return <SmallHeading title={item.heading} main={item.body} />;
              })}
            </div>
          </div>
        </div>
        <div className="inner_container">
          <section className="features_2">
            <div className="features_text">
              <h2>What are the features of noteful?</h2>
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
      </Fragment>
    );
  }
}

let SmallHeading = ({ title, main }) => {
  return (
    <div className="content">
      <h4> {title}</h4>
      <p>{main}</p>
    </div>
  );
};
