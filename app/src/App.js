import React, { Component } from 'react';
import { getUser } from './services/user';
import Options from './components/options';
import Favorites from './components/favorites';
import './App.css';

class App extends Component {
      constructor() {
        super()

        this.state = {
            user: [],
            favorites: []
        }
    }

  componentDidMount() {
    getUser().then(res => {
      console.log(res)
      this.setState({
        user: res,
        favorites: res.favorites
      })
    // console.log(this.state.user.favorites)
    })
  }

  render() {
 


    return (
      <div>
        <button className="loginButton">
            <a href="http://localhost:4005/auth">Login with Auth0</a>
        </button>

        <h2>Welcome</h2>
      <div className='optionsAndFavsBox'>
        <div className='optionsBox'>
          <h3>Options</h3>
          <Options />
        </div>

         <div className='favoritesBox'>
          <h3>Favorites</h3>
          <Favorites />
        </div> 
        </div>
      </div>
    );
  }
}

export default App;
