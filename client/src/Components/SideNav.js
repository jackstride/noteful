import React, { Component } from "react";
import { Link } from 'react-router-dom'

import Logo from "../images/noteful_bw.svg";
import HamNav from "./Dashboard/Navigation/hamNav";
import Folders from './Dashboard/Nav_widgets/Folders'
import ToDo from './Dashboard/Nav_widgets/ToDo'

export default class SideBar extends Component {
  navItems = [
    {
      iconsrc: "home",
      link: "/dashboard",
      name: "Home"
    },
    {
      iconsrc: "clock",
      link: "/recent",
      name: "Recent"
    },
    {
      iconsrc: "tasks",
      link: "/todo",
      name: "To Do"
    },
    {
      iconsrc: "sticky-note",
      link: "/AddNote",
      name: "Notes"
    },
    {
      iconsrc: "calendar-week",
      link: "/",
      name: "Events"
    }
  ];

  render() {
    return (
      <div className="dashboard_sidebar">
        <div className="nav-header">
          <div className="branding">
            <Link to="/">
            <img src={Logo} alt="NoteFul App"></img>
            </Link>
          </div>
          <HamNav />
        </div>
        <div className="nav_container">
            <Folders />
            <ToDo />
        </div>
      </div>
    );
  }
}
