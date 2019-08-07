import React, { Component } from 'react'
import styled from 'styled-components'
import ExchangeContainer from '../containers/exchange'

export default class ETHDAIExchangePage extends Component {
    constructor (props) {
        super (props)
    }

    componentDidMount () {

    }

    render () {
        return (
            <main className='eth-dai-exchange-pagin'>
                <Wrapper>
                    <ExchangeContainer />
                    {/* <OrderBook />
                    <TradeHistory /> */}
                </Wrapper>
            </main>
        )
    }
}

 const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: calc(100% - 2rem);
    background: rgb(245, 246, 249);
    padding: 2rem 1rem;
    min-height: 100vh;
 `