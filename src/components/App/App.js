import React, { Component } from 'react'
import RandomDiscGenerator from './../../containers/RandomDiscGenerator/RandomDiscGenerator'
import Footer from './../Footer/Footer'

class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <RandomDiscGenerator />
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
