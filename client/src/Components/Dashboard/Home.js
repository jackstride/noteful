import React, { Component } from 'react'

import Welcome from '../home/Welcome'
import EventNotification from '../home/e_notification'
import Weather from '../home/Weather'
import Time from '../home/time'

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


  
