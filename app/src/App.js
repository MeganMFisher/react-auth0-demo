import React, { Component } from 'react';
import { getUser } from './services/user';
import Options from './components/options';
import Favorites from './components/favorites';
import './App.css';

class App extends Component {
      constructor() {
        super()

        this.state = {
            user: []
        }
    }

    componentDidMount() {
    getUser().then(user => {
      this.setState({
        user: user
      })
    console.log(this.state.user)
    })
    }

  render() {
    return (
      <div>
        <button className="loginButton">
            <a href="http://localhost:4005/auth">Login with Auth0</a>
        </button>

        <h2>Welcome</h2>

        <div>
          <h3>Options</h3>
          <Options />
        </div>

         <div>
          <h3>Favorites</h3>
          <Favorites />
        </div> 
      </div>
    );
  }
}

export default App;
