import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'

export default class home extends Component {
    render() {
        return (
            <div>
                <h1> This is going to be the main home</h1>
                <li><Link to="/dashboard">Home</Link></li>
            </div>
        )
    }
}
