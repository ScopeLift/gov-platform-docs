---
description: Maximize fair distribution & price discovery
---

# Choose your mechanism

{% hint style="info" %}
Use the Tally[ sale simulator](https://www.tally.xyz/sale-simulator) to see how CCA's work in real time.&#x20;
{% endhint %}

### Continuous Clearing Auction (CCA)

Fully on-chain auction with continuous price discovery. Bidders commit funds over time, and each block clears at the market price. Built on the [Uniswap Liquidity Launchpad](https://docs.uniswap.org/contracts/liquidity-launchpad/overview) framework.

**How it works:**

1. Auction opens with defined duration, floor price, and graduation threshold
2. Bidders commit funds with a maximum price they'll pay
3. Commitments spread across remaining auction time
4. Each block clears at the price where supply meets demand
5. Early bidders get exposure to cheaper early blocks
6. Auction ends, all successful bidders pay the final clearing price
7. Proceeds automatically seed liquidity on Uniswap v4

**Best for:**

* Projects expecting high demand
* Fair, transparent price discovery
* Rewarding early commitment over speed

**Trade-offs:**

* More complex for participants to understand
* Requires sufficient demand to work well
* Participants don't know final price until auction ends

{% hint style="info" %}
**Example:** A 7-day CCA for 10M tokens. Alice commits $10,000 on day 1 — her bid spreads across all 7 days. Bob commits $5,000 on day 5 — his bid only spreads across the final 3 days. Final clearing price is $0.60. Alice's average cost is lower because she was in during cheaper early blocks.
{% endhint %}

### Fixed price sales

You set the price. Participants buy at that price until tokens sell out or the sale ends.

**How it works:**

1. You determine a fixed price per token based on your target valuation
2. Sale opens, participants purchase at the fixed price
3. If demand exceeds supply, allocation rules determine who gets tokens
4. Sale ends when tokens sell out or the time window closes

**Best for:**

* Simplicity and predictability
* High confidence in your valuation
* Smaller raises with manageable demand

**Trade-offs:**

* If underpriced, you leave money on the table and face allocation challenges
* If overpriced, the sale may not sell out — a public failure
* Doesn't handle unexpected demand gracefully

**Allocation strategies for oversubscription:**

* **First-come-first-served** — Fastest participants win. Favors bots.
* **Pro-rata** — Everyone gets proportional share. Can result in tiny allocations.
* **Whitelist/lottery** — Pre-approved or random selection. Adds friction.

### Liquidity Bootstrapping Pool (LBP)

Price starts high and declines over time. The market finds fair value as buyers enter when price reaches their target.

**How it works:**

1. You configure starting/ending weights, duration, and initial price
2. Sale opens at a high price (discouraging snipers)
3. Price declines according to the weight curve
4. Buyers enter when price reaches their target
5. If enough buyers enter, price stabilizes or rises
6. Sale ends, remaining tokens and funds distributed

**Best for:**

* Discouraging speculation and front-running
* Broader distribution across more participants
* Market-driven pricing without auction complexity

**Trade-offs:**

* Participants must time their entry — can feel like a game of chicken
* Declining price can create perception issues if buyers see price drop after purchasing
* Some MEV exposure remains

{% hint style="info" %}
Example: An LBP starts with 99/1 weight ratio (99% your token, 1% USDC), creating a very high initial price. Over 48 hours, it shifts to 50/50, causing the price to decline. Buyers wait for their target price, then swap in.
{% endhint %}
