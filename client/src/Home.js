import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import PhonePreview from "./images/iphone_preview.png";
import HeaderImage from "./images/header.jpg";
import LargeHeader from "./Components/Website/LargeHeader";
import DashboardOne from "./images/dashboard_nav.jpg";
import HomeIntersect from "./Components/Intersects/HomeIntersect";

const Home = ({ history }) => {
  const [information, setInformation] = useState([
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
      heading: "Secure",
      text:
        "Noteful will only use https. We also encrypt your personal data when logging in. When you sign out, that data is no longer available."
    }
  ]);
  const [heading, setHeadings] = useState([
    {
      header: "Organising things in one place helps eliminate stress",
      main: ""
    },
    {
      header: "Dark Mode.",
      main:
        "Surprisingly 99% of people type in the dark. As a result we created dark mode.. Okay, that's false but we thought it looked nice."
    }
  ]);
  const [four, setFour] = useState([
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
      main: "Simple and clear interface to make your workflow even smoother."
    },
    {
      title: "Support.",
      main: "Have a problem? Contact us via the contact page."
    }
  ]);

  let [one, two, three] = HomeIntersect();

  let handleSubmit = e => {
    e.preventDefault();
    history.push("/register");
  };

  return (
    <div className="home">
      <div className="inner_container">
        <header>
          <div className="header_text">
            <div className="header_small animated fadeIn">
              <h4>We think it's time.</h4>
              <hr></hr>
            </div>
            <div className="header_main">
              <h1 className="animated fadeInUp">
                Goodbye paper..<br></br>
                Hello noteful!
              </h1>
              <h6 className="animated fadeInUp">
                Switch away from paper and begin typing with Noteful.
                <br></br>
                Sign up today. Free of charge!
              </h6>
              <Link className="animated fadeInUp" to="/register">
                <input type="button" value="Register"></input>
              </Link>
            </div>
          </div>
          <div className="header_image animated fadeIn">
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
      </div>
      <div className="bg_gradient">
        <div className="inner_container">
          <div className="row heading">
            <h2
              ref={one}
              style={{ textAlign: "center", paddingTop: "50px", opacity: "0" }}
            >
              Organising things in one <br></br> place helps to eleminate
              stress.
            </h2>
          </div>
          <LargeHeader
            color="blue"
            title={information[0].heading}
            paragraph={information[0].text}
          />
          <div className="view_more">
            <Link to="/features">
              <h4>Learn more about notes</h4>
              <hr></hr>
            </Link>
          </div>
          <LargeHeader
            color="#F1B505"
            title={information[1].heading}
            paragraph={information[1].text}
            reverse={true}
          />
          <div style={{ float: "right" }} className="view_more">
            <Link style={{ flexDirection: "row-reverse" }} to="/features">
              <h4>Learn more about tasks</h4>
              <hr style={{ marginLeft: "0px", marginRight: "10px" }}></hr>
            </Link>
          </div>
        </div>
      </div>
      <div className="inner_container">
        <div className="row heading">
          <h2
            ref={two}
            style={{ textAlign: "center", paddingTop: "50px", opacity: "0" }}
          >
            Taking notes can help you focus <br></br>and better understand
            concepts
          </h2>
        </div>
        <div className="app_photo">
          <img src={DashboardOne} alt="Dashboard"></img>
        </div>
        <div ref={three} style={{ opacity: "0" }} className="small_heading">
          {four.map((item, index) => {
            return (
              <SmallHeading key={index} title={item.title} main={item.main} />
            );
          })}
        </div>
      </div>
      <div className="bg_gradient">
        <div className="inner_container">
          <LargeHeader
            color="blue"
            title={"Dark Mode"}
            paragraph={
              "Even google hasn't got dark mode, We're always one step ahead. To enable dark mode, visit the settings menu."
            }
          />
          <div className="phone_app_image">
            <img alt="noteful on iphone" src={PhonePreview}></img>
          </div>
          <LargeHeader
            color="#F1B505"
            title={information[2].heading}
            paragraph={information[2].text}
            reverse={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
let SmallHeading = ({ title, main }) => {
  return (
    <div className="content">
      <h4> {title}</h4>
      <p>{main}</p>
    </div>
  );
};
