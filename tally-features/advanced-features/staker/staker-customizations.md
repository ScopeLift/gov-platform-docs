---
description: Staker's EarningPowerCalculator acts as a programable incentive system
icon: arrow-down-up-across-line
---

# Staker customizations

Staker uses a concept called "Earning Power" to distribute rewards. Every depositor gets Earning Power. Their share of the reward is their earning power divided by the total earning power in Staker, over time.&#x20;

**Flat Earning Power**

The simplest setup is to give every depositor earning power equal to their deposited stake. The [IdentityEarningPowerCalculator](https://github.com/withtally/staker/blob/main/src/calculators/IdentityEarningPowerCalculator.sol) implements this kind of earning power.

**Oracle-based Earning Power**

Earning power can also depend on arbitrary criteria. Here's how the [BinaryEligibilityOracleEarningPowerCalculator](https://github.com/withtally/staker/blob/main/src/calculators/BinaryEligibilityOracleEarningPowerCalculator.sol) works:

* An oracle puts scores onchain
* The calculator turns earning power on and off based on whether an address's score exceeds a configurable threshold
* Staker uses the earning power over time to distribute rewards.

This calculator has built-in failsafes in case the oracle misbehaves or goes offline. If the oracle misbehaves by posting incorrect scores, a \`PauseGuardian\` can pause the system, reverting it to flat earning power. If the oracle goes offline, the calculator also automatically reverts to using flat earning power.

The oracle can be replaced by Staker's admin.
