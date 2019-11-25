import React, { Component } from 'react'

export default class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }
    render() {
        return ( 
            <form>
                <div>
                    <label> Username</label>
                    <input type="text" name="email"></input>
                    <label> Password</label>
                    <input type="password" name="password"></input>
                    <input type="submit" name="submit"></input>
                </div>
            </form>
        )
    }
}
