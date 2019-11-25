import React, { Component, StrictMode } from 'react'
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
      <StrictMode>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>
              Welcome to <a href="?">React</a> at {process.env.PUBLIC_URL}<br />
              <small>{process.env.NODE_ENV}</small>
            </h2>
            {
              // eslint-disable-next-line no-restricted-globals
              location.href
            }<br />
            <a
              className="App-link"
              href="https://reactjs.org"
              rel="noopener noreferrer"
            >
              Learn React
            </a><br />
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React (target="_blank")
            </a>
            {this.state.data ? `fetched ${this.state.data.length} items from data.json` : 'no data.json'}
          </div>
        </div>
      </StrictMode>
    )
  }
}

export default App
