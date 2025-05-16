---
description: >-
  Set up Tally's staking system: prerequisites, reward sources, and
  considerations for successful deployment.
icon: circle-arrow-up-right
---

# Get Started

## Prerequisites

To implement Tally's staking system, you'll need the following:

1.  **Compatible tokens**:

    1. **A standard ERC20 token to use as the staking token**. Typically, the staking token is the native token of the protocol, like UNI.
    2. **One or more ERC20 tokens to distribute as rewards**. e.g. WETH or the native token of the protocol for inflationary rewards.

    Note: _Rebasing tokens or non-standard ERC20 tokens won't work._
2. **Reward source**: Rewards come from protocol revenue, treasury funds, or minting new tokens.&#x20;

Optionally, staking supports additional features:

* &#x20;**Governance compatibility -** for staking token that are also governance tokens. In other words, tokens that implement `ERC20Votes`**.** Staking passes through voting power to the underlying governance token. No changes are needed on the governance system.
* **Staking reward criteria** can use an [EarningPowerCalculator](https://github.com/withtally/staker/tree/main/src/calculators).  Calculators increase or decrease rewards based on any criteria. Calculators can use offchain criteria with an oracle.

## Combining Staking with Token Launch

Many protocols launch staking with their token launch. Tally can help with a flow that combines the two events. Combining them offers several benefits:

* Immediate utility for new tokens
* Higher staking conversion rates
* Reduced initial selling pressure
* Clear value proposition for tokenholders

Learn more about how Tally helped Obol combine token launch with staking launch [here](https://tally.mirror.xyz/6e3I6e4K2FL_dcv5cnDTnJdQ0NSpqFnENZBAs7zre4s).

## Choosing the Right Implementation Approach

Your implementation approach depends on your protocol's stage and needs:

#### For new protocols:

* Implement staking alongside your token launch
* Design with value accrual in mind from day one
* Create an economic loop between usage, fees, and rewards

#### For established protocols:

* Add staking to create utility for existing tokens
* Use protocol revenue or token inflation to reward stakers
* Consider phasing in rewards over time to test and adjust parameters

## Next Steps

**For the fastest and most reliable implementation:**

* Contact Tally's team at[ tally.xyz/contact](https://www.tally.xyz/contact)
* Tell Tally about your staking and reward tokens
* Tally will guide you through the deployment process
* Get a fully-configured staking user interface on Tally

**To deploy a test or self-serve staking contract**

See the ['Usage' section of the Staker README doc.](https://github.com/withtally/staker?tab=readme-ov-file#usage)
