import React, { Component } from 'react'
import {connect} from 'react-redux'

import SideNav from '../SideNav';
import { loadUser } from "../../actions/authActions";



class Home extends Component {


    render() {
        return (
            <SideNav />
        )
    }
}

const mapDispatchToProps = dispatch => ({
    loadUser: () => dispatch(loadUser()),
  });
  
  
  
  export default  connect(null,mapDispatchToProps)(Home);


  
