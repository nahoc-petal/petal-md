import React, { Component } from 'react'
import RandomDiscGenerator from './../RandomDiscGenerator/RandomDiscGenerator'

class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <RandomDiscGenerator />
        </div>
        <footer className="footer" style={{backgroundColor: 'white'}}>
          <div className="content has-text-centered">
            <p>
              Made by <a href="https://github.com/nahoc10/">Cohan Carpentier</a>. The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
            </p>
            <p>
              Made with React, Bulma and Axios.
            </p>
          </div>
        </footer>
      </div>
    )
  }
}

export default App
