---
description: How to operate staking contracts
icon: screwdriver-wrench
---

# Staking Operator's Guide

### Basic Configuration

To deploy a staking contract, you'll need to decide the following parameters:

`stakeToken` -  _The ERC20 token which users will stake to earn rewards._

The Reward token can be the same or different from the Staker token. If there are rewards denominated in more than one token, other token can be automatically swapped for the reward token before they're distributed



`rewardToken` - _The ERC20 token in which rewards will be denominated._

Typically, this token is the native token of a protocol or a wrapped version of it.



`admin` - _The address which will have permission to manage the staking system_

The admin can take a limited set of admin actions, such as adding new sources of rewards, changing the earning power calculator and overriding eligibility for a particular address.

### Key Modules

`earningPowerCalculator` -  _The contract that will calculate earning power for the staking system._

The simplest earning power calculator is the [_IdentityEarningPowerCalculator_](https://github.com/withtally/staker/blob/main/src/calculators/IdentityEarningPowerCalculator.sol), which distributes rewards proportional to stake over time. [More complex calculators](https://github.com/withtally/staker/tree/main/src/calculators) can use arbitrary criteria to distribute rewards however they want.

_One or more_ `rewardNotifiers`  - _Account(s) that can push rewards into the staking system by notifying the staking contract of a new reward emission._

Pushing rewards into the system is permissioned. Malicious accounts can grief by pushing dust rewards into the system, so rewardNotifiers should ideally be audited smart contracts or trusted accounts that always call `transfer()` and `notify()` atomically.

### Config Details

`MAX_CLAIM_FEE` - _The max claim fee that the admin can set._&#x20;

This guardrail keeps the admin from being setting an unreasonably high claim fee. It should be set to a number greater than zero, if the staking contract might ever use a non-trivial earning power calculator.

`maxBumpTip`  - _The max that a searcher bot can earn from updating an account's earning power._

The admin can update the tip.

\
`claimFeeAmount` - _The fee that a user must pay to claim their reward._

When using a non-identity earning power oracle, set a non-zero `claimFee` to prevent a minor exploit where users split up their stakes into tiny ineligible deposits to avoid being bumped down.

\
`feeCollectorAddress` - _The address that collects the `claimFee`, if any._

### Managing Rewards

**Reward Notifiers** are responsible for distributing rewards to the staking system. The admin of Staker can add and remove them.

There are currently three kinds of reward notifiers:

* [TransferFromRewardNotifier](https://github.com/withtally/staker/blob/main/src/notifiers/TransferFromRewardNotifier.sol) - is approved to call `transferFrom` to move tokens&#x20;
* [TransferRewardNotifier](https://github.com/withtally/staker/blob/main/src/notifiers/TransferRewardNotifier.sol) - holds a balance of reward tokens in the notifier. Distributes them over time.
* [MintRewardNotifier](https://github.com/withtally/staker/blob/main/src/notifiers/MintRewardNotifier.sol) - mints new reward tokens directly from the token contract

In most cases, someone must periodically call the public [`notify()`](https://github.com/withtally/staker/blob/96588fce40554fe7003abada430dcbf3d1f870ba/src/notifiers/RewardTokenNotifierBase.sol#L97)  method on a reward notify to get it to push rewards into the staking system. The period depends on the `rewardInterval` , which is set when the notifier is deployed.

To add a new reward source:

1. Deploy a [RewardNotifier](https://github.com/withtally/staker/tree/main/src/notifiers)
2. Give the notifier tokens with approve, a balance or mint permission as needed.
3. As the admin, call `setRewardNotifier(address _rewardNotifier, bool true)`

Once the notifier is hooked up, its rewards will flow through the staking system.
