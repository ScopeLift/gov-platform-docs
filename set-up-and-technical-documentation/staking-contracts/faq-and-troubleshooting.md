---
description: Tips for deploying and debugging the Staker system.
icon: magnifying-glass-plus
---

# FAQ & troubleshooting

### Common Issues

1. Insufficient reward balance:
   1. Ensure reward tokens are transferred to the staking contract before notification
   2. &#x20;Check that the reward notifier has sufficient balance or approval
2. Oracle operations
   1. If using an oracle-based calculator, tools like OpenZeppelin Defender can push earning power updates on-chain
   2. The PauseGuardian should monitor the oracle’s updates and react quickly if the oracle goes offline or posts incorrect earning power
3. Earning power not updating:
   1. Earning power doesn’t automatically update.&#x20;
   2. Anyone can run a bot to update earning power. There’s an economic incentive for MEV searchers to do updates, but they might not know about the incentive.
   3. We recommend running the scripts in the [staker-bots](https://github.com/withtally/staker-bots) repo as a backup, in case the MEV searchers don’t.

**How often do rewards get distributed, and how is earning power recalculated?**&#x20;

The REWARD\_INTERVAL is configurable when deploying a new reward source. When there’s a new reward, the staking system updates everyone’s reward schedules based on earning power. The rewards are distributed over a period of time, the REWARD\_DURATION.

\
**How does the system handle vote checkpoints/snapshots?**&#x20;

The underlying governance token handles snapshotting. Staker puts the governance tokens for each delegate into a separate account, called a “surrogate”. Then, it calls delegate() on the underlying governance token to distribute voting power. This way, the underlying governance system does not have to change.<br>
