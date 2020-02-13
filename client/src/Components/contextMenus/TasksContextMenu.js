import React, { Component } from 'react'
import {connect} from 'react-redux'

import {} from '../../actions/taskActions'
import {} from '../../actions/contextMenuActions'

class TasksContextMenu extends Component {


    render() {
        return (
            <ul>
                <li> Add Tasks</li>
                <li> Rename Task</li>
                <li>Delete Task</li>
                <li>Mark Task</li>
            </ul>            
        )
    }
}


const mapStateToProps = state => {
    return {
        id: this.state.contextMenuArgs.id,
    }
}



export default connect ()(TasksContextMenu)
