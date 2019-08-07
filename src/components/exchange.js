import React from 'react'
import styled from 'styled-components'
import { Spacing, Tabs, Text } from 'react-elemental'
import BuySellCommponent from '../components/buy-sell'

const ExchangeComponent = ({
    selectedTab,
    onTabSelect,
    onSubmit,
    onChange
}) => (
    <>
        <Container>
            <ExchangeContainer>
                <Spacing top bottom left right>
                    <Text size="epsilon">
                        Exchange
                    </Text>
                </Spacing>
                <Spacing bottom left right>
                    <Tabs
                        options={[
                            { value: 'buy', label: <TabLabel tab={selectedTab} label='buy'>Buy</TabLabel> },
                            { value: 'sell', label: <TabLabel tab={selectedTab} label='sell'>Sell</TabLabel> }
                        ]}
                        value={ selectedTab }
                        onChange={ onTabSelect }
                    />
                </Spacing>
                <Spacing>
                    {
                        <BuySellCommponent
                            selectedTab={ selectedTab }
                            onSubmit={ onSubmit }
                            onChange={ onChange }
                        />
                    }
                </Spacing>
            </ExchangeContainer>
        </Container>
    </>
)

const TabLabel = ({ selectedTab, label, children }) => {
    if (selectedTab === label) return (
        <Spacing style={{ 'background-color': 'red' }} size='small' left right>
            <Spacing size='tiny' top bottom>
                <Text>
                    { children }
                </Text>
            </Spacing>
        </Spacing>
    )
    return (
        <Spacing size='small' left right>
            <Spacing size='tiny' top bottom>
                <Text>{ children }</Text>
            </Spacing>
        </Spacing>
    )
}

const ExchangeContainer = styled.div`
    width: 100%;
    background: #ffffff;
    -webkit-box-shadow: 0px 0px 15px -5px rgba(163,163,163,1);
    -moz-box-shadow: 0px 0px 15px -5px rgba(163,163,163,1);
    box-shadow: 0px 0px 15px -5px rgba(163,163,163,1);
    margin: 0 1rem;
    flex: 1 1 calc(33.33% - 2rem);
    max-width: 300px;
`

const TabsWrapper = styled.div`

`

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
`

export default ExchangeComponent