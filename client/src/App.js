import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { loadUser } from "./actions/authActions";
import store from "./store";
import Home from "./home";
import Dashboard from "./Components/Dashboard/Home";
import LogIn from "./Components/Website/LogIn/logIn.js";
import Register from "./Components/Website/Register/Register";
import AuthRoute from "./privateRoute";
import Navigation from "./Components/Website/Navigation";
import Footer from './Components/Website/Footer';
import LogOut from './Components/Website/logout.js';

import ContextMenu from './Components/contextMenu';


class App extends Component {
  constructor(props) {
    super(props);
    
    this.state={
      "menu":[
          {"label": "Item 1", "callback": this.itemCallback},
          {"label": "Menu item 2", "callback": this.item2Callback},
          {"label": "Apple", "callback": this.appleCallback},
          {"label": "This is orange", "callback": this.orangeCallback},
          {"label": "Conetxt menu is fun", },
          {"label": "Cool", "callback": this.coolCallback}
        ]
    }
  }
 
 itemCallback() {
        alert("clicked on Item 1")
    }
    
  item2Callback() {
        alert("clicked on Item 2")
    }
    
    appleCallback() {
        alert("clicked on Apple")
    }
    orangeCallback() {
        alert("clicked on Orange")
    }
    coolCallback(){
      alert("clicked on Cool")
    }

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    store.dispatch(loadUser());
  }


  HomeContainer = () => {
    return (
      <div>
      <Navigation />
      <Route exact path="/" component={Home} />
      <Route path="/login" render={props => <LogIn {...props} />} />
      <Route path ="/register" component={Register} />
      <Route path ="/logout" component={LogOut} />
      <Footer />
      </div>
      ) 
  };

  DefaultContainer = () => {
    return (
      <div className="app_container">
        <ContextMenu items={this.state.menu} />
        <Route path="/dashboard" component={Dashboard} />
      </div>
    );
  };
//Route path "/" last as switch mates the first instance
  render() {
    return (
      <div>        
        <BrowserRouter>
          <Switch>
            <AuthRoute path="/dashboard" authed={this.props.auth} component={this.DefaultContainer} />
            <Route path ="/" component={this.HomeContainer} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(App);