import React, { Component } from "react";

export default class Todo extends Component {
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
      <ul>
        {this.props.data.map((key, index) => 
          <li>{key.task_name}</li>
        )}
      </ul>
    );
  };

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
