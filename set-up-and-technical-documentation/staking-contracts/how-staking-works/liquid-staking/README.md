---
description: Auto-compounding liquid staking token
icon: coin-vertical
---

# Liquid Staking

The liquid staking token, also called the LST, is the easiest way to get rewards from staking. It's like what stETH does for ETH staking.

1. The LST is, of course, **liquid**. Staking positions can be transferred without unstaking.
2. The LST **auto-compounds rewards**. Holders will automatically accrue the rewards without having to call claim()&#x20;
3. The LST **keeps governance power active**. When the LST is in DeFi, cold storage, or a centralized exchange, the LST provides a backup plan for governance power.&#x20;
   1. The backup, called the [auto-delegate](https://docs.tally.xyz/set-up-and-technical-documentation/staking-contracts/how-staking-works/liquid-staking-tokens/lst-auto-delegates), has the job of keeping voting power active in governance. For example, see the [OverwhelmingSupportAutoDelegate](https://github.com/withtally/stGOV/blob/main/src/auto-delegates/OverwhelmingSupportAutoDelegate.sol), which only votes on proposals that have lots of consensus.

Check out the code in the open-source [stGOV repo](https://github.com/withtally/stGOV).

### How it works

* Holder stake tokens to receive LST tokens.
* Optionally, they can delegate the governance token voting power
* The LST contracts deposit the staked tokens in Staker. The LST assigns the voting power to the holder's chosen delegate, if any. Otherwise, it assigns the voting power using the [default auto-](https://app.gitbook.com/o/zHytzWx2o7DjCP8sQY76/s/-MQO0N_aitpkSUyz4BYE/~/changes/699/set-up-and-technical-documentation/staking-contracts/how-staking-works/liquid-staking-tokens/lst-auto-delegates)delegate
* The [auto-delegate](lst-auto-delegates.md) can be configured by governance. This keeps the default voting power aligned with the DAO and mitigates capture risk.
* The LST contract claims Staker's rewards regularly.
* The position compounds. The rewards are auctioned off for more of the staked token, which is added to each user's staked position. e.g. a deposit worth 100 GOV tokens might grow to be worth 105 GOV tokens.

Holders can redeem their liquid staking tokens for the underlying staked token at any time. The LST has a short withdrawal delay to prevent MEV extraction.

### Architecture

<figure><img src="../../../../.gitbook/assets/image (1).png" alt=""><figcaption><p>Roles and key methods of the LST</p></figcaption></figure>

#### Key roles:

* **Stakers -** any holder of the staking token can stake for rewards
* **Owner** - manages the fee switch
* **DelegateAdmin** - controls the auto-delegate
* **Searchers** - anyone, such as MEV searchers, can be a "crank turner" to push rewards through the system to stakers.

#### Fee switch:

* The owner can change the fee, up to a hardcoded `MAX_FEE_BIPS` .
* The fee is collecting on rewards. When a reward is distributed from the underlying staking system to stakers, the fee is applied to the reward amount.
* The fee is only collected on rewards. There's no fee on deposits, staked assets, or withdrawals.

#### Auction mechanics:

Because the LST needs to accrue staking tokens, it has a [public method](https://github.com/withtally/stGOV/blob/f41a2a24da46d86c54fe335de6320c1381cb3a14/src/GovLst.sol#L664-L697) that allows any caller to swap native tokens for staking rewards, which can be in any token(s).\


Here's an example:

* An LST contract has accrued rewards of 1 ETH in the staking contract.
* The `payoutAmount` in the LST is configured to 500 staking tokens.&#x20;
* Imagine ETH is trading at $2,500 and the staking token is trading at $5.&#x20;
* At this point, the value of ETH available to be claimed is equal to the value of the payout amount required in staking token.&#x20;
* Once a bit more ETH accrues, it will be profitable for a searcher to trade the 500 staking tokens in exchange for the accrued ETH rewards.\


### Contracts

Each LST deployment consists of two ERC-20 tokens that distribute rewards through the same underlying accounting system.

* [src/GovLst.sol](https://github.com/withtally/stGOV/blob/main/src/GovLst.sol) - Implements a _rebasing_ style liquid staking token similar to stETH. One LST token is worth one of the underlying staked token, and each user's balance is updated dynamically.
* [src/FixedGovLst.sol](https://github.com/withtally/stGOV/blob/main/src/FixedGovLst.sol) - Implements a _fixed balance_ vault-style staking token. A user's balance _does not change_, but also _does not_ map 1:1 with the underlying staked token. Instead, the number of underlying tokens a user may claim in exchange for their position goes up over time.

Each deployment of the LST system includes both style of tokens, but a project may choose to emphasize one or the other, or to put both front and center for their users. Generally, fixed balance tokens are preferred by integrators and custody providers.

For more information about the LST contracts, see [README of the stGOV repository.](https://github.com/withtally/stgov)





\
