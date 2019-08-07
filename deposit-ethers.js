const Matic = require('maticjs').default
const config = require('./config')

const token = config.MATICWETH_ADDRESS // test token address
const value = '100000000000000000' // amount in wei
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

matic
    .depositEthers({
        from,
        value
    })
    .then(res => console.log('Success', res))
    .catch(err => console.log('Error', err))