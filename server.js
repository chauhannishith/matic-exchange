const express = require('express')
const app = express()
const Matic = require('maticjs').default
const config = require('./config')
const port = 8000

// const value = '100000000000000000' // amount in wei
const gasLimit = '200000'

// Create object of Matic
const matic = new Matic({
    maticProvider: config.MATIC_PROVIDER,
    parentProvider: config.PARENT_PROVIDER,
    rootChainAddress: config.ROOTCHAIN_ADDRESS,
    syncerUrl: config.SYNCER_URL,
    watcherUrl: config.WATCHER_URL,
})

app.get('/', (req, res) => {
    res.status(200).send('Working Yayy!');
})

app.post('/deposit-erc', (req, res) => {
    const token = config.ROPSTEN_TEST_TOKEN // test token address
    const amount = req.body.value
    const from = req.body.fromAddr
    //not the correct way but prefix with `0x`
    matic.wallet = '0x' + req.body.privateKey

    // Approve token
    matic
        .approveERC20TokensForDeposit(token, amount, {
            from,
            gasLimit,
            onTransactionHash: (hash) => {
                // action on Transaction success
                console.log(hash, 'Deposit Tokens from Ropsten/Ethereum to Matic — Transaction Approved.') // eslint-disable-line
            },
        })
        .then(() => {
            // Deposit tokens
            matic.depositERC20Tokens(token, from, amount, {
                from,
                gasLimit,
                onTransactionHash: (hash) => {
                    // action on Transaction success
                    console.log(hash, 'Tokens depositd from Ropsten/Ethereum to Matic.') // eslint-disable-line
                    res.status(200).send({ success: true })
                },
            })
        })
        .catch(err => {
            console.log(err)
            res.status(200).send({ success: false })
        })

})

app.post('/deposit-eth', (req, res) => {
    // const token = config.MATICWETH_ADDRESS // test token address
    //not the correct way but prefix with `0x`
    matic.wallet = '0x' + req.body.privateKey
    const from = req.body.fromAddr
    const value = req.body.value

    matic
        .depositEthers({
            from,
            value
        })
        .then(res => {
            console.log('Success', res)
            res.status(200).send({ success: true })
        })
        .catch(err => {
            console.log('Error', err)
            res.status(200).send({ success: false })
        })

})

app.post('/transfer-erc', (req, res) => {
    // Send Tokens
    const from = req.body.fromAddr
    const recipient = req.body.toAddr
    const token = config.MATIC_TEST_TOKEN // test token address
    const amount = req.body.value
    matic.transferTokens(token, recipient, amount, {
        from,
        // parent: true, // For token transfer on Main network (false for Matic Network)
        onTransactionHash: (hash) => {
            // action on Transaction success
            console.log(hash, 'Transfer completed') // eslint-disable-line
            res.status(200).send({ success: true })
        },
    })
})

app.listen(port, () => {
    console.log('Listening at', port)
})