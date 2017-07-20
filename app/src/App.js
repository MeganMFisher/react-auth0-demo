import React, { Component } from 'react';
import { getUser } from './services/user';
import './App.css';

class App extends Component {
      constructor() {
        super()

        this.state = {
            user: []
        }
    }

  render() {
    return (
      <div>
        <button className="loginButton">
            <a href="http://localhost:4005/auth">Login with Auth0</a>
        </button>
      </div>
    );
  }
}

export default App;
