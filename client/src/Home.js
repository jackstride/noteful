import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

import Navigation from './Components/Website/Navigation'

import Pablo from './images/pablo-downloading.png'

export default class home extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.history.push('/register')
    }
    render() {
        return (
            <div className="home_app_container">
                <Navigation />
                <div className="welcome_page">
                    <h1> Get <span>Organised</span><br></br> with NoteFul...</h1>
                    <h2>Sign up today. Free of charge.</h2>
                    <input type="button" onClick={this.handleSubmit} value="Register"></input>                    
                    <img src={Pablo}></img>

                </div>
                
            </div>
        )
    }
}
