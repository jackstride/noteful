import React, { useState } from "react";
import Searching from "../images/searching.png";
import LargeHeader from "../Components/Website/LargeHeader";
import { Link } from "react-router-dom";

const About = () => {
  let [content, setContent] = useState([
    {
      title: "Always Free",
      paragraph:
        "We've never thought about charging our users so why start now? You will never have to pay for your experience with noteful. Sign up below!"
    },
    {
      title: "Our Data promise",
      paragraph:
        "We user the latest and strongest encryption standards so your data is kepy secure and private. We only ask for the minimum. Something we pride ourselves on. "
    }
  ]);

  return (
    <div className="inner_container">
      <div className="about_title">
        <h2>
          Smart,simple and <br></br> ready to use.
        </h2>
      </div>
      <div className="about_image">
        <img src={Searching} alt="Man Searching"></img>
      </div>
      <LargeHeader
        title={content[0].title}
        paragraph={content[0].paragraph}
        color="blue"
      />
      <LargeHeader
        title={content[1].title}
        paragraph={content[1].paragraph}
        reverse={true}
        color="#F1B505"
      />

      <div className="small_heading">
        <SmallHeading title="Notes." main="Type enriched Notes." />
        <SmallHeading title="Tasks." main="Manage your whole week." />
        <SmallHeading title="Offile." main="Access anywhere." />
      </div>

      <div className="about_title">
        <h2>
          Get started in seconds <br></br> Register Today
        </h2>
        <div className="register_button">
          <Link to="/register">
            <span>Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;

let SmallHeading = ({ title, main }) => {
  return (
    <div className="content">
      <h4> {title}</h4>
      <p>{main}</p>
    </div>
  );
};
