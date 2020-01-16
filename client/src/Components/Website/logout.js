import React, { Component } from 'react'
import {connect} from 'react-redux'
import {logout} from '../../actions/authActions';


 class Logout extends Component {

    render() {
        return (
            <div>
                <h2 onClick={this.props.logout}> Hello </h2>
            </div>
        )
    }
}

const mapStateToProps = state => {  
    return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
    }
  }
  
  
  
  
  export default connect(mapStateToProps,{logout})(Logout)
  
