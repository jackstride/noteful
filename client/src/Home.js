import React, { Component } from 'react'

import Welcome from './Components/Welcome'

export default class Home extends Component {
    render() {
        return (
            <div className="container">
            <div className="welcome_half">
                <Welcome />
            </div>
            <div className="event_half">

            </div>
            </div>
        )
    }
}
