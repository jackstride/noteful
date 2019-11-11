import React, { Component } from 'react'

export default class Search extends Component {
    render() {
        return (
            <div className="search_bar">
                <input type ="text" name="query" placeholder="search by #"></input>                
            </div>
        )
    }
}
