---
description: Integrate Tally's staking contract into a DeFi protocol
icon: envelope-open-dollar
---

# DeFi Integration Guide

Tally staking lets holders earn rewards, participate in governance, and use their assets in DeFi. This guide outlines considerations for add the LST to a lending market, AMM, or restaking system.&#x20;

See below for details about how a DeFi protocol can integrate the [fixedGovLST](https://github.com/withtally/stGOV/blob/main/src/FixedGovLst.sol) from the [stGOV contracts](https://github.com/withtally/stgov).

#### Integrate the ERC20 Token

The LST is a stanrdard ERC20 token with no "weird" features like rebasing. The integration will be similar to other ERC20 tokens.

_Note: FixedGovLST uses a rebasing LST internally. Integrating against the underlying rebasing LST is not recommended!_

#### Smart contract audits

The LST contracts has been audited twice, in both a private audit and a public contest.&#x20;

* [The LST audit reports are available here in the git repo.](https://github.com/withtally/stGOV/tree/main/audits)

The underlying direct staking system , Staker, has also been audited twice, with both a private audit and a public contest.

* [The Staker audit reports are available in the Staker repo](https://github.com/withtally/staker/tree/main/audits)
* Staker is built on UniStaker. [Unistaker's three audit reports are available here.](https://github.com/withtally/staker/tree/main/audits/unistaker)

**Price oracle integration**

If the LST does not have a native price oracle, the price can be inferred from the price of the underlying staked token's price.

The [fixed-balance LST](https://github.com/withtally/stGOV/blob/main/src/FixedGovLst.sol) is built on top of a [rebasing LST](https://github.com/withtally/stGOV/blob/main/src/GovLst.sol). The rebasing LSTs can be unstaked 1:1 for the underlying staked token. \
\
Here's how to pull the underlying staked token balance in Solidity:

```
function getUnderlyingBalance(address user) external view returns (uint256) {
    // Get the fixed LST token balance of the user
    uint256 fixedTokenBalance = fixedLstContract.balanceOf(user);
    
    // If the account has no balance, return 0
    if (fixedTokenBalance == 0) return 0;
    
    // The share scale factor is public on the FixedGovLst contract
    uint256 shareScaleFactor = fixedLstContract.SHARE_SCALE_FACTOR();
    
    // Convert the fixed LST tokens to shares by multiplying by the scale factor
    uint256 userShares = fixedTokenBalance * shareScaleFactor;
    
    // Use the rebasing LST contract's stakeForShares function
    uint256 underlyingBalance = governanceLstContract.stakeForShares(userShares);
    
    return underlyingBalance;
}
```

_Note: If the LST has a withdrawal delay, there is a potential duration mismatch between the LST and staked token. It's not safe to infer the price from the underlying token in that case, because the LST's and staked token's prices could diverge._

**Liquidity considerations**

The LST is transferrable, so it will have its own liquidity. The underlying staked token also has liquidity. Because the LST can be unstaked for the underlying token, risk analysts should also consider the liquidity of the underlying token.

Programatic liquidations should consider the liquidity of both assets and whether there is a withdrawal delay.

**LST Governance**

The LST and the underlying Staker contract both have limited admin roles.&#x20;

In general, the admins cannot take staked assets or accrued rewards. They can change the reward schedule, the rules for reward eligibility, and turn on the fee switch.

**Slashing Risk**

The default version of the staking system does not have any slashing features.&#x20;

**Upgradeability**

The staking contracts are designed to be immutable. However, like any smart contract, staking can be deployed as an upgradeable proxy.&#x20;

If they're deployed that way, DeFi integrators should understand the upgrade path for the system.
