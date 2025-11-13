---
icon: shield
---

# Private voting

Private voting encrypts individual votes on-chain while maintaining verifiable final results. Votes are encrypted when cast and only decrypted after the voting period ends, revealing the final tally while preserving voter privacy.

Private voting can be implemented on top of a Governor with Flexible Voting. Implement the [Flexible Voting Extension](https://docs.tally.xyz/user-guides/smart-contract-compatibility/flexible-voting-extension) in the Governor, then deploy a shielded pool that uses zero-knowledge proofs or MPC to keep votes private. Voters can move votes into the pool, then the pool sends its vote totals back to the Governor without revealing the votes.

Additional Reading: [Arbitrum Partial Delegation and Private Voting Solutions Research](https://forum.arbitrum.foundation/t/arbitrum-partial-delegation-and-private-voting-solutions-research/26638/1)
