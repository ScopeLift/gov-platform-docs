---
description: Key features of Tally's incentive and staking solutions
icon: arrow-down-up-across-line
---

# Features & use cases



## Why incentives and staking?

<details>

<summary>Protocols need sustainable token economics and aligned holders to succeed</summary>

Value accrual offers several key benefits:

* **Stakeholder alignment**: Align tokenholders with protocol success
* **Sustainable tokenomics**: Establish a foundation for ongoing value creation
* **Enhanced retention**: Encourage long-term participation in the ecosystem
* **Protocol resilience**: Secure the protocol with economic assets

Protocols must move beyond initial hype cycles. Value accrual mechanisms help by distributing value directly to participants who secure and govern the network.

</details>

## **Delegate compensation**

<details>

<summary>Reward active governance participants for their time, expertise, and contributions</summary>

Compensation mechanisms encourage thoughtful participation while reducing voting power concentration among large holders. Systems include requirements to ensure only engaged and accountable delegates are rewarded, such as maintaining minimum [reputation scores](../governance/delegate-reputation-score-drs.md) or meeting participation thresholds.

[See how Obol uses delegate compensation to reward token holders.](../governance/delegate-compensation.md)

</details>

## Staking for value accrual

<details>

<summary>Tally's value accrual product is a complete staking solution for protocols</summary>

Tally's value accrual product is a complete staking solution for protocols.&#x20;

Staking on Tally distributes protocol revenue or native issuance to tokenholders. It's the foundation for open, trust-minimized systems.

Optionally, the rewards can be incentives for particular actions. Rewards can depend on particular behavior, like validating the network, long-term holding or governance activity.

Tally staking offers:

1. **Flexible staking infrastructure**: Implement staking for your protocol’s specific needs.
2. [**Multiple reward sources**](https://docs.tally.xyz/tally-features/staking/staking-customizations#returning-fees): Distribute rewards from protocol revenue, treasury assets, token emissions, or all of the above!
3. [**Governance integration**](https://docs.tally.xyz/tally-features/staking/staking-customizations#governance-integration): Staking is compatible with governance, so that holders don’t have to choose between rewards and governance. Optionally, rewards can be conditional on active participation in governance.
4. [**Validator support**](https://docs.tally.xyz/tally-features/staking/staking-customizations#network-protocol-validation): Pay stakers and operators to validate protocol security.
5. [**Engagement mechanics**](https://docs.tally.xyz/tally-features/staking/staking-customizations#stake-streaks): Increase rewards for long-term alignment with stake streaks.\


Tally's solution works for protocols at any stage. It supports new token launches and established projects. This guide covers both strategic direction and technical details.&#x20;

Launch a new token with built-in utility, or enhance your existing tokenomics. Either way, Tally's product provides the foundation for sustainable economic alignment. Get in touch with our implementation and sales team to learn more: [tally.xyz/contact](https://www.tally.xyz/contact).

</details>

<details>

<summary>How it works</summary>

1. &#x20;**Staking contracts distribute rewards over time**

Rewards can come from anywhere. The most common sources are 1) protocol revenue and 2) issuance of the protocol's native token. The rewards can be in any ERC20 token or even in more than one token.

Tally's staking contracts distribute rewards among eligible staking users over time.&#x20;

2. **Tokenholders stake protocol tokens for a share of the rewards**

Tokenholders stake the staking token: the protocol's native token. Then, they earn a share of the rewards proportional to their share of all staked tokens over time. They can stake, claim rewards, and unstake at any time.

Staking supports governance. If the staking token is also a governance token, holders can use their staked tokens in governance. That way, tokenholders don't have to choose between governance and receiving rewards.

Optionally, the staking system can have eligibility criteria stipulate particular actions from tokenholders to get rewards. For example, it could require that staked tokens be active in governance to earn rewards. There's a large design space for incentivizing token-aligned services.

</details>

<details>

<summary>Returning fees</summary>

Tally's staking system allows protocols to return protocol fees to token stakers. This creates direct economic alignment between protocol usage and token holder rewards.

**How it works:**

* Protocol governance decides what percentage of fees to distribute to stakers
* Fee distribution can be automated through smart contracts
* Rewards can be paid in native tokens, ETH, stablecoins, or other assets

Customer example: [Uniswap DAO plans to implement fee sharing with stakers](https://gov.uniswap.org/t/temperature-check-activate-uniswap-protocol-governance/22936), allowing token holders to benefit directly from protocol growth and usage.

</details>

<details>

<summary>Governance Integration</summary>

Unlike other staking systems that force users to choose between earning yield and participating in governance, Tally's solution supports both.

**How it works:**

* Staked tokens can delegate their voting power
* Optionally, rewards depend on the tokens being active in governance

Customer example: Obol implemented staking with governance integration, ensuring their stakers can earn rewards while still contributing to protocol governance decisions. Read the OBOL case study [here](https://tally.mirror.xyz/6e3I6e4K2FL_dcv5cnDTnJdQ0NSpqFnENZBAs7zre4s).

Other protocols like Rarible and Arbitrum are exploring making staking rewards conditional on delegating to an active delegate, further incentivizing governance participation.

</details>

<details>

<summary>Network/protocol validation</summary>



Tally's staking system is compatible with staking and restaking protocols that provide validated services.

**How it works:**

* Native tokens can be used to secure actively validated services
* Compatible with protocols like EigenLayer and Symbiotic
* Aligns token holder incentives with network security

</details>

<details>

<summary>Insurance fund</summary>

Staked tokens can serve as insurance against reorgs or losses

**How it works:**

* Native tokens are staked in a pool and accrue rewards
* If something goes wrong, like a reorg or shortfall crash, staked tokens are slashed to cover the losses

</details>

<details>

<summary>Stake streaks</summary>

Stake streaks reward long-term holders, creating incentives for extended token holding periods and reducing market volatility.

How it works:

* Stakers' earning power increases over time
* Rewards scale based on continuous staking duration
* Encourages long-term protocol alignment, and reduces token velocity

</details>

Ready to launch incentives and staking? [Talk to our team to get started](http://tally.xyz/contact).
