# Snapshot Polls

**Key Facts:**

* [Off chain voting](https://tally.document360.io/docs/en/on-chain-vs-off-chain-voting) - no transaction fees
* [Vote delegation](https://tally.document360.io/docs/en/vote-delegation) is not supported

**Protocols:**

* Balancer
* Sushiswap
* Yearn Finance

\*\* Several governance systems use Snapshot polls to gauge community sentiment as part of a ["soft" governnace process](https://tally.document360.io/docs/en/procedural-soft-governance), while maintaining a primary on-chain voting system for ratifying proposals

**Background:**

Snapshot is a tool for gasless voting developed by the team behind the Balancer exchange. While Snapshot was initially released just for BAL signal polls, other projects quickly adopted it to help their users avoid high transaction fees while participating in governance.

**Governance Process:**

Each governance system that uses Snapshot maintains an individual "space" for their community. Space admins (typically community members or project core team) control the specific requirements to submit proposals, as well as the underlying token that confers voting power.

Whenever a proposal is submitted, the system takes a "snapshot" of token balances at that block to apportion voting weight. Any tokens transferred after the snapshot only impact voting power for future proposals. Snapshot votes have configurable parameters for voting period length and vote options, as well as a narrative section to describe the proposal and link to supporting documents.

Snapshot users sign messages off-chain to cast their vote, which avoids the need to pay transaction fees. Signed messages are then durably stored via a decentralized file storage solution such as IPFS or Arweave.

The main weakness of this approach is that the votes are not submitted and broadcast on chain, so a trusted entity is required to review the final vote count and enact the results. Projects utilizing snapshot such as Yearn Finance and Sushiswap have generally relied on multisigs with community elected signers and time-lock mechanisms to ensure that votes are executed faithfully.

**On Chain Execution via Aragon:**

Aragon and Snapshot recently announced a partnership to enhance the utility of Snapshot voting. Instead of relying on a trusted entity to execute the result of votes, governance bodies will be able to integrate with Aragon Agent to allow anyone to trigger proposal execution.

To prevent malicious actions, users will need to make a security deposit when triggering proposals. Other participants can initiate a dispute if the proposer is acting in bad faith, with Aragon Court acting as a final arbitration mechanism. This maps the security of Snapshot voting to the economic security of Aragon as a whole, helping to address centralization risks of governance relying on a core team or multisig signers.

**Resources:**

* Voting app: [https://snapshot.page/#/](https://snapshot.page/#/)
* Discord chat: [https://discord.com/channels/707079246388133940/728646188252921956](https://discord.com/channels/707079246388133940/728646188252921956)
* Github (for requesting a new voting space, etc): [https://github.com/bonustrack/snapshot-spaces](https://github.com/bonustrack/snapshot-spaces)
* Aragon blog - Snapshot partnership announcements: [https://aragon.org/blog/balancer-snapshot](https://aragon.org/blog/balancer-snapshot)
* Aragon blog - Snapshot and optimistic voting: [https://aragon.org/blog/snapshot](https://aragon.org/blog/snapshot)
