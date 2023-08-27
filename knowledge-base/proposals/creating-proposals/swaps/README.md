---
description: How to create a DAO swap proposal on Tally
---

# Swaps

Empower your DAO by creating an onchain proposal on Tally using the Swaps recipe! This tool allows DAOs to exchange tokens directly from their treasuries, facilitating treasury diversification. These DAO Swaps are powered by [CoW Swap](https://cow.fi).

### Swap Proposal in 5 Steps

1. A DAO member formulates a swap proposal, specifying the assets to trade and the amount to sell. The UI provides an [estimated quote](./#where-do-the-quotes-come-from) for the trade.
2. After running validations, the recipe prepares [executable](./#what-is-in-the-swap-recipe-executable) code – including a call to [Milkman](./#what-is-milkman) – for execution upon proposal execution.
3. Upon proposal passage and execution, the proposal puts the Milkman market order onchain.
4. An offchain [Milkman bot](https://github.com/charlesndalton/milkman-bot) listens for the swap request and forwards it to the CoW protocol.
5. CoW solvers compete to fill the order at the best price.

### _For FAQs, see._
