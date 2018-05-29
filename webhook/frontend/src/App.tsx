import * as React from 'react'
import './App.css'

const logo = require('./logo.svg')

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">NBOT</h1>
        </header>
        <p className="App-intro">
        Hi! I'm a chatbot as id nbot97 created by NC robot. Hope you have a nice day.
        </p>
        <a href="https://join.skype.com/bot/9eabe250-526d-4939-8dbc-6b215fa60f20">Get me!!!</a>
      </div>
    )
  }
}
