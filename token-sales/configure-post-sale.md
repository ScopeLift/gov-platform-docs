---
description: Define where proceeds go & how tokens unlock after your sale closes.
---

# Configure post-sale

### Treasury allocation

The majority of funds raised transfer directly to your designated wallet or multisig.

**You'll specify:**

* Treasury wallet address (multisig recommended)
* Percentage of proceeds to treasury (typically 65-80%)

### DEX liquidity

Automatically seed liquidity on Uniswap or Balancer after your sale closes.

**You'll configure:**

* Percentage of proceeds to liquidity (typically 20-35%)
* Which DEX (Uniswap v4, Balancer)
* Pool parameters (fee tier, price range)
* LP position ownership (your treasury controls the position)

{% hint style="success" %}
For CCA sales, liquidity seeding is built into the [Uniswap Liquidity Launchpad](https://docs.uniswap.org/contracts/liquidity-launchpad/overview) and executes automatically.
{% endhint %}

### Token unlocks

Purchased tokens can unlock instantly or vest over time.

**Options:**

* **Instant unlock** — Tokens available immediately after sale
* **Cliff + linear** — Lock for X months, then unlock linearly
* **Geographic-specific** — Different rules for different jurisdictions (e.g., U.S. participants receive 1-year lockup)

{% hint style="success" %}
Tally integrates with Hedgey, Sablier, and custom vesting contracts.
{% endhint %}

### Unsold tokens

If your sale doesn't sell out, decide what happens to remaining tokens:

* Return to treasury
* Add to liquidity pool
* Burn
* Reserve for future distribution
