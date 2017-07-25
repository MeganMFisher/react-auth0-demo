import React, { Component } from 'react';
import { getOptions, postFavs } from '../services/user';

export default class Options extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [],
            authid: 'google-oauth2|112174683459396059604'
        }

        // console.log(this.props.authid)
    

        this.handleClick = this.handleClick.bind(this)
    }

componentDidMount() {
    getOptions().then(options => {
      this.setState({
        options: options
      })
    })
}

handleClick(fav) {
    const favs = { 
        favorite: fav.option,
        authid: this.state.authid
    }
    postFavs(favs)
    .then((res) => {
      console.log('Yummio Hummio')
    //   getUser()
    })
}

    render() {

        const options = this.state.options.map((option, i) => (
            <ul key={i} onClick={() => this.handleClick(option)}>
                <h3>{ option.option }</h3>
            </ul>
        ))

        return(
            <div>
            <div>
                { options }
             </div>
             </div>
         )
     }
}