---
icon: arrow-up-right
description: How to deploy a Governor contract to use with Tally
---

# Deploy a Governor

To be compatible with the Tally app, we recommend you use OpenZeppelin's [Governor contract](https://docs.openzeppelin.com/contracts/4.x/api/governance). This modular, battle-tested system of DAO smart contracts gives token holders control of their DAO onchain.

A typical Governor DAO uses three contracts: a token contract, a Governor contract, and a timelock contract.

<figure><img src="../../../.gitbook/assets/image (122).png" alt=""><figcaption></figcaption></figure>

You can use Tally's open-source [Governor deployer](https://github.com/withtally/gov-deployer) to get started.&#x20;

[#configuring-your-governor](./#configuring-your-governor "mention")

[#compatibility-with-tally](./#compatibility-with-tally "mention")

[#helpful-links-from-openzeppelin](./#helpful-links-from-openzeppelin "mention")

## Configuring your Governor

Core logic is determined by the Governor contract. When deploying a Governor, you need to chose:

1. How voting power is determined
2. How many votes are needed for quorum
3. What options people have when casting a vote and how those votes are counted
4. What type of token should be used to vote

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

## Compatibility with Tally

Check out our guide to ensure your OpenZeppelin Governor is compatible with the Tally platform:

{% content-ref url="../smart-contract-compatibility/openzeppelin-governor.md" %}
[openzeppelin-governor.md](../smart-contract-compatibility/openzeppelin-governor.md)
{% endcontent-ref %}

#### _Helpful Links from OpenZeppelin_

* [Developing smart contracts](https://docs.openzeppelin.com/learn/developing-smart-contracts)
* [Deploying and interacting with smart contracts](https://docs.openzeppelin.com/learn/deploying-and-interacting)

### Using Governor

Tally offers an all-in-one guide explaining how to use Governor in the PDF below.

{% file src="../../../.gitbook/assets/Using Governor.pdf" %}
