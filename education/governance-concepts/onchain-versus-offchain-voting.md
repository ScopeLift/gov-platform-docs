# Onchain versus Offchain Voting

**What is On Chain Voting?:**

On chain voting refers to governance systems where individual votes are submitted as transactions, and recorded directly on the blockchain. Submitting on chain requires users to pay a transaction fee for each vote.

Smart contracts can be designed to execute proposals automatically based on the outcome of on chain votes, removing the need for a trusted third party or core team to enact vote results. Examples of on chain voting systems include MakerDAO, Aave, and protocols built on Compound's governance framework.

**Benefits of On Chain Voting:**

* More secure than off chain voting
* No trusted third party required to count or enact votes
* Passed proposals can be executed automatically
* Works well for approving protocol changes or other high risk votes

**What is Off Chain Voting?:**

Off chain voting refers to governance systems where individual votes are not submitted as blockchain transactions. No transaction fees are necessary for off chain votes.

In token weighted voting schemes, users are prompted to sign messages with their wallet to vote, and the resulting data is stored via a decentralized file storage system such as IPFS or Arweave. While this storage mechanism reduces risk of vote tampering, a trusted third party is still needed to accurately count the votes and enact the results on chain using admin privileges. The most prominent off chain voting system, Snapshot, has been adopted as a voting tool by several protocols including Yearn Finance and Sushiswap.

Some protocols also occasionally use non token weighted polls, which give each user one vote regardless of token holdings. Examples include polls in Discourse forums and Discord chats. These polls are vulnerable to manipulation, but can be helpful in gauging community sentiment earlier in the development process before proposals are put up for token holder voting.

**Benefits of Off Chain Voting:**

* No transaction fees required to vote
* More participation, particularly from smaller holders and wider community
* Off chain votes can be recorded via decentralized data storage systems, reducing risk of vote tampering
* Works well for sentiment polls or other low risk votes

**Hybrid Approaches:**

Several protocols are experimenting with using both off chain and on chain votes in different parts of the governance process. For example, CurveDAO uses Snapshot off chain voting for initial sentiment polls of token holders, and only proposals that successfully pass the polling stage are put up for an on chain vote. Hybrid approaches like this can help reduce transaction fee expenses while still leaving token holders in full control of system functions.

Aragon and Snapshot are also implementing "optimistic voting", which allows for off chain poll results to be executed on chain and uses Aragon Court as a security mechanism. More information is available in the [Snapshot Voting Design wiki page](https://tally.document360.io/docs/en/snapshot-voting-design).

**Resources:**

* Snapshot Labs Github: [https://github.com/balancer-labs/snapshot](https://github.com/balancer-labs/snapshot)
* Aragon blog - Snapshot partnership announcements: [https://aragon.org/blog/balancer-snapshot](https://aragon.org/blog/balancer-snapshot)
* Aragon blog - Snapshot and optimistic voting: [https://aragon.org/blog/snapshot](https://aragon.org/blog/snapshot)
