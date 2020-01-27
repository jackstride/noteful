import React, { Component } from "react";
import {connect} from 'react-redux'

import {toggleTask} from '../../../actions/taskActions';

 class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false
    };
  }

  toggleAddFolder = () => {
    this.setState({ isShown: !this.state.isShown });
  };


  showData = () => {
    return (
      <form className="task_form">
      {this.props.data.map((key, index) => 
        <div className="task_data" key={index}>
        <input type="checkbox" id={`check${index}`} onChange={() => this.handleToggle(key._id)}></input>
        <label for={`check${index}`}>{key.task_name}</label>
        </div>
      )}
      </form>
    );
  }

  handleToggle = (id) => {
    this.props.toggleTask(id);    
  }

  removeTask = () => {

  }

  render() {
    let { isShown } = this.state;
    return (
      <div className="widget">
        <div className="widget_header">
          <h3>Tasks</h3>
          <div className="plus" onClick={this.toggleAddFolder}></div>
        </div>
        <div className="widget_content">
          {isShown ? null : null}
          <div className="w_contents">{this.showData()}</div>
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    userId: state.auth.user._id,
  };
};

const mapDispatchToProps = dispatch => ({
  toggleTask: (id) => dispatch(toggleTask(id) ),
  
})



export default connect(mapStateToProps,mapDispatchToProps)(Todo)