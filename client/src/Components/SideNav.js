import React, { Component } from 'react'

import {Link} from 'react-router-dom'

import Logo from '../images/noteful_logo.svg';
import Home from '../images/home-solid.svg';
import Clock from '../images/clock-solid.svg';
import Task from '../images/task.svg';
import Note from '../images/sticky-note-solid.svg';
import Calendar from '../images/calendar.svg';

export default class SideBar extends Component {
        navItems = [
            {
                iconsrc: Home,
                link: '/',
                name: 'Home'
            },
            {
                iconsrc: Clock,
                link: '/recent',
                name: 'Recent'
            },
            {
                iconsrc: Task,
                link: '/',
                name: 'To Do'
            },
            {
                iconsrc: Note,
                link: '/',
                name: 'Notes'
            },
            {
                iconsrc: Calendar,
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
                                <img className = "icon" src={item.iconsrc} ></img>
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
