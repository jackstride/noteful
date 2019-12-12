import React, { Component } from "react";

import Ind from './ind';

export default class ToDo extends Component {


  render() {
    return (
      <div className="folder_widget">
        <div className="folder_header">
          <h3> To Do's</h3>
          <div className="plus" onClick={this.test}></div>
        </div>
        <div className="folder_content" style={{ overflowY: "scroll" }}>
          <div className="input_todo">









              
          </div>
        </div>
      </div>
    );
  }
}
