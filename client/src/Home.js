import React, { Component, Fragment } from "react";

import "./fontawesome";

import PhonePreview from "./images/iphone_preview.png";
import Card from "./Components/Website/Card.js";
import HeaderImage from "./images/header.png";
import Pencil from "./images/pencil.png";

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      information: [
        {
          heading: "Type Anywhere.",
          text:
            "Are you full of interesting ideas or typing up your biography? Start where you last left off on any device and use any browser."
        },
        {
          heading: "Remember Todays Tasks.",
          text:
            "Not only can you create rich notes, you can also create tasks and events. It's quick and simple to add a note or task and just as satisfying to mark as complete."
        },
        {
          heading: "Easier Workflow.",
          text: "Workflow has never been easier wand simpler. Try it yourself."
        }
      ],
      headings: [
        {
          header: "Organising things in one place helps eliminate stress",
          main: ""
        },
        {
          header: "Dark Mode.",
          main:
            "Surprisingly 99% of people type in the dark. As a result we created dark mode.. Okay, that's false but we thought it looked nice."
        }
      ],
      cards: [
        {
          heading: "Remembers todays tasks.",
          body:
            "Not only can you create rich notes, you can also create tasks and events. It's quick and simple to add a note or task and just as satisfying to mark as complete."
        },
        {
          heading: "Easier Workflow",
          body:
            "Workflow has never been easier and simpler. Try it yourself for free."
        },
        {
          heading: "Write Anywhere.",
          body:
            "Are you full of interesting ideas or typing up your biography? Start where you last left off on any device and use any browser."
        }
      ]
    };
  }

  createFeatures = () => {
    console.log("HI");
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push("/register");
  };
  render() {
    return (
      <Fragment>
        <div className="inner_container home">
          <header>
            <div className="header_text">
              <div className="header_small">
                <h4>We think it's time.</h4>
                <hr></hr>
              </div>
              <div className="header_main">
                <h1>
                  Goodbye paper..<br></br>
                  Hello noteful!
                </h1>
                <h6>
                  Switch away from paper and begin typing with Noteful.
                  <br></br>
                  Sign up today. Free of charge!
                </h6>
                <input
                  type="button"
                  onClick={this.handleSubmit}
                  value="Register"
                ></input>
              </div>
            </div>
            <div className="header_image">
              <img src={HeaderImage} alt="Noteful App"></img>
            </div>
          </header>

          <div className="tag_info">
            <h4>
              Browser<br></br>Based.
            </h4>
            <h4>
              Social<br></br>Login.
            </h4>
            <h4>
              All<br></br>Devices.
            </h4>
          </div>
          <div className="row heading">
            <h2>
              Organising things in one <br></br> place helps to eleminate
              <br></br> stress.
            </h2>
          </div>

          <div className="pencil_image">
            <div className="color_card">
              <h3>{this.state.cards[0].heading}</h3>
              <p>{this.state.cards[0].body}</p>
            </div>
            <div className="image">
              <img src={Pencil} alt="Plan with noteful"></img>
            </div>
          </div>

          <section className="info_cards">
            <div className="cards_grid">
              <Card data={this.state.cards[2]} />
            </div>
          </section>
          <div className="header_darkmode">
            <SectionHeader data={this.state.headings[1]} />
          </div>
          <section className="iphone_image">
            <img src={PhonePreview} alt="Noteful on iPhone"></img>
          </section>

          <section className="home_features">
            <Card data={this.state.cards[2]} />
            <Card data={this.state.cards[2]} />
            <Card data={this.state.cards[2]} />
          </section>
        </div>
      </Fragment>
    );
  }
}

let SectionHeader = props => {
  return (
    <section className="section_header">
      <div className="inner_container">
        <div className="section_header_text">
          <h2>{props.data.header}</h2>
          <h4>{props.data.main}</h4>
        </div>
      </div>
    </section>
  );
};
