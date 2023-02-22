---
description: Why should DAOs be on-chain?
---

# ⛓ On-Chain vs Off-Chain

> With on-chain DAOs, voters don’t need to trust that admins will honor the results of a vote. Smart contracts automatically implement successful proposals.

## Why On-Chain?

**On-chain votes execute proposals trustlessly. Off-chain votes don't.**

<figure><img src="../../.gitbook/assets/on-chain vs off-chain (1).jpg" alt=""><figcaption><p>Off-chain voting requires social trust.</p></figcaption></figure>

Smart contracts can be designed to execute proposals automatically based on the outcome of on-chain votes, removing the need for a trusted third party or core team to enact vote results. Examples of on-chain voting systems include MakerDAO, Aave, and protocols built on Compound's governance framework.

### **Benefits of On-Chain Voting:**

* No trusted third party required to count or enact votes
* Passed proposals execute automatically and trustlessly

Works well for approving protocol changes or other high-stakes votes.\


## How Is Tally Different Than Snapshot?

The big difference between Tally and off-chain voting tools like [Snapshot](https://snapshot.org/) and others is that Tally supports fully on-chain DAOs.

**On-chain DAOs use smart contracts to propose, vote on and execute proposals. That makes DAO operations automated, trustless, and more decentralized.**

The Governor smart contract is responsible for managing proposals, counting votes and executing passed proposals on-chain with no human intervention. The benefit of a Governor DAO is that the token holders or NFT membership holders have direct control over the protocol and/or treasury through voting. Holders don’t have to trust their multi-sig signers to execute a proposal vote, and they don’t have to worry about rogue multi-sig signers creating a transaction that wasn’t approved by the voters. The tradeoff is that creating on-chain proposals and voting isn't free: it costs gas.

For more information about deploying or upgrading to an on-chain DAO, see [deploying-daos](../../user-guides/deploying-daos/ "mention").
