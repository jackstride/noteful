import React, { Component } from 'react'
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faClock, faTasks, faStickyNote,faCalendarWeek } from '@fortawesome/free-solid-svg-icons'


import Home from './Home';
import SideNav from './Components/SideNav';
import Recent from './Components/Recent';
import TopBar from './Components/TopBar'
import AddNote from './AddNote'
import LogIn from './Components/LogIn/LogIn.js'
import Register from './Components/Register/Register';

library.add(faHome,faClock,faTasks,faStickyNote,faCalendarWeek)

export default class App extends Component {

   LogInContainer = () => {
    return(
      <Route path='/login' component={LogIn} />
      )
  }

  RegisterContainer = () => {
    return (
      <Route path='/register' component={Register} />    
    )
  }
  
  
   DefaultContainer = () => {
     return (
      <div className="app_container">
    <SideNav />
    <TopBar />
    <Route exact path='/' component={Home} />
     <Route path='/recent' component={Recent} />
     <Route path='/AddNote' component={AddNote} />
     </div>
     )
  }

  

  render() {
    return (      
      <BrowserRouter>
      <Switch>
      <Route exact path="/login" component={this.LogInContainer} />
      <Route exact path="/register" component={this.RegisterContainer} />
      <Route component={this.DefaultContainer} /> 
         </Switch>
      </BrowserRouter>      
    )
  }
}



