# Curve Voting Escrow

**Key Facts:**

* Used with both [on-chain and off-chain voting](https://wiki.withtally.com/docs/on-chain-vs-off-chain-voting)
* [Vote delegation](https://wiki.withtally.com/docs/vote-delegation) is not supported

**Protocols:**

* [Curve Finance](https://wiki.withtally.com/docs/curve-crv-governance)
* mStable

**Overview:**

Curve uses an escrow and vesting mechanism to apportion voting power to token holders. Theoretically, users who commit to owning a token for a longer time period have more at stake on their investment, and could be expected to make more responsible governance decisions.

Unlocked tokens have no voting power. To gain governance power, token holders must lock their tokens for a fixed period of up to 4 years. Voting power is proportional to token holdings multiplied by time locked, and decreases linearly over time as tokens get closer to unlocking.

Locked tokens can be granted additional utility features beyond voting, depending on the underlying protocol. In Curve's case, locked tokens also increase rewards earned from liquidity mining.

**Resources:**

* Curve vote locking FAQ: [https://resources.curve.fi/faq/vote-locking-boost](https://resources.curve.fi/faq/vote-locking-boost)
* Curve vote locking guide: [https://guides.curve.fi/voting-and-vote-locking-curve-dao/](https://guides.curve.fi/voting-and-vote-locking-curve-dao/)
