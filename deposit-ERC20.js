const Matic = require('maticjs').default
const config = require('./config')

const token = config.ROPSTEN_TEST_TOKEN // test token address
const amount = '100000000000000000' // amount in wei
const from = config.FROM_ADDRESS // from address
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
            },
        })
    })