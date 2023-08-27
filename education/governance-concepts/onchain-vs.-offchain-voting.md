---
description: Onchain voting is trustless; offchain voting is not.
---

# Why govern onchain?

## **What is onchain voting?**

Onchain voting refers to governance systems where individual votes are submitted as transactions, and recorded directly on the blockchain. Submitting onchain requires users to pay a transaction fee for each vote.

Smart contracts can be designed to execute proposals automatically based on the outcome of onchain votes, removing the need for a trusted third party or core team to enact vote results. Examples of onchain voting systems include MakerDAO, Aave, and protocols built on Compound's governance framework.

### **Benefits of Onchain Voting**

* More secure than offchain voting
* No trusted third party is required to count or enact votes
* Passed proposals can be executed automatically
* Works well for approving protocol changes or other high-risk votes

## **What is offchain voting?**

Offchain voting refers to governance systems where individual votes are not submitted as blockchain transactions. No transaction fees are necessary for offchain votes.

In token weighted voting schemes, users are prompted to sign messages with their wallet to vote, and the resulting data is stored via a decentralized file storage system such as IPFS or Arweave. While this storage mechanism reduces risk of vote tampering, a trusted third party is still needed to accurately count the votes and enact the results onchain using admin privileges. The most prominent offchain voting system, Snapshot, has been adopted as a voting tool by several protocols including Yearn Finance and Sushiswap.

Some protocols also occasionally use non token weighted polls, which give each user one vote regardless of token holdings. Examples include polls in Discourse forums and Discord chats. These polls are vulnerable to manipulation, but can be helpful in gauging community sentiment earlier in the development process before proposals are put up for token holder voting.

### **Benefits of Offchain Voting**

* No transaction fees required to vote
* Offchain votes can be recorded via decentralized data storage systems, reducing risk of vote tampering
* Works well for sentiment polls or other low-risk votes

## **Hybrid Approaches**

Several protocols are experimenting with using both offchain and onchain votes in different parts of the governance process. For example, CurveDAO uses Snapshot offchain voting for initial sentiment polls of token holders, and only proposals that successfully pass the polling stage are put up for an onchain vote. Hybrid approaches like this can help reduce transaction fee expenses while still leaving token holders in full control of system functions.

Aragon and Snapshot are also implementing "optimistic voting," which allows for offchain poll results to be executed onchain and uses Aragon Court as a security mechanism. More information is available in the [Snapshot Voting Design page](https://docs.tally.xyz/education/governance-frameworks/snapshot-polls).

***

### **Resources**

* [Snapshot Labs Github](https://github.com/balancer-labs/snapshot)
