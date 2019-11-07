import React, { Component } from 'react'

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      test: [],
      loading: true
    }
  }

  async componentDidMount() {
    const response = await fetch('/test')
    const data = await response.json()
    this.setState({test: data});
    let result = await data;
    if(result) {
      this.setState({loading: false})
    }
  }


  render() {
    return (
      <div>
        {this.state.loading ? <h1> Hello</h1> : <h1>{this.state.test[0].id}</h1>}
      </div>
    )
  }
}
