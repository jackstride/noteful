import React, { Component } from "react";
import {Link} from 'react-router-dom'

import Logo from '../../images/noteful_bw.svg';

export default class footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
        nav: [
            {
                title: "Features",
                link: "/about"
            },
            {
                title: "About",
                link: "/about"
            },
            {
                title: "Support",
                link: "/about"
            },
            {
                title: "Twitter",
                link: "/about"
            },
            {
                title: "Instagram",
                link: "/about"
            },
            {
                title: "Email Us",
                link: "/about"
            },
            {
                title: "Privacy",
                link: "/about"
            },
            {
                title: "Terms & Conditions",
                link: "/about"
            },
            {
                title: "Cookies",
                link: "/about"
            },
        ],
        }
    };
  render() {
      return(
    <footer>     
           <div className="inner_container">
           <hr className="footer_hr"></hr>
               <div className="footer_nav">
               <div className="footer_logo">
                   <img src={Logo}></img>
                   <p style={{fontSize: '14px', width: '60%'}}>Work smart with your notes,tasks and events.</p>
               </div>
               <ul>
                   {this.state.nav.slice(0,3).map((test) => (
                       <li><Link to={test.link}>{test.title}</Link></li>
                   ))}
                   </ul>
                   <ul>
                   {this.state.nav.slice(3,6).map((test) => (
                       <li><Link to={test.link}>{test.title}</Link></li>
                   ))}
                   </ul>
                   <ul>
                   {this.state.nav.slice(6,9).map((test) => (
                       <li><Link to={test.link}>{test.title}</Link></li>
                   ))}
                   </ul>
               </div>
           </div>
    </footer>
      )
  }
}
