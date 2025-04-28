---
description: Answers to common questions about staking
icon: comment-question
---

# FAQ

#### Is staking ready and live?

Yes. The [native staking](https://github.com/withtally/staker) and [LST](https://github.com/withtally/stgov) contracts are code-complete, auditied and open source. Tally's app includes a frontend for staking. See, for example, [Uniswap staking](https://www.tally.xyz/gov/uniswap/stake).

**Why is 1 staked token not worth 1 underlying token?**

ERC20 tokens generally have a fixed balance. As the LST accrues rewards, a single LST token is worth more underlying tokens.

#### **What's the difference between liquid staking and native staking?**

Native staking is more configurable. The LST is easier to use. Staking on Tally supports both, so protocols can let users choose the best option for them.

Native staking allows users to have multiple positions.&#x20;

| Liquid staking              | Native staking                  |
| --------------------------- | ------------------------------- |
| Liquid ERC20 tokens         | Non-fungible positions          |
| One staking position        | Multiple positions              |
| Rewards claim automatically | Claim rewards manually          |
| Rewards auto-compound       | Rewards must be manually staked |

#### **Where do rewards come from?**

Protocols provide staking rewards, either from protocol fees or inflation of the native token.

#### **Is there a fee?**

The native staking system does not have a fee, aside from the gas costs of staking and distributing rewards.&#x20;

The liquid staking fee switch applies to staking rewards only. The fee is NOT taken from the staked amount.

#### **Can staking be used in restaking and DeFi?**

Yes, that's one of the primary motivations.  LST holders can earn rewards and use their position as collateral in DeFi.

\
**How does unstaking work, and is there a time delay?**

The current version of native staking lets tokenholders withdraw instantly. Withdrawal delays create an incentive for duration-mismatched LSTs, which can blow up.

#### Is there liquidity risk of LST vs the underlying token?

Liquidity risk is minimal, because unstaking is instant. If there is a price difference between TOKEN and stTOKEN, arbitrageurs can arbitrage it away.

**Is staking compatible with onchain governance, like ERC20Votes tokens and Governor contracts?**

Yes! Staking is compatible with standard governance tokens and Governor contracts out-of-the-box.&#x20;

No changes are needed for a standard ERC20 token + Governor contract are needed to support staking.

#### Does the system support partial delegation of voting power?&#x20;

Yes, stakers can create multiple staking positions. Each staking position can have its own delegate.

**Can LST holders participate in governance?**

Yes! The LST can delegate its voting power directly, like a normal governance token. If the holder doesn't delegate the votes, the LST uses the delegation strategy instead. That way, LST voting power is always active in governance.

#### Who approves the auto delegate?

The underlying governance does. e.g. Arbitrum governance would pick the auto delegate for \`stARB\`.

#### Is there risk of the auto delegate capturing governance?

The auto delegate has no special powers that might present a danger. Token holders are free to change delegation strategies at any time. Poorly implemented auto delegates do not pose a feedback loop danger, because using the auto-delegate is not better than delegating directly. In the worst case, users withdraw their tokens or delegate them by hand.
