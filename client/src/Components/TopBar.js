import React, { Component } from 'react'

import Search from '../Components/Search'

export default class TopBar extends Component {
    render() {
        return (
            <div className="topBar">
            <Search />
            </div>
        )
    }
}
