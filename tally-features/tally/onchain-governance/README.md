---
description: Onchain votes execute proposals trustlessly. Offchain votes don't.
hidden: true
---

# Onchain Governance

> _In onchain DAOs, voters don't need to trust that admins will honor the results of the vote. Instead, smart contracts will automatically implement successful proposals. This eliminates the need for a trusted third party to enact vote results._

## Why onchain?

Smart contracts can be designed to execute proposals automatically based on the outcome of onchain votes, removing the need for a third party or core team to enact vote results. Onchain voting systems, such as those used by MakerDAO, Aave, and protocols built on Compound's governance framework, are examples of this.

<figure><img src="../../../.gitbook/assets/image (123).png" alt=""><figcaption><p>Offchain voting requires social trust.</p></figcaption></figure>

### **Benefits of Onchain Voting**

* Eliminates the need for a trusted third party to count or enact votes
* Passed proposals are executed automatically and trustlessly
* Ideal for approving protocol changes or other high-stakes votes

## How Is Tally different than Snapshot?

Tally is an onchain voting protocol; Snapshot is offchain voting protocol.

**Onchain DAOs use smart contracts to propose, vote on and execute proposals. That makes DAO operations automated, trustless, and more decentralized.**

The [Governor smart contract](../governor-framework.md) manages proposals, counts votes, and executes passed proposals onchain without human intervention. This gives token holders or NFT membership holders direct control over the protocol and/or treasury through voting. They don't have to trust multi-sig signers to execute a proposal vote, nor worry about rogue multi-sig signers creating an unapproved transaction. However, the tradeoff is that creating onchain proposals and voting incurs gas costs.

For more information about deploying or upgrading to an onchain DAO, see [deploying-daos](../../../set-up-and-technical-documentation/deploying-daos/ "mention").
