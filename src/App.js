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
            Welcome to React<br />
            <small>{process.env.NODE_ENV}</small>
          </h2>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {this.state.data ? `fetched ${this.state.data.length} items from data.json` : 'no data.json'}
        </div>
      </div>
    )
  }
}

export default App
