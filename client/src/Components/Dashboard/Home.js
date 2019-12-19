import React, { Component } from 'react'
import SideNav from '../SideNav';
import {connect} from 'react-redux'


class Home extends Component {
    render() {
        return (
            <div className="container">
            <div className="welcome_half">
                
                
                
            </div>
            <div className="event_half">
                <div className="home_event_container"> 
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


  
