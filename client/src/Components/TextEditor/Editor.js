import React, { Component, Fragment } from "react";
const Quill = require('quill')

export default class Editor extends Component {
  componentDidMount() {
    var editor = new Quill('#editor', {
        modules: { toolbar: '#toolbar' },
        theme: 'snow'
      });
  }
  render() {
    return (
      <div className="editor_container">
        <div id="toolbar">
          <button class="ql-bold">Bold</button>
          <button class="ql-italic">Italic</button>
        </div>
        <div id="editor">
          <p>Hello World!</p>
        </div>
      </div>
    );
  }
}
