import React, { Component, Fragment } from "react";
import PhonePreview from "./images/iphone_preview.png";
import Card from "./Components/Website/Card.js";
import HeaderImage from "./images/header.png";
import Pencil from "./images/pencil.png";
import LargeHeader from "./Components/Website/LargeHeader";
export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      information: [
        {
          heading: "Notes",
          text:
            "Not only can you create rich notes, you can also set tasks and events ready for your busy week ahead. It's quick and simple to add a note or task and just as satisfying to mark as complete!"
        },
        {
          heading: "Tasks",
          text:
            "Not only can you create rich notes, you can also set tasks and events ready for your busy week ahead. It's quick and simple to add a note or task and just as satisfying to mark as complete!"
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
      four: [
        {
          title: "Track your tasks.",
          main: "See your tasks within the menu or dashboard"
        },
        {
          title: "Type Anywhere.",
          main: "We're mobile, literally. Find us on any platform."
        },
        {
          title: "Easier workflow.",
          main:
            "Simple and clear interface to make your workflow even smoother."
        },
        {
          title: "Support.",
          main: "Have a problem? Contact us via the contact page."
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
              stress.
            </h2>
          </div>
          <LargeHeader
            color="blue"
            title={this.state.information[0].heading}
            paragraph={this.state.information[0].text}
          />
          <LargeHeader
            color="#F1B505"
            title={this.state.information[1].heading}
            paragraph={this.state.information[1].text}
            reverse={true}
          />
          <div className="small_heading">
            {this.state.four.map((item, index) => {
              return <SmallHeading title={item.title} main={item.main} />;
            })}
          </div>
          <div className="app_photo"></div>
          <LargeHeader
            color="blue"
            title={"Dark Mode"}
            paragraph={
              "Even google hasn't got dark mode, We're always one step adhead. To enable dark mode, visit the settings menu."
            }
          />
          <div className="phone_app_image">
            <img alt="noteful on iphone" src={PhonePreview}></img>
          </div>
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
