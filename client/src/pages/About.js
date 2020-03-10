import React from "react";
import Women from "../images/women_hugging.png";
import Card from "../Components/Website/Card";

const About = () => {
  return (
    <div className="inner_container">
      <div className="section about">
        <div className="about_image">
          <img src={Women} alt="Women sharing love"></img>
        </div>
        <div className="about_text">
          <div className="about_title">
            <h1>Want to learn abit more about us?</h1>
          </div>
          <Card
            data={{
              heading: "We will alays be free",
              body:
                "We've never thought about charging our users so why start now? You will never have to pay for your experience with noteful. Make sure you sign up below!"
            }}
          />
          <Card
            data={{
              heading: "Our Data Promise",
              body:
                "We use the latest and strongest encryption standards to ensure your data is kept secure and private. We only ask for the minimum - something we pride ourselves on."
            }}
          />
        </div>
      </div>
      <div className="register_today">
        <h2>Register today</h2>
        <button className="register_button">Register</button>
      </div>
      <div className="f_row">
        <div className="f_row_single">
          <h4> Notes</h4>
          <p>Write enriched notes</p>
        </div>
        <div className="f_row_single">
          <h4> Notes</h4>
          <p>Write enriched notes</p>
        </div>
        <div className="f_row_single">
          <h4> Notes</h4>
          <p>Write enriched notes</p>
        </div>
        <div className="f_row_single">
          <h4> Notes</h4>
          <p>Write enriched notes</p>
        </div>
      </div>
      <div className="about_message">
        <h2> Get started in seconds</h2>
      </div>
    </div>
  );
};

export default About;