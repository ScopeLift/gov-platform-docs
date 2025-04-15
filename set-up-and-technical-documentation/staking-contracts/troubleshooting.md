---
description: Tips for deploying and debugging the Staker system.
icon: magnifying-glass-plus
---

# Troubleshooting

### Common Issues

1. Insufficient reward balance:
   1. Ensure reward tokens are transferred to the staking contract before notification
   2. &#x20;Check that the reward notifier has sufficient balance or approval
2. Oracle operations
   1. If using an oracle-based calculator, tools like OpenZeppelin Defender can push earning power updates onchain
   2. The PauseGuardian should monitor the oracle’s updates and react quickly if the oracle goes offline or posts incorrect earning power
3. Earning power not updating:
   1. Earning power doesn’t automatically update.&#x20;
   2. Anyone can run a bot to update earning power. There’s an economic incentive for MEV searchers to do updates, but they might not know about the incentive.
   3. We recommend running the scripts in the [staker-bots](https://github.com/withtally/staker-bots) repo as a backup, in case the MEV searchers don’t.
