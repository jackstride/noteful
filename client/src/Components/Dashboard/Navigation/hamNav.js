import React, { Component } from "react";

import OpenNav from './openNav'

export default class hamNav extends Component {
    constructor(props) {
        super(props);
        this.state = {isToggled: false};
      }
    
      
    
      toggleHam = () => {
        this.setState(state => ({
          isToggled: !state.isToggled
        }));
        
      }

    
  render() {
    return (
      <div className="ham_nav" >
        <div id="nav-icon3" className={this.state.isToggled ? 'open' : null} onClick={this.toggleHam} >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {this.state.isToggled && <OpenNav />}
        </div>
    );
  }
}
