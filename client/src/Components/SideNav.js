import React, { Component } from 'react'

import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Logo from '../images/noteful_logo.svg';

export default class SideBar extends Component {
        navItems = [
            {
                iconsrc: 'home',
                link: '/',
                name: 'Home'
            },
            {
                iconsrc: "clock",
                link: '/recent',
                name: 'Recent'
            },
            {
                iconsrc: "tasks",
                link: '/todo',
                name: 'To Do'
            },
            {
                iconsrc: "sticky-note",
                link: '/AddNote',
                name: 'Notes'
            },
            {
                iconsrc: "calendar-week",
                link: '/',
                name: 'Events'
            },
        ]
    
    render() {
        console.log(this.navItems);
        return (
            <div className="nav_sidebar">
                <div className="branding">
                    <img src={Logo} alt="NoteFul App"></img>
                </div>
                <hr className="nav_sep"></hr>
                <div className="nav_container">
                    <nav>
                        <ul>
                            {this.navItems.map((item, index) => {
                                return(
                            <div className="nav_item">
                                <FontAwesomeIcon icon={item.iconsrc} style={{color: "ffffff", fontSize: "32px" }}/>
                                <li><Link to={item.link}>{item.name}</Link></li>
                            </div>
                            )
                            })}                        
                        </ul>
                    </nav>
                    
                </div>
                <hr className="nav_sep"></hr>
            </div>
        )
    }
}
