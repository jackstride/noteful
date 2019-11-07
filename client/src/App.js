import React, { Component } from 'react'
import {BrowserRouter, Route } from 'react-router-dom';

import Home from './Components/Home';
import SideBar from './Components/SideBar';
import Recent from './Components/Recent';

export default class App extends Component {

  render() {
    return (      
      <BrowserRouter>
      <div className="app_container">
        <SideBar />
          <Route exact path='/' component={Home} />
         <Route path='/recent' component={Recent} />
         </div>
      </BrowserRouter>      
    )
  }
}
