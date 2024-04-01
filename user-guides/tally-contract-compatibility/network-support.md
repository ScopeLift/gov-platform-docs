---
description: Networks supported on the Tally interface.
---

# Network Support

Tally currently supports these EVM-compatible networks:

**Ethereum**

* Ethereum Mainnet
* Ethereum Goerli Testnet
* Ethereum Sepolia Testnet
* Ethereum Holesky Testnet

**Polygon**

* Polygon Mainnet
* Polygon zkEVM
* Polygon zkEVM Testnet
* Polygon Mumbai Testnet (deprecated)
* Polygon Amoy Testnet

**Binance Smart Chain**&#x20;

* Binance Smart Chain Mainnet
* Binance Smart Chain Testnet

**Arbitrum**

* Arbitrum One
* Arbitrum Goerli Rollup Testnet
* Arbitrum Nova

**Optimism**

* Optimism Mainnet
* Optimism Goerli Testnet

**Avalanche**

* Avalanche C-Chain
* Avalanche Fuji Testnet

**Gnosis Chain**

* Gnosis Chain Mainnet

#### Base

* Base Mainnet
* Base Goerli Testnet (deprecated)
* Base Sepolia Testnet

#### **Scroll**

* Scroll Alpha Testnet
* Scroll Sepolia Testnet
* Scroll Mainnet

#### Moonbeam

* Moonbeam Mainnet

**zkSync**

* zkSync Era Goerli Testnet
* zkSync Era Mainnet
* zkSync Sepolia Testnet

**Celo**

* Celo Mainnet

**Linea**

* Linea Testnet
* Linea Mainnet

**Mantle**

* Mantle Mainnet
* Mantle Testnet (deprecated)
* Mantle Sepolia Testnet

**Kroma**

* Kroma Mainnet
* Kroma Testnet Sepolia

**Iota**

* ShimmerEVM Testnet

**PulseChain**

* PulseChain Mainnet

**Immutable**

* Immutable zkEVM

**Blast**

* Blast Mainnet
* Blast Sepolia Testnet

**OKX**

* X1 Testnet

**LUKSO**

* LUKSO Mainnet

**Lisk**

* Lisk Sepolia Testnet

**Darwinia**

* Darwinia Mainnet

**Crab**

* Crab Mainnet

***

### Adding chains to Tally

To support a chain, Tally has several must-have dependencies:

* EVM-compatible Network
* A full node for user web3 calls
* An archive node with a high rate limit for indexing
* A block explorer with an Etherscan-compatible API

In addition, these nice-to-have dependencies will unlock all the features and improve the UX:

* Support from major wallets for the network
* [Gnosis Safe Available Services](https://docs.safe.global/safe-core-api/available-services#safe-transaction-service)
* [Tenderly network support](https://docs.tenderly.co/supported-networks-and-languages)
