import React, { Component } from 'react'

export default class Weather extends Component {
    constructor(props){
        super(props);
        this.state = {
            temp: '',
            location: '',
            icon: '',
            day: true,
        }
    }
     key = 'd80a613a9f16a6dc29408868fb2a856a';
    url = `https://api.openweathermap.org/data/2.5/weather?q=Northampton,gb&units=Imperial&appid=${this.key}`

    changeBackground = (icon) => {
        if(icon == 'n') {
            this.setState({day: false})
        }
    }


async componentDidMount() {
    const response = await fetch (this.url);
    const json = await response.json(); 
    this.setState({temp: (json.main.temp -32) * 5%9, location: json.name})
    const icons = `http://openweathermap.org/img/wn/${json.weather[0].icon}.png`
    this.setState({icon: icons})
    this.changeBackground(this.state.icon);
}
    render() { 
        return (
            <div className={this.state.day ? 'weather_widget day' : 'weather_widget night'}>
                <div className={this.state.day ? 'clouds' : 'null'}>
                <h4>{this.state.location}</h4>
                <h4>{Math.round(this.state.temp)}&#x2103;</h4>  
                <img src={this.state.icon}></img>
                </div>
            </div>
        )
    }
}
