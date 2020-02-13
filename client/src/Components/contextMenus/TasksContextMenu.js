import React, { Component } from 'react'
import {connect} from 'react-redux'

import {toggleOpenTask,removeTask, toggleTask} from '../../actions/taskActions'
import {hideMenu} from '../../actions/contextMenuActions'

class TasksContextMenu extends Component {



    handleRename = () => {

    }

    handleDelete = (e,id) => {
        e.preventDefault();
        console.log('hello')
        this.props.removeTask(id);
    }

    handleMarkTask = (e,id) => {
        e.preventDefault();
        this.props.toggleTask(id);
    }

    render() {
        return (
            <ul>
                <li onClick={this.props.toggleOpenTask}> Add Tasks</li>
                <li>Rename Task</li>
                <li onClick={(e) => this.handleDelete(e,this.props.id)}> Delete Task</li>
                <li onClick={(e) => this.handleMarkTask(e,this.props.id)}>Mark Task</li>
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
    hideMenu: () => dispatch(hideMenu()),
    removeTask: id => dispatch(removeTask(id)),
    toggleTask: id => dispatch(toggleTask(id))
  });



export default connect (mapStateToProps,mapDispatchToProps)(TasksContextMenu)
