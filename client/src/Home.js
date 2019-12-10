import React, { Component } from 'react'

import Welcome from './Components/home/Welcome'
import EventNotification from './Components/home/e_notification'
import Weather from './Components/home/Weather'
import Time from './Components/home/time'

import {connect} from 'react-redux'


class Home extends Component {
    render() {
        return (
            <div className="container">
            <div className="welcome_half">
                <Welcome />
                <Weather />
                <Time />
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


  const mapStateToProps = state => {{
      return {auth: state.auth}
  }}
  
  
  
  export default connect(mapStateToProps) (Home);


  
