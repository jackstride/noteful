import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import PropTypes from 'prop-types';
import {
  faHome,
  faClock,
  faTasks,
  faStickyNote,
  faCalendarWeek
} from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import { loadUser } from "./actions/authActions";
import store from  './store'

import Home from "./Home";
import SideNav from "./Components/SideNav";
import Recent from "./Components/Recent";
import TopBar from "./Components/TopBar";
import AddNote from "./AddNote";
import LogIn from "./Components/LogIn/LogIn.js";
import Register from "./Components/Register/Register";
import ToDo from "./Components/ToDo/ToDo";

library.add(faHome, faClock, faTasks, faStickyNote, faCalendarWeek);

class App extends Component {  
  constructor(props) {
    super(props) 
    this.state = {
      isAuthenticated: false,
    }
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
  }

   componentDidMount() {
     console.log(this.props)
     store.dispatch(loadUser());
    //  this.props.isAuthenticated();
  }

  // static getDerivedStateFromProps(props, prevState) {    
  //   if(prevState.isAuthenticated != props.auth.isAuthenticated)
  //   {
  //    console.log("hello " + props.auth.isAuthenticated)
  //   return  {
  //     isAuthenticated: props.auth.isAuthenticated,
  //   } 
  // }
  // return null
  // }
  

  LogInContainer = () => {
    return <Route path="/login" component={LogIn} />;
  };

  RegisterContainer = () => {
    return <Route path="/register" component={Register} />;
  };

  DefaultContainer = () => {
    return (
      <div className="app_container">
        <SideNav />
        <TopBar />
        <Route exact path="/" component={Home} />
        <Route path="/recent" component={Recent} />
        <Route path="/AddNote" component={AddNote} />
        <Route path="/ToDo" component={ToDo} />
      </div>
    );
  };

  AuthRoute = ({ component: Component, ...rest }) => {
   let test = this.props.auth;
   console.log(test);
    return (
      <Route
        {...rest}
        render={(props) => {
          if (this.props.auth) {
            console.log("yes")
            return <Component {...props} />;
          } 
          else {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            );
          }
        }}
      />
    );
  };

  

  render() {
    return (
      <div>
      <h1> {(this.props.auth.toString())}</h1>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={this.LogInContainer} />
          <Route exact path="/register" component={this.RegisterContainer} />
          <this.AuthRoute component={this.DefaultContainer} />
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {auth: state.auth.isAuthenticated}
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     isAuthenticated: () => {
//       dispatch(loadUser());
//     }
//   };
// };


export default connect(mapStateToProps)(App);