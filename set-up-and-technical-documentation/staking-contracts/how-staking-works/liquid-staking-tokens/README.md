---
description: Configuring a liquid staking token
icon: coin-vertical
---

# Liquid Staking Tokens

Tally can deploy a convenient liquid staking token on top of the direct staking system, Staker.  Token holders can stake their tokens in the LST. The LST automates claiming rewards and delegating governance power. It's like what stETH does for ETH staking.

### How it works

* Holder stake tokens to receive LST tokens.
* Optionally, they can delegate the governance token voting power
* The LST contracts deposit the staked tokens in Staker. The LST assigns the voting power to the holder's chosen delegate, if any. Otherwise, it assigns the voting power using the [default auto-](https://app.gitbook.com/o/zHytzWx2o7DjCP8sQY76/s/-MQO0N_aitpkSUyz4BYE/~/changes/699/set-up-and-technical-documentation/staking-contracts/how-staking-works/liquid-staking-tokens/lst-auto-delegates)delegate
* The [auto-delegate](https://app.gitbook.com/o/zHytzWx2o7DjCP8sQY76/s/-MQO0N_aitpkSUyz4BYE/~/changes/699/set-up-and-technical-documentation/staking-contracts/how-staking-works/liquid-staking-tokens/lst-auto-delegates) can be configured by governance. This keeps the default voting power aligned with the DAO and mitigates capture risk.
* The LST contract claims Staker's rewards regularly.
* The rewards are auctioned off for more of the staked token, which is added to each user's staked position. e.g. a deposit worth 100 GOV tokens might grow to be worth 105 GOV tokens.

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

### Contracts

Each LST deployment consists of two ERC-20 tokens that distribute rewards through the same underlying accounting system.

* [src/GovLst.sol](https://github.com/withtally/stGOV/blob/main/src/GovLst.sol) - Implements a _rebasing_ style liquid staking token similar to stETH. One LST token is worth one of the underlying staked token, and each user's balance is updated dynamically.
* [src/FixedGovLst.sol](https://github.com/withtally/stGOV/blob/main/src/FixedGovLst.sol) - Implements a _fixed balance_ vault-style staking token. A user's balance _does not change_, but also _does not_ map 1:1 with the underlying staked token. Instead, the number of underlying tokens a user may claim in exchange for their position goes up over time.

Each deployment of the stGOV system includes both style of tokens, but a project may choose to emphasize one or the other, or to put both front and center for their users. Generally, fixed balance tokens are preferred by integrators and custody providers.

For more information about the LST contracts, see the [stGOV code repository.](https://github.com/withtally/stgov)





\
