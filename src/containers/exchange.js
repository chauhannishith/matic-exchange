import React, { Component } from 'react'
import Exchange from '../components/exchange'

export default class ExchangeContainer extends Component {
    constructor (props) {
        super (props)

        this.state = {
            selectedtab: 'buy'
        }
    }

    onChange = e => {
        console.log(e)
    }

    onSubmit = e => {

    }

    onTabSelect = selectedtab => {
        this.setState({ selectedtab })
    }

    render () {
        const { tabComponent } = this.state
        return (
            <>
                <Exchange 
                    { ...this.state }
                    onTabSelect={ this.onTabSelect }
                    tabComponent={ tabComponent }
                    onChange={ this.onchange }
                    onSubmit={ this.onSubmit }
                />
            </>
        )
    }
}
