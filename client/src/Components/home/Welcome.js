import React, { Component } from 'react'

import Illustration from '../../images/illustration.svg'

export default class Welcome extends Component {
    tips = [
        'Did you know you can quickly add a note or task by clicking + in the bottomer right corner?',
        'This is going to be the second tip',
        'This is going to be the third tip',
    ];

    generateTip = () => {
        let number = Math.floor(Math.random() * this.tips.length)
        return number;
        
    }
    render() {
        return (
            <div className="welcome_module">
                <div className="welcome_container">
                    <div className="welcome_text">
                        <div className="text_container">
                        <h2> Welcome Jack,</h2>
                        <h3>{this.tips[this.generateTip()]}</h3>
                        </div>
                    </div>
                    <div className="welcome_image">
                        <img src={Illustration} alt="Welcome Image"></img>
                    </div>
                </div>
            </div>
        )
    }
}
