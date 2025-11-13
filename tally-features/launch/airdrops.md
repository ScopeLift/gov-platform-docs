---
description: Distribute tokens to millions of recipients
icon: box-check
---

# Airdrops

Distribute tokens to millions of recipients with gas-optimized claim processing.

Configure custom claim experiences tailored to your community and tokenomics. Set flexible eligibility criteria based on on-chain activity, snapshots, or allowlists. Deploy branded claim pages that scale from hundreds to millions of recipients across any EVM chain.

### Distribute at scale

Tally's airdrop infrastructure uses Merkle tree-based claim processing to minimize gas costs while supporting large recipient lists.&#x20;

**Key capabilities:**

* **Multi-chain support**: Deploy airdrops across any EVM-compatible chain
* **Flexible eligibility criteria**: Configure claims based on on-chain activity, snapshot data, or custom allowlists
* **Branded claim experiences**: Custom interfaces that match your protocol's design
* **Gas-optimized claiming**: Merkle proofs minimize transaction costs for claimants
* **Scalable infrastructure**: Handle distributions from hundreds to millions of recipients
* **Native multi-chain claims**: Enable users to claim tokens across multiple networks in a single flow

### Case study: Hyperlane's HYPER token launch

[Hyperlane partnered with Tally ](https://tally.mirror.xyz/ctkM1FUWcpi9YdElMSVZcpXXiRTHsKBRMFTbiZNbggY)to execute the HYPER token launch with native claim support across five blockchain networks. The launch distributed tokens to over 235,000 addresses who claimed nearly 70 million HYPER tokens.

**Results:**

* 235,000+ eligible addresses across 5 chains
* \~70 million HYPER tokens claimed
* Native multi-chain claim experience
* Gas-optimized claiming process

**How it worked:**

* Tally designed eligibility criteria based on Hyperlane's community snapshot
* Custom branded claim page integrated with Hyperlane's visual identity
* Merkle tree implementation enabled gas-efficient claims across multiple chains
* Users could claim tokens natively on Arbitrum, Ethereum, Optimism, Base, or Polygon
* Real-time dashboard provided distribution analytics throughout the claim window

#### Technical features

**Merkle tree optimization:** Tally's airdrops use Merkle tree data structures to store recipient eligibility off-chain while enabling on-chain verification.

**Multi-chain architecture:** Deploy the same airdrop across multiple EVM chains with consistent claiming logic. Recipients can claim on their preferred network without complex bridging or wrapped token mechanics.

**Claim window controls:** Set custom start and end dates for claim periods, with optional extensions and emergency pause functionality.

[**Vesting integration**](vesting-and-disitribution.md)**:** Combine airdrops with vesting schedules to distribute tokens over time while maintaining a seamless claiming experience.
