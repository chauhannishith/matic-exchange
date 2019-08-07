const ZeroX = require('0x.js');
const {
    assetDataUtils,
    BigNumber,
    ContractWrappers,
    generatePseudoRandomSalt,
    orderHashUtils,
    signatureUtils,
    RPCSubprovider, Web3ProviderEngine
} = ZeroX;

// import { Web3Wrapper } from '@0x/web3-wrapper';
// import { getContractAddressesForNetworkOrThrow } from '@0x/contract-addresses';

// ropsten.infura.io/v3/6b4d61c3c61843a49945f3be7f0c23c2

// import {  } from '0x.js';

const providerEngine = new Web3ProviderEngine();
module.exports = providerEngine
providerEngine.addProvider(new RPCSubprovider('https://testnet2.matic.network'));
providerEngine.start();
// Instantiate ContractWrappers with the provider
const contractWrappers = new ContractWrappers(providerEngine, { networkId: NETWORK_CONFIGS.networkId });


const exchangeAddress = 0xe6ad71a829283818b5c7fb8bb6d3dd937dbe6044
const maker = 0xA00722ADDFD3F45197109C2A99a200FE732d6Ee9
const zrxTokenAddress = 0xc82c13004c06E4c627cF2518612A55CE7a3Db699
const makerAssetAmount = 10000000000000000
const takerAssetAmount = ZERO
const makerAssetData = 0xc82c13004c06E4c627cF2518612A55CE7a3Db699
const takerAssetData = 0x31074c34a757a4b9FC45169C58068F43B717b2D0

async function test () {
    
// Allow the 0x ERC20 Proxy to move ZRX on behalf of makerAccount
const makerZRXApprovalTxHash = await contractWrappers.erc20Token.setUnlimitedProxyAllowanceAsync(
    zrxTokenAddress,
    maker,
);
await web3Wrapper.awaitTransactionSuccessAsync(makerZRXApprovalTxHash);

// Allow the 0x ERC20 Proxy to move WETH on behalf of takerAccount
/*
const takerWETHApprovalTxHash = await contractWrappers.erc20Token.setUnlimitedProxyAllowanceAsync(
    etherTokenAddress,
    taker,
);


await web3Wrapper.awaitTransactionSuccessAsync(takerWETHApprovalTxHash);

// Convert ETH into WETH for taker by depositing ETH into the WETH contract
const takerWETHDepositTxHash = await contractWrappers.etherToken.depositAsync(
    etherTokenAddress,
    takerAssetAmount,
    taker,
);

await web3Wrapper.awaitTransactionSuccessAsync(takerWETHDepositTxHash);
*/

// Set up the Order and fill it
const randomExpiration = getRandomFutureDateInSeconds();
//const exchangeAddress = contractAddresses.exchange;

// Create the order
const order = {
    exchangeAddress,
    makerAddress: maker,
    takerAddress: NULL_ADDRESS,
    senderAddress: NULL_ADDRESS,
    feeRecipientAddress: NULL_ADDRESS,
    expirationTimeSeconds: randomExpiration,
    salt: generatePseudoRandomSalt(),
    makerAssetAmount,
    takerAssetAmount,
    makerAssetData,
    takerAssetData,
    makerFee: ZERO,
    takerFee: ZERO,
};

// Generate the order hash and sign it
const orderHashHex = orderHashUtils.getOrderHashHex(order);

const signature = await signatureUtils.ecSignHashAsync(providerEngine, orderHashHex, maker);
const signedOrder = { ...order, signature };

console.log(signedOrder)
}

test()
