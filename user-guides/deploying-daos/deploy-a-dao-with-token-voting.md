---
description: How to deploy a Governor contract to use with Tally
---

# Deploy a Governor

To be compatible with the Tally app we recommend you use OpenZeppelin's [Governor contract](https://docs.openzeppelin.com/contracts/4.x/api/governance). OpenZeppelin offers a modular system of Governor contracts which accommodates different requirements using [Solidity inheritance](https://docs.openzeppelin.com/learn/developing-smart-contracts#about\_inheritance). The design of OpenZeppelin Governor requires minimal use of storage and results in more gas efficient operation.

### Configuring your Governor

Core logic is determined by the Governor contract. When deploying a Governor, you need to chose:

1. how voting power is determined
2. how many votes are needed for quorum
3. what options people have when casting a vote and how those votes are counted
4. what type of token should be used to vote

You can write your own module or choose one from [OpenZeppelin contracts](https://docs.openzeppelin.com/contracts/4.x/).

These parameters must be set for the Governor contract:

* **votingDelay**: how long after a proposal is created that voting power is fixed (a larger delay gives users time to unstake tokens)
* **votingPeriod**: how long a proposal remains open to vote

A **proposal threshold** can also be set, which restricts proposal creation to accounts with enough voting power.

{% hint style="info" %}
The latest published release of the OpenZeppelin Contracts library can be downloaded by running:

`$ npm install @openzeppelin/contracts`
{% endhint %}

The [OpenZeppelin Contracts documentation](https://docs.openzeppelin.com/contracts/4.x/) includes guides and a detailed API reference for learning about developing secure smart contract systems.

You may also find the [OpenZeppelin wizard](https://wizard.openzeppelin.com/) useful for configuring a smart contract.

#### _Helpful Links from OpenZeppelin_

* [Developing smart contracts](https://docs.openzeppelin.com/learn/developing-smart-contracts)
* [Deploying and interacting with smart contracts](https://docs.openzeppelin.com/learn/deploying-and-interacting)

