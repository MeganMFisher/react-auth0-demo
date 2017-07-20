import React, { Component } from 'react';
import { getOptions } from '../services/user';

export default class Options extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [],
        }
    }

    componentDidMount() {
    getOptions().then(options => {
      this.setState({
        options: options
      })
      console.log(this.state.options)
    })
}

    render() {

        const options = this.state.options.map((option, i) => (
            <ul key={i}>
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