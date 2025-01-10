---
description: >-
  Common questions on the use cases for different governor contracts Tally
  supports
hidden: true
---

# Supported Use Cases FAQ

### Does Tally support Governors that use two-token contracts?

No. The Tally API doesn't have a cost-effective way of calculating voting power for something more complicated than one token, one vote.&#x20;

### Does Tally support DAOs with multiple governor contracts?

Yes, with a workaround. Each Governor gets its own page. Tribe DAO, for example, has three Governors: [Fei](https://www.tally.xyz/governance/eip155:1:0x0BEF27FEB58e857046d630B2c03dFb7bae567494), [Rari Capital](https://www.tally.xyz/governance/eip155:1:0x637deEED4e4deb1D222650bD4B64192abf002c00), and [TribeNope DAO](https://www.tally.xyz/governance/eip155:1:0x6C7aF43Ce97686e0C8AcbBc03b2E4f313c0394C7). Other DAOs have upgraded their Governor and left the old one on Tally for posterity.

### I have an existing token. How can I make a DAO that uses the token for onchain voting?

You can enable DAO governance for your existing token by adding an OpenZeppelin Governor Contract. Learn how in [this article on Tally's blog](https://blog.tally.xyz/how-to-add-dao-governance-to-existing-token-contracts-397855f081ac).&#x20;

### How can I make onchain votes private?

You can implement private voting top of a Governor with Flexible Voting. Implement the [Flexible Voting Extension](../../tally-features/enterprise-features/advanced-voting/flexible-voting-extension.md) in the Governor, then you can deploy a shielded pool that uses zero-knowledge proofs or MPC to keep votes private. Voters can move their votes into the pool. Then, pool can send its vote totals back to the Governor without revealing the votes.
