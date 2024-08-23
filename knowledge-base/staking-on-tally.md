---
description: Tally protocol for Governance Staking
---

# 🏦 Staking on Tally

The base layer of the Tally protocol is GovStaker. GovStaker rewards a DAO's tokenholders for participating in governance. The rewards can come from anywhere, such as the DAO's protocol fees or token issuance.

<details>

<summary>GovStaker - rewarding governance participation</summary>



The base layer of the Tally protocol is GovStaker. GovStaker rewards a DAO's tokenholders for participating in governance. The rewards can come from anywhere, such as the DAO's protocol fees or token issuance.

In GovStaker, tokenholders may – and often must – use their staked tokens in governance. Staking supports – or even requires – that stakers delegate their staked tokens' voting power.

**Here's how it works:**

* The DAO decides on eligibility criteria for GovStaker's rewards. For example, stakers might need to activate their voting power to be eligible.
* Tokenholders stake tokens to be eligible for staking rewards. Staking and unstaking is instant.
* The DAO sends rewards into its GovStaker. For example, the DAO might route protocol fees to staker.
* GovStaker distributes those rewards among stakers over time. Each staker's reward is proportional to their staked balance over time.
* Stakers set a beneficiary, such as themselves. The beneficiary can claim their accrued rewards at any time.

**Implementation details:**

* GovStaker is an immutable contract with minimal governance. It does have two admin functions:
  * Adding new sources of reward
  * Changing the eligibility criteria
* GovStaker is out-of-the-box compatible with existing \`ERC20Votes\` governance tokens. It supports \`ERC20Votes\` delegation with the "surrogate factory" pattern. GovStaker creates a surrogate contract for each delegate. It delegates voting power in each surrogate to the delegate.
* Whenever GovStaker receives rewards, it distributes them over a period of time. Distributing over time gives unstaked tokenholders a chance to stake. A smooth schedule also minimizes discontinuities from flash staking.
* The GovStaker contract builds on [UniStaker](https://github.com/uniswapfoundation/UniStaker). Unistaker is based on Syntheix's [StakingRewards](https://github.com/Synthetixio/synthetix/blob/develop/contracts/StakingRewards.sol).

</details>

The second layer is a convenient liquid token wrapper on top of GovStaker. A governance token with ticker `GOV` would get `stGOV`. `stGOV` automates claiming rewards and delegating governance power. It's like what `stETH` does for ETH staking.

<details>

<summary>stTOKEN - liquid staked governance token</summary>

stTOKEN is the easiest way to get rewards from GovStaker.

The system design starts from one key insight. Holders shouldn't have to choose between participating in governance and rewards! If they do, most of them will choose yield.

If most tokens aren't active in governance, that undermines the DAO. Low participation ends in one of two failure modes. Either the DAO freezes because it has too few votes to pass proposals, or someone launches a 51% governance attack.

stTOKEN solves this problem by having a default strategy for activating governance tokens. If the stTOKEN owner doesn't activate their voting power, the default strategy will.

**Here's how it works:**

* A holder can stake their \`TOKEN\` balance to receive that many \`stTOKEN\`.
* Optionally, the holder can delegate their voting power
* The \`stTOKEN\` contract deposits \`TOKEN\` in GovStaker. \`stTOKEN\` assigns the voting power to the holder's chosen delegate, if any. Otherwise, it assigns the voting power using the delegation strategy
* The delegation strategy is configured by \`TOKEN\` governance. This keeps the default voting power aligned with the DAO and mitigates capture risk.
* The \`stTOKEN\` contract claims GovStaker's rewards daily.
* The rewards are auctioned off for more \`TOKEN\`, which is added to each user's staked position. e.g. a balance of \`100 stTOKEN\` might become \`100.5 stTOKEN\`.
* Holders can redeem their \`stTOKEN\` 1:1 for the underlying \`TOKEN\` at any time.

**FAQ**:

**Who approves the default delegation strategy(s)?**

The underlying goverance does. e.g. Arbitrum governance would pick the delegation strategy for \`stARB\`. If Arbiturm governance does not approve one, Tally Protocol's governance picks a default.

**Is there liquidity risk?**

Liquidity risk is minimal, because unstaking is instant. If there is a price difference between TOKEN and stTOKEN, arbitrageurs can arb it away.

**Can stTOKEN be used in restaking and DeFi?**

Yes, that's one of the primary motivations. stTOKEN holders can have it all. They can participate in governance, earn rewards for doing so, and use their position as collateral. stTOKEN is a rebasing token, but a wrapped non-rebasing token will also be available.

**Is there risk of delegation strategies capturing governance?**

Delegation strategies have no special powers that might present a danger. Token holders are free to change delegation strategies at any time. Poorly implemented delegation strategies do not pose a feedback loop danger. In the worst case, users withdraw their tokens or delegate them by hand.

</details>

Together, these two building blocks close the loop on governance incentives:

* Holders are economically aligned with the protocol
* Holders are incentivized to participate in governance by the eligibilty criteria
* Holders don't have to choose between yield and participation. That opens up even more design space for building token-aligned services on top, without compromising governance.

