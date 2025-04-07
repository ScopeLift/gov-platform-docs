---
icon: comment-question
---

# Troubleshooting & FAQ

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

### FAQ

#### How often do rewards get distributed, and how is earning power recalculated?&#x20;

The REWARD\_INTERVAL is configurable when deploying a new reward source. When there’s a new reward, the staking system updates everyone’s reward schedules based on earning power. The rewards are distributed over a period of time, the REWARD\_DURATION.\


#### Does the system support partial delegation?&#x20;

Yes, stakers can create multiple staking positions. Each staking position can have its own delegate.

#### Does the Tally interface support multiple staking positions, and is it live?

Yes, see – for example – [Uniswap staking](https://www.tally.xyz/gov/uniswap/stake)

#### &#x20;How does the system handle vote checkpoints/snapshots?&#x20;

The underlying governance token handles snapshotting. Staker puts the governance tokens for each delegate into a separate account, called a “surrogate”. Then, it calls delegate() on the underlying governance token to distribute voting power. This way, the underlying governance system does not have to change.

#### &#x20;How does unstaking work, and is there a time delay?

The current version of Staker lets tokenholders withdraw instantly. Withdrawal delays create an incentive for dangerous LSTs, which can blow up if there’s a duration mismatch.

#### Can the LST participate in governance?

Yes! The LST can delegate its voting power directly, like a normal governance token. If the holder doesn't delegate the votes, the LST uses the delegation strategy instead. That way, LST voting power is always active in governance.

#### Is there liquidity risk of LST vs the underlying token?

Liquidity risk is minimal, because unstaking is instant. If there is a price difference between TOKEN and stTOKEN, arbitrageurs can arbitrage it away.

#### Can stGOV be used in restaking and DeFi?

Yes, that's one of the primary motivations. LST holders can have it all. They can participate in governance, earn rewards for doing so, and use their position as collateral. The LST is a rebasing token, but it's easy to wrap it into a non-rebasing LST.

#### Who approves the default delegation strategy(s)?

The underlying governance does. e.g. Arbitrum governance would pick the delegation strategy for \`stARB\`. If Arbitrum governance does not approve one, Tally Protocol's governance picks a default.

#### Is there risk of delegation strategies capturing governance?

Delegation strategies have no special powers that might present a danger. Token holders are free to change delegation strategies at any time. Poorly implemented delegation strategies do not pose a feedback loop danger. In the worst case, users withdraw their tokens or delegate them by hand.

\
