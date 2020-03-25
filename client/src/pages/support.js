import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../fontawesome";
import LargeHeader from "../Components/Website/LargeHeader";
import Stacking from "../images/stacking.png";
import { connect } from "react-redux";
import { supportRequest } from "../actions/authActions";

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

class Support extends Component {
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
      ],
      name: "",
      email: "",
      message: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    let formValues = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
    };

    let { name, email, message } = formValues;

    if (name.length > 0 && email.length > 0 && message.length > 0) {
      this.props.supportRequest(formValues);
    }
  };

  render() {
    return (
      <div className="support">
        <div className="inner_container">
          <div className="support_header">
            <img src={Stacking} alt="Noteful stacking"></img>
            <div className="support_heading">
              <h5>Need some help</h5>
              <h1> Let us support you</h1>
              <p>
                Everyone make mistakes and incase we've made a few, please use
                the options below to message us. Even say hi 👋
              </p>
              <button
                onClick={() =>
                  document.querySelector(".support_form").scrollIntoView()
                }
              >
                Message us
              </button>
            </div>
          </div>

          <LargeHeader
            title="!@#%*#$%"
            paragraph="We understand how you feel. Deep breathe. Use the below information to contact us! We aim to reply within an hour."
            color="blue"
          />
          <div className="support_bg">
            <section className="contact_cards">
              {this.state.social.map((item, i) => (
                <SocialCard key={i} data={item} />
              ))}
            </section>
          </div>
        </div>

        <div className="bg_gradient">
          <div
            style={{ textAlign: "center" }}
            className="inner_container support_contact"
          >
            <h2> Message us</h2>
            <p>Please contact using the form below if you have any problems.</p>
          </div>
          <section className="support_form">
            <form
              method="post"
              onSubmit={e => {
                this.handleSubmit(e);
              }}
            >
              <input
                onChange={e => {
                  this.setState({
                    name: e.target.value
                  });
                }}
                placeholder="Full Name"
                name="name"
                type="text"
              ></input>
              <input
                onChange={e => {
                  this.setState({
                    email: e.target.value
                  });
                }}
                placeholder="Email Address"
                name="email"
                type="text"
              ></input>
              <textarea
                onChange={e => {
                  this.setState({
                    message: e.target.value
                  });
                }}
                name="message"
                rows="20"
                placeholder="Describe your problem..."
              ></textarea>
              <div className="support_buttons">
                <input type="submit"></input>
                <input type="reset" value="Clear"></input>
              </div>
            </form>
          </section>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = state => dispatch => ({
  supportRequest: formValues => dispatch(supportRequest(formValues))
});

export default connect(null, mapDispatchToProps)(Support);
