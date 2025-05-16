---
description: How to operate staking contracts
icon: screwdriver-wrench
---

# Staking Operator's Guide

### Configuration and deployment

To deploy a staking contract, you'll need to decide the following parameters:

`rewardToken` - _The ERC20 token in which rewards will be denominated._

`stakeToken` -  _The ERC20 token which users will stake to earn rewards._

`earningPowerCalculator` -  _The contract that will calculate earning power for the staking system._

`maxBumpTip`  - _The max that a searcher bot can earn from updating an account's earning power._

`admin` - _The address which will have permission to manage `rewardNotifiers` ._

### Managing Rewards

**Reward Notifiers** are responsible for distributing rewards to the staking system. The admin of Staker can add and remove them.

There are currently three kinds of reward notifiers:

* [TransferFromRewardNotifier](https://github.com/withtally/staker/blob/main/src/notifiers/TransferFromRewardNotifier.sol) - is approved to call `transferFrom` to move tokens&#x20;
* [TransferRewardNotifier](https://github.com/withtally/staker/blob/main/src/notifiers/TransferRewardNotifier.sol) - holds a balance of reward tokens in the notifier. Distributes them over time.
* [MintRewardNotifier](https://github.com/withtally/staker/blob/main/src/notifiers/MintRewardNotifier.sol) - mints new reward tokens directly from the token contract

To add a new reward source:

1. Deploy a [RewardNotifier](https://github.com/withtally/staker/tree/main/src/notifiers)
2. Give the notifier tokens with approve, a balance or mint permission as needed.
3. As the admin, call `setRewardNotifier(address _rewardNotifier, bool true)`

Once the notifier is hooked up, its rewards will flow through the staking system.
