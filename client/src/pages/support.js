import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../fontawesome";

import SectionOne from "../Components/Website/sectionOne";


let SocialCard = props => {
  return (
    <div className="contact_card">
      <FontAwesomeIcon icon={props.data.icon} size="3x" color="white" />
      <li><a href={props.data.link}>{props.data.text}</a></li>
    </div>
  );
};

export default class support extends Component {
  constructor(props) {
    super(props);

    this.state = {
      section: {
        heading: "Help & Support.",
        text:
          "Sometimes there might be issues that we're not aware of, thats where you come in. If you require support or experience any problems with our app then please notify us using the links below. ",
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
          icon: ["fab","twitter"]
        },
        {
          text: "@notefullapp",
          link: "https://instagram.com/notefulapp",
          icon: ["fab","instagram"]
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <SectionOne data={this.state.section} />
        <section class="inner_container contact_cards">
          {this.state.social.map((item, i) => (
            <SocialCard data={item} />
          ))}
        </section>
        <div style={{textAlign:"center"}}className="inner_container"><p>Or <br></br>Get the support you need below</p></div>
        <secton className="support_form inner_container">
            
            <form>
                <input placeholder="Full Name" type="text"></input>
                <input placeholder="Email Address" type="text"></input>
                <textarea rows="20" placeholder="Describe your problem..."></textarea>
                <div className="support_buttons">
                    <input type="submit"></input>
                    <input type="reset" value="Clear"></input>
                </div>
            </form>
        </secton>
      </div>
    );
  }
}
