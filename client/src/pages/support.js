import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../fontawesome";
import LargeHeader from "../Components/Website/LargeHeader";
import Stacking from "../images/stacking.png";

let SocialCard = props => {
  return (
    <div className="contact_card">
      <FontAwesomeIcon icon={props.data.icon} size="3x" color="white" />
      <li>
        <a href={props.data.link}>{props.data.text}</a>
      </li>
    </div>
  );
};

export default class support extends Component {
  constructor(props) {
    super(props);

    this.state = {
      section: {
        heading: "Need Support? We got you",
        text:
          "We understand how you feel. Deep breathe. Use the below information to contact us! We aim to reply within an hour."
      },
      social: [
        {
          text: "support@noteful.app",
          link: "mailto:support@noteful.app?Subject=Hello%20again",
          icon: "paper-plane"
        },
        {
          text: "@notefulapp",
          link: "https://twitter.com/notefulapp",
          icon: ["fab", "twitter"]
        },
        {
          text: "@notefullapp",
          link: "https://instagram.com/notefulapp",
          icon: ["fab", "instagram"]
        }
      ]
    };
  }

  render() {
    return (
      <div className="support inner_container">
        <div className="about_title">
          <h2>Need Support?</h2>
        </div>
        <div className="support_header">
          <LargeHeader
            title="!@#%*#$%"
            paragraph="We understand how you feel. Deep breathe. Use the below information to contact us! We aim to reply within an hour."
            color="blue"
          />
          <img src={Stacking} alt="Noteful stacking"></img>
        </div>
        <div className="support_bg">
          <section class="contact_cards">
            {this.state.social.map((item, i) => (
              <SocialCard data={item} />
            ))}
          </section>
          <div style={{ textAlign: "center" }} className="inner_container">
            <h2> Contact us</h2>
            <p>
              Please use the form below as an alternative method to contact us
              incase of issues that you may be facing.{" "}
            </p>
          </div>
          <secton className="support_form">
            <form>
              <input placeholder="Full Name" type="text"></input>
              <input placeholder="Email Address" type="text"></input>
              <textarea
                rows="20"
                placeholder="Describe your problem..."
              ></textarea>
              <div className="support_buttons">
                <input type="submit"></input>
                <input type="reset" value="Clear"></input>
              </div>
            </form>
          </secton>
        </div>
      </div>
    );
  }
}
