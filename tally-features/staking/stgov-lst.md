---
description: >-
  This section helps you prepare for implementing Tally's staking system. It
  covers prerequisites, reward sources, and considerations for successful
  deployment.
icon: coin-blank
---

# Getting Started with Staking

#### Get started with Staking by accessing Tally's open source contracts:

* [Staker Repo ](https://github.com/withtally/staker)
* [LST Repo ](https://github.com/withtally/stGOV)

### Prerequisites

#### Token Requirements

Tally's staking system works with standard ERC20 tokens:

* Staking token: The token that users stake in the system
* Reward token(s): One or more tokens distributed as rewards

#### Compatible tokens:

* Standard ERC20 tokens
* Wrapped gas tokens (like WETH)

#### Incompatible tokens:

* Rebasing tokens
* Certain ["weird" ERC20 implementations](https://github.com/d-xo/weird-erc20) with non-standard behavior

Before using a non-standard token, check the[ audit reports](https://github.com/withtally/staker/tree/main/audits) to verify compatibility.

### Reward Source Options

Tally's system distributes rewards through a stream mechanism:

1. Rewards periodically enter the staking system as lump sums
2. Those rewards stream to stakers over time
3. Stakers earn proportional to their staked amount

This approach gives stakers time to respond to changes in rewards.

#### Reward Notifiers

Reward notifiers connect different token sources to the staking system. Tally provides three standard notifiers:

1. ERC20 transfer() Direct token transfers from a treasury or revenue source
2. ERC20 transferFrom() Approved transfers from a separate contract or wallet
3. ERC20 mint() -[ ](https://github.com/withtally/staker/blob/main/src/notifiers/MintRewardNotifier.sol)Newly minted tokens from an inflationary schedule

Each notifier handles capturing rewards from your chosen source and adding them to the staking reward pool.

### Token Launch Considerations

Many protocols implement staking along with their token launch. Combining the two launches offers several benefits:

* Immediate utility for new tokens
* Higher staking conversion rates
* Reduced initial selling pressure
* Clear value proposition for tokenholders

#### Combining Token Launch with Staking

Tally helps protocols launch tokens with integrated staking capabilities. Our token launch flow allows tokenholders to stake immediately after receiving tokens.

This integrated approach:

1. Improves conversion rates
2. Increases the amount staked
3. Establishes sustainable tokenomics from day one

Learn more about how Tally helped Obol combine token launch with staking launch [here](https://tally.mirror.xyz/6e3I6e4K2FL_dcv5cnDTnJdQ0NSpqFnENZBAs7zre4s).

### Choosing the Right Implementation Approach

Your implementation approach depends on your protocol's stage and needs:

#### For New Protocols:

* Implement staking alongside your token launch
* Design tokenomics with value accrual in mind from day one
* Create a complete economic loop between usage, fees, and rewards

#### For Established Protocols:

* Add staking to create utility for existing tokens
* Connect protocol revenue streams to reward stakers
* Consider a phased approach to test and adjust parameters

### Next Steps

Once you've considered these prerequisites and options:

1. Review the [technical implementation details](https://docs.google.com/document/d/17OiiaTC6jeu0E7uEb2HtedChwh1q5sakBo-bbkakYes/edit?tab=t.dljpt5d2kpap) in the next section
2. Decide on your reward source and notifier approach
3. Define your staking parameters
4. Contact Tally for support with your implementation
