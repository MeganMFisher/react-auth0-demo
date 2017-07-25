import React, { Component } from 'react';
import { getUser } from './services/user';
import Options from './components/options';
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
      const favs = res ? res.favorites : []
      console.log(res)
      this.setState({
        user: res,
        favorites: favs
      })
      console.log(this.state.favorites)
    })
  }

  render() {
 
    const favorites = this.state.favorites.map((e, i) => (
                <h3 key={i}>{ e.favorite }</h3>
    ))
    return (
      <div>
        <div className='navBar'>
         <h2>Welcome { this.state.user ? this.state.user.username + '!': '' }</h2> 

          { this.state.user ? null : <a href='http://localhost:4005/auth'><button className='loginButton'>LOGIN</button></a> }
        { this.state.user ? <a href='http://localhost:4005/auth/logout'><button className='loginButton'>LOGOUT</button></a> : null }

         </div>

      <div className='optionsAndFavsBox'>
        <div className='optionsBox'>
          <h3>Options:</h3>
          <Options />
        </div>

         <div className='favoritesBox'>
          <h3>Favorites:</h3>
          { favorites }
        </div> 
        </div>
      </div>
    );
  }
}

export default App;
