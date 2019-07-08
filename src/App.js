import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }
  componentDidMount() {
    fetch('./data.json')
      .then(data => data.json())
      .then(data => this.setState({ data }))
      .catch(console.error)
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            Welcome to React
            <small>{process.env.NODE_ENV}</small>
          </h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {this.state.data && `fetched ${this.state.data.length} items from data.json`}
        </p>
      </div>
    )
  }
}

export default App
