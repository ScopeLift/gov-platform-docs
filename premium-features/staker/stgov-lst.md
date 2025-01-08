---
description: Liquid Staking Governance tokens for Staker.
icon: coin-blank
---

# stGOV

A Governance LST is the easiest way to get rewards from Staker, and it plays nice with the underlying DAO.

Staker starts with one key insight: holders shouldn't have to choose between participating in governance and rewards! If they do, most of them will choose yield.

If most tokens aren't active in governance, that undermines the DAO. Low participation ends in one of two failure modes. Either the DAO freezes because it has too few votes to pass proposals, or someone launches a 51% governance attack.

The Governance LST solves this problem by having a default strategy for activating governance tokens. If the Governance LST holder doesn't activate their voting power, the default strategy will.

**Here's how a Governance LST works:**

* A holder can stake their \`GOV\` balance to receive \`stGOV\`.
* Optionally, the holder can delegate their voting power
* The \`stGOV\` contract deposits \`GOV\` in Staker. \`stGOV\` assigns the voting power to the holder's chosen delegate, if any. Otherwise, it assigns the voting power using the delegation strategy
* The delegation strategy is configured by \`GOV\` governance. This keeps the default voting power aligned with the DAO and mitigates capture risk.
* The \`stGOV\` contract claims Staker rewards daily.
* If the rewards aren't denominated in the native GOV token, they are auctioned off for more \`GOV\`. That GOV which is added to each user's staked position. e.g. a balance of \`100 stGOV\` might be be now be back by \`102 GOV \`.
* Holders can redeem their \`stGOV\` for their share of the underlying \`GOV\` at any time.

**FAQ**:

**Can the LST participate in governance?**

Yes! The LST can delegate its voting power directly, like a normal governance token. If the holder doesn't delegate the votes, the LST uses the delegation strategy instead. That way, LST voting power is always active in governance.&#x20;

**Is there liquidity risk of LST vs the underlying token?**

Liquidity risk is minimal, because unstaking is instant. If there is a price difference between TOKEN and stTOKEN, arbitrageurs can arbitrage it away.

**Can stGOV be used in restaking and DeFi?**

Yes, that's one of the primary motivations. LST holders can have it all. They can participate in governance, earn rewards for doing so, and use their position as collateral. The LST is a rebasing token, but it's easy to wrap it into a non-rebasing LST.

**Who approves the default delegation strategy(s)?**

The underlying governance does. e.g. Arbitrum governance would pick the delegation strategy for \`stARB\`. If Arbitrum governance does not approve one, Tally Protocol's governance picks a default.

**Is there risk of delegation strategies capturing governance?**

Delegation strategies have no special powers that might present a danger. Token holders are free to change delegation strategies at any time. Poorly implemented delegation strategies do not pose a feedback loop danger. In the worst case, users withdraw their tokens or delegate them by hand.
