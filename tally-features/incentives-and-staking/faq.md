---
description: Answers to common questions about incentives and staking
icon: comment-question
---

# FAQ

## FAQ

<details>

<summary>What's staking for?</summary>

Staking is the crypto-native way to align a protocol with its token. It lets protocols both reward aligned behavior and return value to tokenholders.

</details>

<details>

<summary>Is staking live?</summary>

Yes. The [native staking](https://github.com/withtally/staker) and [LST](https://github.com/withtally/stgov) contracts are code-complete, audited and open source. Tally's app includes a frontend for staking.&#x20;

See [OBOL](../../how-to-use-tally/stake-on-tally/how-to-stake-obol.md) & [RARI Staking](../../how-to-use-tally/stake-on-tally/how-to-stake-obol.md).&#x20;

</details>

<details>

<summary>Are the staking contracts audited? </summary>

Yes, they've been audited multiple times.&#x20;

Auditors from Sherlock and Offbeat Security audited the contracts. Additionally, Sherlock and Cantina ran public audit contests. Learn more about the audits in the [Security Section](https://docs.tally.xyz/set-up-and-technical-documentation/staking-contracts/defi-integration-guide#smart-contract-audits) of the technical docs.

</details>

<details>

<summary>Where do rewards come from?</summary>

Protocols provide staking rewards, either from protocol fees or inflation of the native token.

</details>

<details>

<summary>Why is 1 staked token not worth 1 underlying token?</summary>

ERC20 tokens generally have a fixed balance. As the LST accrues rewards, a single LST token is worth more underlying tokens.

</details>

<details>

<summary>What's the difference between liquid staking and native staking?</summary>

| Liquid staking              | Native staking                  |
| --------------------------- | ------------------------------- |
| Liquid ERC20 tokens         | Non-fungible positions          |
| One staking position        | Multiple positions              |
| Rewards claim automatically | Claim rewards manually          |
| Rewards auto-compound       | Rewards must be manually staked |

Native staking is more configurable. The LST is easier to use. Tally staking supports both at the same time, so users can choose the best option for them.

</details>

<details>

<summary>Is there a fee?</summary>

The native staking system does not have a fee, aside from the gas costs of staking and distributing rewards.&#x20;

The liquid staking fee switch applies to staking rewards only. The fee is NOT taken from the staked amount.

</details>

<details>

<summary>Can staking be used in restaking and DeFi?</summary>

Yes, that's one of the primary motivations.  LST holders can earn rewards and use their position as collateral in DeFi.

</details>

<details>

<summary>How does unstaking work, and is there a time delay?</summary>

The current version of native staking lets tokenholders withdraw instantly. Withdrawal delays create an incentive for duration-mismatched LSTs, which can blow up.

</details>

<details>

<summary>Is there liquidity risk of LST vs the underlying token?</summary>

Liquidity risk is minimal, because unstaking is instant. If there is a price difference between TOKEN and stTOKEN, arbitrageurs can arbitrage it away.

</details>

<details>

<summary>Is staking compatible with on-chain governance, like ERC20Votes tokens and Governor contracts?</summary>

Yes! Staking is compatible with standard governance tokens and Governor contracts out-of-the-box.&#x20;

No changes are needed for a standard ERC20 token + Governor contract are needed to support staking.

</details>

<details>

<summary>Does the system support partial delegation of voting power? </summary>

Yes, stakers can create multiple staking positions. Each staking position can have its own delegate.

</details>

<details>

<summary>Can LST holders participate in governance?</summary>

Yes! The LST can delegate its voting power directly, like a normal governance token. If the holder doesn't delegate the votes, the LST uses the delegation strategy instead. That way, LST voting power is always active in governance.

</details>

<details>

<summary>Who approves the auto delegate?</summary>

The underlying governance does. e.g. Arbitrum governance would pick the auto delegate for \`stARB\`.

</details>

<details>

<summary>Is there risk of the auto delegate capturing governance?</summary>

The auto delegate has no special powers that might present a danger. Token holders are free to change delegation strategies at any time. Poorly implemented auto delegates do not pose a feedback loop danger, because using the auto-delegate is not better than delegating directly. In the worst case, users withdraw their tokens or delegate them by hand.

</details>



Ready to launch incentives and staking? [Talk to our team to get started](http://tally.xyz/contact).
