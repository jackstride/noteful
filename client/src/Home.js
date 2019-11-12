import React, { Component } from 'react'

import Welcome from './Components/home/Welcome'
import EventNotification from './Components/home/e_notification'


export default class Home extends Component {
    render() {
        return (
            <div className="container">
            <div className="welcome_half">
                <Welcome />
            </div>
            <div className="event_half">
                <div className="home_event_container">
                <EventNotification />                    
                </div>
            </div>
            </div>
        )
    }
}
