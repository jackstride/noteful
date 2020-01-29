import React from 'react';
 
 export default class contextmenu extends React.Component{
  constructor(props) {
    super(props);
    this.contextRef = React.createRef();
    this.returnMenu = this.returnMenu.bind(this);
    this.state={
      visible: false,
      x: 0,
      y: 0,
      menu:[
        {label: "Item 1", callback: this.itemCallback},
        {label: "Menu item 2", callback: this.item2Callback},
        {label: "Apple", callback: this.appleCallback},
        {label: "This is orange", callback: this.orangeCallback},
        {label: "Conetxt menu is fun", },
        {label: "Cool", callback: this.coolCallback}
      ]
    }; 
  }

  itemCallback = () => {

  }
  
item2Callback= () =>  {
      alert("clicked on Item 2")
  }
  
  appleCallback= () =>  {
      alert("clicked on Apple")
  }
  orangeCallback= () =>  {
      alert("clicked on Orange")
  }
  coolCallback= () => {
    alert("clicked on Cool")
  }
  
  componentDidMount(){
    //Self to use within the fucntion context
    var self = this;
    //Apply right click to the dashboard only
     let dashboard = document.querySelectorAll(".w_contents li");

     dashboard.forEach(item => {
      item.addEventListener('contextmenu', (event) => {
        event.preventDefault();
          const clickX = event.clientX;
          const clickY = event.clientY;
          self.setState({ visible: true, x: clickX, y: clickY });
      });

    })
    //When right click (Otherwise when the context menu is opened, prevent the default context menu) get the users mouse position. Set the state to visible.
    

let test = document.querySelectorAll('.custom-context-item')
console.log(test)
    //Click event listener    
    document.addEventListener('click', function(event){
      if(!self.contextRef.current) {
        return null;
      }
      else if(self.contextRef.current.id=='customcontext'){
      self.click(event.target.getAttribute('index'));
      }
      event.preventDefault();
      self.setState({ visible: false, x:0, y:0});
      
    });
}

  
   //function called click
   click = (index) => {
     if(this.state.menu[index].callback){
        this.state.menu[index].callback();
     }
    else{
      console.log("callback not registered for the menu item")
    }
    }
  
  returnMenu(){
    var myStyle = {
      'position': 'absolute',
      'top': `${this.state.y}px`,
      'left':`${this.state.x+5}px`,
      'cursor': 'pointer',
    }

    let {items} = this.state.menu;
  
  
    return <div className='custom-context' id='customcontext' style={myStyle} ref={this.contextRef}>
        {this.state.menu.map((item, index, arr) =>{
          if(arr.length-1==index){
            return <div key={index} className='custom-context-item-last' index={index}>{item.label}</div>
          }else{
            return <div key={index} className='custom-context-item' index={index}>{item.label}</div>
          }
        })}
        </div>;
  }
  
  render() {
    return  (<div id='cmenu'>
        {this.state.visible ? this.returnMenu(this.props.items): null}
    </div>
    )
  }
}