---
description: How to creating a DAO swap proposal on Tally
---

# 🔀 Swaps

Trading tokens via an onchain proposal is a great way for a DAO to diversify its treasury, but there is a lot going on under the hood! Tally's new Swap Recipe can help. It's powered by [CoW Swap](https://cow.fi)!

#### A Swap proposal in five steps

1. A DAO member constructs a swap proposal, with the assets to trade and the amount to sell. Tally gets an [estimated quote](swaps.md#where-do-the-quotes-come-from) for the trade.
2. After running validations, Tally generates [executable](swaps.md#what-is-in-the-swap-recipe-executable) code – including a call to [Milkman](swaps.md#what-is-milkman) – that will be run on proposal execution.
3. When the DAO passes and executes the proposal, the proposal puts the Milkman swap onchain.
4. An offchain [Milkman bot](https://github.com/charlesndalton/milkman-bot) listens for the swap request and forwards it to the CoW protocol.
5. CoW solvers compete to fill the order with the best price.

#### Where do the quotes come from?

The quotes come from[ CoW's price estimator API](https://docs.cow.fi/off-chain-services/api/price-estimation). The quotes estimate current prices from onchain sources. If the order executes in the future, prices may change.

#### Quoted price is not guaranteed

On proposal creation, you will get a quote from CoW for current market conditions. You must keep in mind that when the proposal will execute, market conditions may change, and a new quote from CoW will be used to create your order.

#### What is Milkman?

[Milkman](https://github.com/charlesndalton/milkman) lets smart contracts, like Governor, make CoW Swap market orders onchain. Milkman includes a “price checker” to make sure orders get the market price.

#### What is a price checker?

[A Milkman price checker](https://github.com/charlesndalton/milkman#price-checkers) makes sure that your order only executes if it gets close to the market price, including slippage. \
\
The default price checker on Tally uses Uniswap v3 as a price oracle and takes a max slippage. The price checker will only accept trades that offer at least the oracle’s price, minus slippage.\
\
Custom price checkers can implement any logic they want.

#### What happens if the price checker fails?

If the price checker fails, no CoW order is created. In that case, the sell funds will be locked in a Milkman order contract. To return those funds to the DAO's treasury, the Milkman order needs to be canceled with another onchain proposal. See [How do I cancel an order?](swaps.md#how-do-i-cancel-an-order).

#### How does the Uniswap price checker work?

Tally's default price checker uses the Uniswap V3 oracle to get market prices.

If you select this price checker, Tally suggests a max slippage and picks the Uniswap pair(s) to use for the price oracle.&#x20;

If there is not a direct path (e.g. COMP<>USDT), Tally will try to make a “bridge” with two pairs, e.g. COMP->WETH->USDT instead of COMP->USDT. If that doesn’t work, you’ll have to make a custom price checker route .

#### Example using the Uniswap price checker

Here's an example of how the Uniswap (default) price checker works. Note that steps 3-7 happen after the Governor proposal.

1. You want to sell 5 COMP to buy USDT
2. You create an order with Milkman. You set the price checker to use the Uniswap v3 oracle oracle and to accept 10% slippage.&#x20;
3. That milkman order goes onchain. Solvers compete to offer the best price for your order.
4. The best offer from CoW solvers is 100 USDT for 5 COMP.
5. The price checker uses the Uniswap v3 oracle. The Uni v3 price is 21 USDT for 1 COMP.
6.  The price checker confirms that the best offer is greater than the market price with slippage. Here’s the logic:

    The offer of&#x20;

    `100 USDT / 5 COMP  = 20 USDT per COMP`

    is greater than the price checker’s limit of

    `21 USDT per COMP * 0.9 slippage = 18.9 COMP`&#x20;
7. The price checker allows the order to execute on CoW protocol

If no solver comes up with a price greater than 90% of the oracle’s market price, then the order will sit unfilled until someone does. The order can also be canceled by whoever has the cancel role. In the context of a Governor proposal, that’s the DAO, as it is the entity that request the swap.

#### Using the Custom price checker

You will need to find the contract address of a price checker and encode the data it can use to determine if the order gets a good price, usually slippage and a swap path. Custom price checkers can do anything, though.

#### What is in the Swap Recipe executable?

A Swap Recipe usually includes two executable calls.

1. `approve` Milkman to spend sell token
2. `requestSwapExactTokensForTokens` on Milkman

If the trade sells ETH, the funds must first be deposited for [WETH](https://coinmarketcap.com/alexandria/article/what-is-wrapped-ethereum-weth), since swap pairs must be ERC20s.

1. `deposit` ETH to WETH contract
2. `approve` Milkman to spend WETH
3. `requestSwapExactTokensForTokens` on Milkman

#### How do I read a Swap Receipt?

Until the swap order is filled, a quote will be used to give a rough estimate of the current market conditions. This is denoted with the \~ before the buy amount. The slippage and pool path is shown to determine how the price checker will run. Consider this before casting a vote for the swap. You will see a link to the CoW order and to the order contract if a swap is executed successfully.

#### How do I cancel an order?

To cancel an order, the Governor must call `cancel` on Milkman via an onchain proposal. Only the governor has authority to cancel an order. Here is an example of a cancel order proposal. Once the order is canceled, the assets that were for sale will be returned to the treasury.

#### Why is an order stuck in _Pending execution_?

This means that the order isn’t placed yet. The governor proposal has not yet been executed. Once the proposal has been executed, it will create an order on CoW via Milkman.

#### Why is there so much slippage in small orders?

Solvers have to pay gas to take an order. If the gas costs are large compared to the size of the trade, you’ll need high slippage to make sure that the solvers can make a profit after gas costs.
