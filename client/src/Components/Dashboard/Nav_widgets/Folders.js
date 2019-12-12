import React, { Component } from "react";

export default class Folders extends Component {
  render() {
    return (
      <div className="folder_widget">
        <div className="folder_header">
          <h3> Folders</h3>
          <div className="plus"></div>
        </div>
        <div className="folder_content">
          <ul>
            <li>
              <a href="#"> University </a>
            </li>
            <li>
              <a href="#"> Work </a>
            </li>
            <li>
              <a href="#"> Thesis Introuduction </a>
            </li>
            <li>
              <a href="#"> Events </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
