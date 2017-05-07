import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

test('expect', () => {
  expect(1).toEqual(1)
})
