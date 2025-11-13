---
description: Common questions about Swaps, asked and answered.
---

# Swaps: FAQs

### Where do the quotes come from?

The quotes come from[ CoW's price estimator API](https://docs.cow.fi/off-chain-services/api/price-estimation), which estimates current prices from on-chain sources. As the order executes in the future, prices may vary.

#### Quoted price is not guaranteed

Upon proposal creation, you will receive a quote from CoW based on current market conditions. However, market conditions may change by the time of proposal execution, and a new quote from CoW will be used to create your order.

***

### What is a price checker?

[A Milkman price checker](https://github.com/charlesndalton/milkman#price-checkers) ensures that your order only executes if the market price is close, using a price oracle and a slippage parameter.&#x20;

The default price checker on Tally uses Uniswap v3 as a price oracle and sets a max slippage. Custom price checkers can implement any logic they want.

#### Milkman price checker

[Milkman](https://github.com/charlesndalton/milkman) enables smart contracts, like Governor, to place CoW Swap market orders on-chain. Milkman's _price checker_ ensures that orders only fill at prices close to the market price.

***

### What happens if the price checker doesn't see a good price?

If the price checker rejects fills with unfavorable prices, the assets to sell remain in the Milkman order contract. To return those funds to the organization's treasury, the Milkman order needs to be canceled with another on-chain proposal. See [How do I cancel an order?](swaps-faqs.md#how-do-i-cancel-an-order).

***

### How does the Uniswap price checker work?

Tally's default price checker uses the Uniswap V3 oracle to get market prices.

If you select this price checker, Tally suggests a max slippage and picks the Uniswap pair(s) to use for the price oracle.&#x20;

If there is not a direct path (e.g. COMP<>USDT), Tally will try to make a “bridge” with two pairs, e.g. COMP->WETH->USDT instead of COMP->USDT. If that doesn’t work, you’ll have to make a custom price checker route.

#### Example Using the Uniswap Price Checker

_Note that steps 3-7 happen after the Governor proposal._

1. You want to sell 5 COMP to buy USDT
2. You create an order with Milkman. You set the price checker to use the Uniswap v3 oracle oracle and to accept 10% slippage.&#x20;
3. That milkman order goes on-chain. Solvers compete to offer the best price for your order.
4. The best offer from CoW solvers is 100 USDT for 5 COMP.
5. The price checker uses the Uniswap v3 oracle. The Uni v3 price is 21 USDT for 1 COMP.
6.  The price checker confirms that the best offer is greater than the market price with slippage. Here’s the logic:

    The offer of&#x20;

    `100 USDT / 5 COMP  = 20 USDT per COMP`

    is greater than the price checker’s limit of

    `21 USDT per COMP * 0.9 slippage = 18.9 COMP`&#x20;
7. The price checker allows the order to execute on CoW protocol

If no solver comes up with a price greater than 90% of the oracle’s market price, then the order will sit unfilled until someone does. This order can also be canceled by whoever has the cancel role. In the context of a Governor proposal, that’s the organization, as it is the entity that request the swap.

***

### How do I use a custom price checker?

You will need to find the contract address of a price checker and encode the data it can use to determine if the order gets a good price, usually slippage and a swap path. You may need to find a custom price checker that  Custom price checkers can do anything, though.

***

### What is in the Swap Recipe executable?

A Swap Recipe usually includes two executable calls.

1. `approve` Milkman to spend sell token
2. `requestSwapExactTokensForTokens` on Milkman

If the trade sells ETH, the funds must first be deposited for [WETH](https://coinmarketcap.com/alexandria/article/what-is-wrapped-ethereum-weth), since swap pairs must be ERC20s.

1. `deposit` ETH to WETH contract
2. `approve` Milkman to spend WETH
3. `requestSwapExactTokensForTokens` on Milkman

***

### How do I read a swap peceipt?

When casting a vote for a swap, you should check the receipt for accuracy.

The quoted price provides a rough estimate of current market conditions before a swap is filled. The path and slippage show how the price checker will calculate the market price and how much slippage to accept.

After a swap is executed successfully, the Swap Receipt will link to the CoW order and to the order contract.

***

### How do I cancel an order?

To cancel an order, the Governor must call `cancel` on Milkman via an on-chain proposal. Only the governor has authority to cancel an order. Canceling the order returns the assets that were for sale to the treasury.

***

### Why is an order stuck in _Pending execution_?

This means that the order isn’t placed yet. The governor proposal has not yet been executed. Once the proposal has been executed, it will create an order on CoW via Milkman.

***

### Why is there so much slippage in small orders?

Solvers pay gas to take an order. If the gas costs are large compared to the size of the trade, you’ll need high slippage to ensure that the solvers can make a profit after gas costs.
