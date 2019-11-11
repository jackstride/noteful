import React, { Component } from 'react'
import {BrowserRouter, Route } from 'react-router-dom';

import Home from './Home';
import SideNav from './Components/SideNav';
import Recent from './Components/Recent';
import TopBar from './Components/TopBar'

export default class App extends Component {

  render() {
    return (      
      <BrowserRouter>
      <div className="app_container">
        <SideNav />
        <TopBar />
        <Route exact path='/' component={Home} />
         <Route path='/recent' component={Recent} />
         </div>
      </BrowserRouter>      
    )
  }
}
