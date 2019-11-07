import React, { Component } from 'react'

import {Link} from 'react-router-dom'

export default class SideBar extends Component {
    render() {
        return (
            <div className="sidebar">
                <div className="branding">
                    
                </div>
                <div className="s_container">
                    <nav>
                        <ul>
                            <li> <Link to="/">Home</Link></li>
                            <li><Link to="/recent">Home</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}
