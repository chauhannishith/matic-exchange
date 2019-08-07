const Matic = require('maticjs').default
const config = require('./config')

const from = config.FROM_ADDRESS // from address
const recipient = config.TO_ADDRESS // receipent address

const token = config.MATIC_TEST_TOKEN // test token address
const amount = '100000000000000000' // amount in wei
const gasLimit = '200000'

// Create object of Matic
const matic = new Matic({
    maticProvider: config.MATIC_PROVIDER,
    parentProvider: config.PARENT_PROVIDER,
    rootChainAddress: config.ROOTCHAIN_ADDRESS,
    syncerUrl: config.SYNCER_URL,
    watcherUrl: config.WATCHER_URL,
})

matic.wallet = config.PRIVATE_KEY // prefix with `0x`

// Send Tokens
matic.transferTokens(token, recipient, amount, {
    from,
    // parent: true, // For token transfer on Main network (false for Matic Network)
    onTransactionHash: (hash) => {
        // action on Transaction success
        console.log(hash, 'Transfer completed') // eslint-disable-line
    },
})