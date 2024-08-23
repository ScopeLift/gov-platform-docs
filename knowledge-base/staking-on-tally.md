---
description: Tally protocol for Governance Staking
---

# 🏦 Staking on Tally

The base layer of the Tally protocol is GovStaker. GovStaker rewards a DAO's tokenholders for participating in governance. The rewards can come from anywhere, such as the DAO's protocol fees or token issuance.

<details>

<summary>GovStaker</summary>



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

<summary>stTOKEN</summary>

**Tally Protocol**

The protocol is a software convenience layer on top of staking designed to make the process of doing the work of selecting delegates (and holding them accountable!) easier for staker.\


<img src="../.gitbook/assets/image (3).png" alt="" data-size="original">

Again, the Tally Protocol only manages it’s own staked token vault, no one elses.

<img src="../.gitbook/assets/image (4).png" alt="" data-size="original">

What the Tally Protocol does that is special, is that it creates a _receipt token_ for the \[token] which is staked through it, called st\[token], and it returns it to the user.

<img src="../.gitbook/assets/image (5).png" alt="" data-size="original">

The underlying tokens that the Tally Protocol have staked on the users behalf are _always_ available to redeem, 1:1 plus rewards, at any time, with no delay or lockup.

<img src="../.gitbook/assets/image (6).png" alt="" data-size="original">

This is a very important point. The st\[token] receipt is functionally equivalent to the underlying token, it can be exchanged at any time. Because of this, there is no risk of a depeg event for the st\[token]:\[token] exchange rate. Any deviation from a 1:1 exchange rate would be instantly arbitraged by 3rd parties staking or unstaking st\[token]:\[token] to capture any deviation in the exchange rate.

</details>

**Of course this means we need to be **_**very**_** sure that you can always redeem 1:1. To be sure of this we’re doing several things:**

<details>

<summary>Simplicity </summary>



One of the most powerful tools in security is simplicity. The Tally Protocol itself is very simple, and the contract which manages the token is essentially just a wrapper contract that deposits the DAO \[token] into staker and mints st\[token], or takes in st\[token], and returns \[token].

The contract is easy to reason about, easy to test, and intentionally designed to be very simple.

To address some of your specific questions:

1. **Misalignment Risk: The ratio of unlocked tokens to quorum requirements may become imbalanced, potentially making governance decisions either too easy (if quorum is too low relative to supply) or too difficult (if quorum is too high).**

There is no danger of misalignment risk in the protocol as there are no locked tokens.

Holders of st\[token] have all the same governance rights as \[token] holders and the two tokens are effectively identical (except the fact that st\[token]'s also earn auto-compounding yield). As there is no lockup period, users are free to move between the two tokens at any time, meaning there is effectively no change in _how_ the tokens interact with governance.

What we do hope happens however is that more token holders participate in governance. If that happens it might be worthwhile revisiting quorum requirements, but keep in mind this is a _feature_ not a bug. There is no leveraged voting power being created here, users are electing themselves to be more active in governance. The delegation strategies the DAO might elect to use in the Tally Protocol are no different than users choosing to delegate their tokens themselves.

Additionally, delegation strategies have no special powers that might present a danger. Token holders are free to change delegation strategies at any time. Poorly implemented delegation strategies do not pose a feedback loop danger, and in the absolute worst case scenario users simply withdraw their tokens, or delegate to themselves.

In essence, the Tally Protocol does not introduce any new variables to the game theory of how DAO governance currently operates. All the expectations we hold to be true in vanilla DAO governance and hold true with the Tally Protocol as a governance participant as well.

2. **Participation Gap: Even with increased staking, the growth in active participants may lag behind the growth in token supply, making it progressively harder to reach quorum over time.**

This is not a concern with either staker or Tally Protocol. All tokens in staking and Tally protocol must be delegated (this is not optional and is core to why staking works: users _must_ do effort to be rewarded such that they are rewarded specifically for their own efforts). This means that increase of tokens staking whether directly, or via the Tally protocol strictly results in an increase of delegated voting power.

In the implementation we are proposing for DAOs there are economic incentives to be sure the delegated voter is active as well.

This is actually _safer_ for DAOs and ensures that participation in the DAO is always high and grows as more token holders elect to use the staker or the protocol.

3. **Governance Efficacy: This potential misalignment could affect the DAO’s ability to make timely and representative decisions, especially if a significant portion of the growing token supply remains passive in governance.**

There are no passive tokens in the Tally Protocol or in staking as 100% of staked tokens, whether through the Tally protocol or directly via staker are at a minimum delegated. This means that the efficacy of the DAO is unchanged from today's status quo: either delegates vote or they don’t. The Tally protocol and staking don’t influence the commitment of our delegates to participate.

In the implementation we are specifically suggesting for DAOs there are also requirements that rewards be linked to _participation_, meaning there is a strong economic incentive to actively participate in governance for both the token holders and their delegate. Staking and the Tally Protocol will substantially work to significantly reduce passive holders and reward actives in the DAO.

</details>

