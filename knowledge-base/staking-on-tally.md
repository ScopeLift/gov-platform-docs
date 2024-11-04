---
description: Tally protocol for Governance Staking
icon: money-bill-transfer
---

# Staking on Tally

The base layer of the Tally protocol is Governance Staking. Governance Staking rewards a DAO's tokenholders for participating in governance. The rewards can come from anywhere, such as the DAO's protocol fees or token issuance.

<details>

<summary>Governance Staking - rewarding governance participation</summary>

In Governance Staking, tokenholders may – and often must – use their staked tokens in governance. Staking supports – or even requires – that stakers delegate their staked tokens' voting power.

**Here's how it works:**

* The DAO decides on eligibility criteria for Governance Staking's rewards. For example, stakers might need to activate their voting power to be eligible.
* Tokenholders stake tokens to be eligible for staking rewards. Staking and unstaking is instant.
* The DAO sends rewards into its Governance Staking. For example, the DAO might route protocol fees to staker.
* Governance Staking distributes those rewards among stakers over time. Each staker's reward is proportional to their staked balance over time.
* Stakers set a beneficiary, such as themselves. The beneficiary can claim their accrued rewards at any time.

**Implementation details:**

* Governance Staking is an immutable contract with minimal governance. It does have two admin functions:
  * Adding new sources of reward
  * Changing the eligibility criteria
* Governance Staking is out-of-the-box compatible with existing \`ERC20Votes\` governance tokens. It supports \`ERC20Votes\` delegation with the "surrogate factory" pattern. Governance Staking creates a surrogate contract for each delegate. It delegates voting power in each surrogate to the delegate.
* Whenever Governance Staking receives rewards, it distributes them over a period of time. Distributing over time gives unstaked tokenholders a chance to stake. A smooth schedule also minimizes discontinuities from flash staking.
* The Governance Staking contract builds on [UniStaker](https://github.com/uniswapfoundation/UniStaker). Unistaker is based on Syntheix's [StakingRewards](https://github.com/Synthetixio/synthetix/blob/develop/contracts/StakingRewards.sol).

![](<../.gitbook/assets/governance-staking (1).png>)

**FAQ**

**Where do rewards come from?**

Rewards can come from anywhere. The most common sources are 1) protocol revenue and 2) issuance of the protocol's native token from treasury and/or inflation.

**What are rewards denominated in?**

Rewards can be in any ERC20 token or tokens. Each token has to be whitelisted by the DAO to prevent spam and griefing.

</details>

A Governance LST is the second layer of the protocol. It's a convenient liquid token wrapper on top of Governance Staking. A Governance LST automates claiming rewards and delegating governance power. It's like what `stETH` does for ETH staking.

<details>

<summary>Governance LSTs - liquid staked governance tokens</summary>

A Governance LST is the easiest way to get rewards from Governance Staking.

The staking system starts from one key insight: holders shouldn't have to choose between participating in governance and rewards! If they do, most of them will choose yield.

If most tokens aren't active in governance, that undermines the DAO. Low participation ends in one of two failure modes. Either the DAO freezes because it has too few votes to pass proposals, or someone launches a 51% governance attack.

The Governance LST solves this problem by having a default strategy for activating governance tokens. If the Governance LST holder doesn't activate their voting power, the default strategy will.

**Here's how a Governance LST works:**

* A holder can stake their \`TOKEN\` balance to receive that many \`stTOKEN\`.
* Optionally, the holder can delegate their voting power
* The \`stTOKEN\` contract deposits \`TOKEN\` in Governance Staking. \`stTOKEN\` assigns the voting power to the holder's chosen delegate, if any. Otherwise, it assigns the voting power using the delegation strategy
* The delegation strategy is configured by \`TOKEN\` governance. This keeps the default voting power aligned with the DAO and mitigates capture risk.
* The \`stTOKEN\` contract claims Governance Staking rewards daily.
* The rewards are auctioned off for more \`TOKEN\`, which is added to each user's staked position. e.g. a balance of \`100 stTOKEN\` might become \`100.5 stTOKEN\`.
* Holders can redeem their \`stTOKEN\` 1:1 for the underlying \`TOKEN\` at any time.

**FAQ**:

**Can the LST participate in governance?**

Yes! The LST can delegate its voting power directly, like a normal governance token. If the holder doesn't delegate the votes, the LST uses the delegation strategy instead. That way, LST voting power is always active in governance.&#x20;

**Is there liquidity risk of LST vs the underlying token?**

Liquidity risk is minimal, because unstaking is instant. If there is a price difference between TOKEN and stTOKEN, arbitrageurs can arbitrage it away.

**Can Governance LSTs be used in restaking and DeFi?**

Yes, that's one of the primary motivations. LST holders can have it all. They can participate in governance, earn rewards for doing so, and use their position as collateral. The LST is a rebasing token, but it's easy to wrap it into a non-rebasing LST.

**Who approves the default delegation strategy(s)?**

The underlying governance does. e.g. Arbitrum governance would pick the delegation strategy for \`stARB\`. If Arbitrum governance does not approve one, Tally Protocol's governance picks a default.

**Is there risk of delegation strategies capturing governance?**

Delegation strategies have no special powers that might present a danger. Token holders are free to change delegation strategies at any time. Poorly implemented delegation strategies do not pose a feedback loop danger. In the worst case, users withdraw their tokens or delegate them by hand.

</details>

Together, these two building blocks close the loop on governance incentives:

* Holders are economically aligned with the protocol
* Holders are incentivized to participate in governance by the eligibilty criteria
* Holders don't have to choose between yield and participation. That opens up even more design space for building token-aligned services on top, without compromising governance.

