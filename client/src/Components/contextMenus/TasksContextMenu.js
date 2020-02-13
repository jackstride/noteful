import React, { Component } from 'react'
import {connect} from 'react-redux'

import {toggleOpenTask} from '../../actions/taskActions'
import {} from '../../actions/contextMenuActions'

class TasksContextMenu extends Component {





    render() {
        return (
            <ul>
                <li onClick={this.props.toggleOpenTask}> Add Tasks</li>
                <li> Rename Task</li>
                <li>Delete Task</li>
                <li>Mark Task</li>
            </ul>            
        )
    }
}


const mapStateToProps = state => {
    return {
        id: state.contextMenu.menuArgs.id,
    }
}


const mapDispatchToProps = dispatch => ({
    toggleOpenTask: () => dispatch(toggleOpenTask()),
  });



export default connect (mapStateToProps,mapDispatchToProps)(TasksContextMenu)
