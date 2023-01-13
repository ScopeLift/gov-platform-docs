---
description: Understand the key differences between off-chain and on-chain DAOs.
---

# Off-Chain vs On-Chain

## What's the difference between an off-chain DAO and an on-chain DAO? <a href="#difference" id="difference"></a>

An **off-chain DAO** is a decentralized autonomous organization that operates _outside of the blockchain_, using traditional databases and other non-blockchain technologies for its operations and decision-making processes. An **on-chain DAO**, on the other hand, is a decentralized autonomous organization that operates _entirely on the blockchain_, using smart contracts and other blockchain-based technologies for its operations and decision-making processes.

## Which is more secure, an off-chain DAO or an on-chain DAO? <a href="#security" id="security"></a>

Running a DAO on the blockchain is generally considered to be more secure and decentralized than running an off-chain DAO.&#x20;

* On-chain DAOs are directly connected to the blockchain, and they use the blockchain’s built-in security features to protect their data and transactions. The blockchain is known for its _security_ and _immutability_, which makes it a very secure platform for running a DAO.
* On-chain DAOs are more _decentralized_ than off-chain DAOs. Because they are run directly on the blockchain, on-chain DAOs are not controlled by any central authority or third party. Instead, they are decentralized and self-governing, with decisions being made through a process of voting by the DAO’s contributors. This means that on-chain DAOs are more resistant to censorship and interference from external parties.
* On-chain DAOs are more _transparent_ than off-chain DAOs. Because all of their data and transactions are stored on the blockchain, on-chain DAOs are completely transparent and open. This means that anyone can see how the DAO is being run and how decisions are being made, which helps to ensure accountability and trust.

## How do off-chain DAOs work?

A typical off-chain voting setup involves a DAO with both tokenholder/member voting and a multi-sig treasury. However, those two pieces aren't connected with on-chain code. Rather, they're connected by a social expectation that multi-sig signers faithfully execute token holder votes.&#x20;

This setup is great for small DAOs and lower-stakes projects where the multi-sig signers aren’t worried about the liability, fiduciary responsibility, or securities-law implications of controlling user funds. Off-chain voting is also great for social layer proposals, where DAO members want to come to consensus about something that doesn’t involve on-chain actions.

## When is an off-chain DAO a good option? <a href="#whenoffchain" id="whenoffchain"></a>

Although generally less secure and decentralized than on-chain DAOs, off-chain DAOs can still offer several benefits that might be appealing, especially for those that are new to the DAO space.

* **More accessible:** Off-chain DAOs are easy to set up and use, making them a good option for non-developers.
* **Less technical knowledge needed:** Since off-chain DAOs don't operate on the blockchain, no smart contracts are needed to run your DAO or manage voting.
* **Greater flexibility:** By not using the blockchain, an off-chain DAO can have more flexibility in terms of the technology and tools it uses to manage its operations.
* **Easier integration:** An off-chain DAO that does not use the blockchain can more easily integrate with existing systems and platforms, making it easier to adopt and use.

## Why upgrade to an on-chain DAO?

For DAOs with more distributed stakeholders, more valuable protocols & treasuries to govern, and higher expectations around decentralization, on-chain voting is probably the better solution. These DAOs often still use off-chain polling for straw polls or temperature checks before moving a proposal to an on-chain vote.

An additional benefit of an on-chain vote is that the proposed transaction to execute is unambiguous: the transaction is part of the proposal, so there’s no chance that the transaction that executes is different from what the voters expected.

## How can I run an on-chain DAO on Tally? <a href="#onchain" id="onchain"></a>

Already have a Governor contract deployed? It's easy to [add your Governor DAO to Tally](../managing-a-dao/)!

If you need help getting started with a Governor contract, make sure to check out our [Technical Guides](../../user-guides/deploying-daos/).

## How can I run an off-chain DAO on Tally? <a href="#offchain" id="offchain"></a>

[Tally Groups](../managing-a-group/) are a quick and easy way to set up an off-chain DAO. No smart contracts are needed, and you can easily invite and manage members, run off-chain governance, and use a Gnosis Safe for treasury management.
