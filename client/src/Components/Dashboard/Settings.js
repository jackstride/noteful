import React, { Component } from "react";

export default class Settings extends Component {
    constructor(props) {
        super(props)

        this.state = {
            accountShow: true,
            deleteShow: false,
            contactShow: false,
        }
    }


    handleToggle = (edit,request,contact) => {
        this.setState({accountShow: edit,deleteShow:request,contactShow:contact})
    }


  render() {
      const {accountShow,deleteShow,contactShow} = this.state;
    return (
      <div className="settings_container">
        <div className="settings_left">
          <div className="settings_header">
            <h1> Settings </h1>
          </div>
          <div className="settings_nav_list">
            <ul>
              <li onClick={(e) => this.handleToggle(true,false,false)}>Accounts Settings</li>
              <li onClick={(e) => this.handleToggle(false,true,false)}>Request to delete account</li>
              <li onClick={(e) => this.handleToggle(false,false,true)}>Contact</li>
            </ul>
          </div>
        </div>
        <div className="settings_right">
        {accountShow ? <AccountSettings /> : deleteShow ? <DeleteRequest /> : contactShow ? <Contact /> : <AccountSettings />}
        </div>
      </div>
    );
  }
}

let AccountSettings = () => {
    return (
        <div className="settings_form">
            <form>
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
                <input type="text" placeholder="Email Address" />
                <input type="submit" value="Update" />
            </form>
        </div>
    )
}



let DeleteRequest = () => {
    return(
        <div className="delete_account">
            <div className="settings_form">
                <form>
                    <input type="text" placeholder="Enter your first Name"></input>
                    <input type="text" placeholder="Confirm your email address"></input>
                    <input type="submit" value="Update" />
                </form>
            </div>
            
        </div>
    )
}

let Contact = () => {
    return(
    <div className="setting_conta">
        <div className="settings_form">
                <form>
                    <input type="text" placeholder="Enter your first Name"></input>
                    <input type="text" placeholder="Enter your email address"></input>
                    <input type="submit" value="Send" />
                </form>
            </div>
    </div>
    )
}