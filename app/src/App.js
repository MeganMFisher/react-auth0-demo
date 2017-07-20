import React, { Component } from 'react';
import { getUser } from './services/user';
import Option from './components/options';
import './App.css';

class App extends Component {
      constructor() {
        super()

        this.state = {
            user: []
        }
    }

    componentWillMount() {
    getUser().then(user => {
      this.setState({
        user: user
      })
    })
    console.log(this.state.user)
    }

  render() {
    return (
      <div>
        <button className="loginButton">
            <a href="http://localhost:4005/auth">Login with Auth0</a>
        </button>

        <h2>Welcome</h2>

        <div>
          <Option />
        </div>
      </div>
    );
  }
}

export default App;
