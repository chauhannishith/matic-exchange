import React from 'react'
import styled from 'styled-components'
import { Label, Spacing, SelectList, TextField, Button } from 'react-elemental'
import Web3 from 'web3'

export default class Deposit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedTokens: '',
      selectedAccount: '',
      depositAmount: '0'
    }
  }

  componentDidMount = () => {
    this.isInstalled()
    let self = this
    window.ethereum.on('accountsChanged', function (accounts) {
      self.setState({ selectedAccount: accounts[0] })
    })
  }

  isInstalled = () => {
    if (typeof window.web3 !== 'undefined') {
      console.log('MetaMask is installed')
      var web3 = new Web3(window.web3.currentProvider)
      console.log(window.window.web3.currentProvider.isMetaMask)
      this.isLocked()
    }
    else {
      alert('MetaMask is not installed')
    }
  }

  isLocked = () => {
    var web3 = new Web3(window.web3.currentProvider)
    web3.eth.getAccounts(function (err, accounts) {
      if (err != null) {
        console.log(err)
      }
      else if (accounts.length === 0) {
        console.log('MetaMask is locked')
        window.ethereum.enable()
      }
      else {
        console.log('MetaMask is unlocked')
      }
    });
  }

  checkBalance = () => {
    // tokenInst.balanceOf(
    //   web3.eth.accounts[0],
    //   function (error, result) {
    //     if (!error && result) {
    //       var balance = result.c[0];
    //       if (balance < balanceNeeded * (100000000)) {
    //         console.log('MetaMask shows insufficient balance')
    //         return false;
    //       }
    //       console.log('MetaMask shows sufficient balance')
    //       // Include here your transaction function here
    //     }
    //     else {
    //       console.error(error);
    //     }
    //     return false;
    //   });
  }

  onChangeTokens = token => {
    this.setState({ selectedTokens: token })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onDeposit = async () => {
    var web3 = new Web3(window.web3.currentProvider)
    // window.web3.eth.getBalance(web3.eth.accounts[0], (err, balance) => {
    //     balance = web3.fromWei(balance, "ether") + " ETH"
    //     console.log(balance)
    // });
    web3.eth.getAccounts((err, accounts) => {
      console.log(err)
      console.log(accounts)
      if (accounts.length > 0) {
        window.web3.eth.getBalance(accounts[0], (err, balance) => {
          let bal = window.web3.fromWei(balance, "ether") + " ETH"
          if (window.web3.fromWei(balance, "ether") > this.state.depositAmount + 2) {
            fetch(
              `'http://localhost:8000${this.state.selectedTokens === 'ether' ? '/deposit-eth' : '/deposit-erc'}`, {
                method: 'POST',
                data: JSON.stringify({
                  value: this.state.depositAmount,
                  fromAddr: accounts[0],

                })
              })
          }
        });
      }
    })
  }

  render() {
    return (
      <DepositContainer>
        <Spacing top bottom left right>
          <Spacing bottom>
            <Label label={'Deposit ' + this.state.selectedTokens} />
          </Spacing>
          <Spacing bottom>
            <SelectList
              name='listTokens'
              options={[
                { value: 'ether', label: 'Ether' },
                { value: 'test', label: 'Test' }
              ]}
              value={this.state.selectedTokens}
              onChange={this.onChangeTokens}
            />
          </Spacing>
        </Spacing>

        <Spacing top bottom left right>
          <Spacing bottom>
            <Label label='Amount' />
          </Spacing>
          <Spacing bottom>
            <TextField
              type='tel'
              value={this.state.depositAmount}
              name='depositAmount'
              onChange={this.onChange}
            />
          </Spacing>
        </Spacing>

        <Spacing top bottom left right>
          <Spacing bottom>
            <Button text='Deposit' onClick={this.onDeposit} />
          </Spacing>
        </Spacing>
      </DepositContainer>
    )
  }
}

const DepositContainer = styled.div`
    width: 100%;
    background: #ffffff;
    -webkit-box-shadow: 0px 0px 15px -5px rgba(163,163,163,1);
    -moz-box-shadow: 0px 0px 15px -5px rgba(163,163,163,1);
    box-shadow: 0px 0px 15px -5px rgba(163,163,163,1);
    margin: 0 auto;
    flex: 1 1 calc(33.33% - 2rem);
    max-width: 300px;
    padding: 2rem 1rem;
`
