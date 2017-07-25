import React, { Component } from 'react';
import { getOptions } from '../services/user';

export default class Options extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [],
            fav: ''
        }

        this.handleClick = this.handleClick.bind(this)
    }

componentDidMount() {
    getOptions().then(options => {
      this.setState({
        options: options
      })
      console.log(this.state.options)
    })
}

handleClick(event) {
    this.setState({
        fav: event.option
    })
    console.log(this.state.fav)
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