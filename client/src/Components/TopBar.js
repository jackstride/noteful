import React, { Component } from 'react'

import Search from '../Components/Search'
import HamNav from '../Components/hamNav'

export default class TopBar extends Component {
    render() {
        return (
            <div className="topBar">
            <Search />
            <HamNav />
            </div>
        )
    }
}
