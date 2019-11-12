import React, { Component } from 'react'

import searchIcon from '../images/search-solid.svg';

export default class Search extends Component {
    render() {
        return (
            <div className="search_bar">
                <div className="search_icon"><img src={searchIcon} alt="search"></img></div>
                <input type ="text" name="query" placeholder="Quick Find #"></input>                
            </div>
        )
    }
}
