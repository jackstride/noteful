import React, { Fragment, useState } from "react";
import "../fontawesome";
import Swing from "../images/reading_book.jpg";
import Pencil from "../images/pencil.png";
import LargeHeader from "../Components/Website/LargeHeader";
import FeaturesIntersect from "../Components/Intersects/FeaturesIntersect";
import Third from "../images/third.gif";
import BrowserHeader from "../images/browserheader.webp";

const Features = () => {
  const [features, setFeatures] = useState([
    {
      heading: "Access Offline",
      body: "Get access to everything, even when you're offline.",
      icon: "cloud",
    },
    {
      heading: "Strong Encryption",
      body:
        "Noteful will always encrypt users private information with the last standards.",
      icon: "lock",
    },
    {
      heading: "Stay Organised",
      body:
        "Our UI is intuative, easy to learn ready for you to get started out of the box.",
      icon: "pencil-alt",
    },
    {
      heading: "Create Tasks",
      body:
        "Tasks are like To-Do's but we call them tasks. Easily add, remove, and mark them off when complete!",
    },
    {
      heading: "Type Notes",
      body:
        "Create rich filled notes ready to leave and pick up anywhere, anytime!",
    },
    {
      heading: "Have an event coming up?",
      body: "Simple interface to manage your future events. Can we come?",
    },
  ]);

  const [section, setSection] = useState({
    heading: "Smart,simple and ready to use.",
    text:
      "Not only can you create rich notes, you can also create tasks and events. It's quick and simple to add a note or task and just as satisfying to mark as complete.",
  });

  let [one, two, three] = FeaturesIntersect();

  return (
    <Fragment>
      <div className="features2">
        <div className="bg_gradient">
          <div className="inner_container">
            <div className="features">
              <div className="features_title">
                <h2 className="animated fadeInUp">
                  Smart,simple and <br></br> ready to use.
                </h2>
              </div>
              <div className="feature_image">
                <LargeHeader
                  ref={three}
                  cn="animated fadeInUp"
                  title="Jump straight in"
                  paragraph={section.text}
                  color="blue"
                />
                <img src={Pencil} alt="Type with noteful"></img>
              </div>
            </div>
            <div ref={one} style={{ opacity: "0" }} className="small_heading">
              {features.slice(0, 3).map((item, index) => {
                return <SmallHeading title={item.heading} main={item.body} />;
              })}
            </div>
            <div className="gif-image">
              <img src={BrowserHeader}></img>
              <img src={Third}></img>
            </div>
          </div>
        </div>
        <div className="inner_container">
          <section className="features_2">
            <div ref={two} className="features_text">
              <h2 style={{ opacity: "0" }}>
                What are the features of noteful?
              </h2>
              {features.slice(3, 6).map((item, index) => {
                return (
                  <div style={{ opacity: "0" }} className="features_content">
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
      </div>
    </Fragment>
  );
};

let SmallHeading = ({ title, main }) => {
  return (
    <div className="content">
      <h4> {title}</h4>
      <p>{main}</p>
    </div>
  );
};

export default Features;
