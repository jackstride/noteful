import React from "react";

import { connect } from "react-redux";

import {
  addFolder,
  getFolder,
  removeFolder
} from "../actions/FolderActions";

class contextmenu extends React.Component {
  constructor(props) {
    super(props);
    this.contextRef = React.createRef();
    this.returnMenu = this.returnMenu.bind(this);
    this.state = {
      visible: false,
      x: 0,
      y: 0,
      menu: [
        { label: "Add", callback: this.remove },
        { label: "Menu item 2", callback: this.itemCallback },
        { label: "Apple", callback: this.itemCallback },
        { label: "This is orange", callback: this.itemCallback },
        { label: "Conetxt menu is fun", callback: this.itemCallback },
        { label: "Cool", callback: this.itemCallback }
      ]
    };
  }

  itemCallback = () => {
    
    
  };


  remove = (id) => {
    //console.log(id);
    this.props.removeFolder(id)
   
  }

  componentDidMount() {
  console.log(this.props)
    var self = this;
    let dashboard = document.querySelectorAll(".w_contents li");
    dashboard.forEach(item => {
      item.addEventListener("contextmenu", event => {
        event.preventDefault();
        const clickX = event.clientX;
        const clickY = event.clientY;
        self.setState({ visible: true,x: clickX, y: clickY });
      });
      
    });
    

    document.addEventListener("click", function(event) {
      if (!self.contextRef.current) return;
      if (self.contextRef.current.id == "customcontext") {
        self.click(event.target.getAttribute("index"))
      }
      if(self.props.third.current.id="test"){
       self.getValue(self.props.third.current.getAttribute("value"));
       console.log(self.props.third.curre.target.value);
      }
      event.preventDefault();
      self.setState({ visible: false, x: 0, y: 0 });
    });
  }

  click = index => {
    if (!index) return;
    else {
      this.state.menu[index].callback(this.state.current);
    }
  };


  getValue = value => {
    console.log(value);
  }

  returnMenu() {
    var myStyle = {
      position: "absolute",
      top: `${this.state.y}px`,
      left: `${this.state.x + 5}px`,
      cursor: "pointer"
    };

    return (
      <div
        className="custom-context"
        id="customcontext"
        style={myStyle}
        ref={this.contextRef}
      >
        {this.state.menu.map((item, index) => {
          return (
            <div key={index} className="custom-context-item" index={index}>
              {item.label}
            </div>
          );
        })}
      </div>
    );
  }

  render() {    
    return (
      <div id="cmenu">
        {this.state.visible ? this.returnMenu(this.props.items) : null}
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    userId: state.auth.user._id,
    folder: state.folder.data
  };
};

const mapDispatchToProps = dispatch => ({
  removeFolder: id => dispatch(removeFolder(id)),
  addFolder: id => dispatch(addFolder(id)),
  getFolder: id => dispatch(getFolder(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(contextmenu);