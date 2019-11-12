import React, { Component } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
        editorState: EditorState.createEmpty()
    };
    
    this.updateEditorState = (editorState) => {
        this.setState({editorState});
      };
    
  }
  render() {
    return (
        <div className="container">
      <Editor        
        editorState={this.state.editorState}
        onChange={this.updateEditorState}
      />
      </div>
    );
  }
}