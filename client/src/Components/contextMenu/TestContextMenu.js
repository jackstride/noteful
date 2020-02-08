import React, { Component } from 'react'

export default class TestContextMenu extends Component {
    render() {
        return (
            <ul>
                <li><a href="#">Add New Note</a></li>
                <li><a href="#">Delete Note</a></li>
                <li><a href="#">Rename Note</a></li>
            </ul>
        )
    }
}
