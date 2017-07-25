import React, { Component } from 'react';
import { getUser, deleteFav,  postFavs } from './services/user';
import Options from './components/options';
import './App.css';

class App extends Component {
      constructor() {
        super()

        this.state = {
            user: [],
            authid: '',
            favorites: [],
            notFav: ''
        }

        this.handleClick = this.handleClick.bind(this)
    }

  componentDidMount() {
    getUser().then(res => {
      const favs = res ? res.favorites : []
      const id = res ? res.authid : ''
      this.setState({
        user: res,
        authid: id,
        favorites: favs
      })
    console.log(this.state.authid)
    })
  }

  handleClick(notFav) {
    deleteFav(notFav.favorite)
    .then((res) => {
      // getUser()
    })
  }

  addFav(fav) {
    // const authId = this.state.authid ? this.state.authid : 'stupidFace'
    // console.log(authId)
      const favs = { 
        favorite: fav.option,
        authid: 'google-oauth2|112174683459396059604'
    }
    console.log(favs)
    postFavs(favs)
    .then((res) => {
      // getUser()
    })
  }

  render() {

 
    const favorites = this.state.favorites.map((e, i) => (
                <h3 key={i} onClick={() => this.handleClick(e)}  
>{ e.favorite } </h3>
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
          <Options action={this.addFav} />
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
