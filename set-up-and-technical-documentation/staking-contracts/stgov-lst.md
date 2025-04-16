---
description: >-
  Set up Tally's staking system: prerequisites, reward sources, and
  considerations for successful deployment.
icon: circle-arrow-up-right
---

# Get Started

## Prerequisites

The simplest version of staking requires just two things, a staking token and a reward source.

* Holders stake the **staking token** for rewards.
* The admin of staking distributes **rewards** to stakers.

The staking token and the reward source must be ERC20 tokens. The reward token can be the same as the staking token.

### Additional Options

#### Staking is compatible with governance

If the staking token is also a governance token - i.e. it implements `ERC20Votes -`then governance works with the staking system. Staking passes through voting power to the underlying governance token. No changes are needed on the governance system.

#### Incentives

Optionally, staking rewards can depend on an [EarningPowerCalculator](https://github.com/withtally/staker/tree/main/src/calculators).  Calculators can increase or decreases rewards based on any criteria. Even offchain criteria can be used, with an oracle.

## Token Launch Considerations

Many protocols launch staking with their token launch. Combining the two offers several benefits:

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

## Choosing the Right Implementation Approach

Your implementation approach depends on your protocol's stage and needs:

#### For new protocols:

* Implement staking alongside your token launch
* Design tokenomics with value accrual in mind from day one
* Create a complete economic loop between usage, fees, and rewards

#### For established protocols:

* Add staking to create utility for existing tokens
* Connect protocol revenue streams to reward stakers
* Consider a phased approach to test and adjust parameters

## Next Steps

Once you've considered these prerequisites and options:

1. Review the [technical implementation details](https://docs.google.com/document/d/17OiiaTC6jeu0E7uEb2HtedChwh1q5sakBo-bbkakYes/edit?tab=t.dljpt5d2kpap) in the next section
2. Decide on your reward source and notifier approach
3. Define your staking parameters
4. [Contact Tally](https://www.tally.xyz/contact) for support with your implementation
