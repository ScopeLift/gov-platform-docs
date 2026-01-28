---
description: Duration, pricing, tokens for sale, and other key configuration decisions
---

# Set sale parameters

{% hint style="success" %}
Once you've chosen your mechanism, Tally helps you configure the specifics of your sale.
{% endhint %}

### Sale duration

| Mechanism   | Typical duration | Considerations                                               |
| ----------- | ---------------- | ------------------------------------------------------------ |
| Fixed price | Hours to days    | Shorter creates urgency; longer allows broader participation |
| LBP         | 24-72 hours      | Shorter = faster price decline, more urgency                 |
| CCA         | 3-7 days         | Longer = more time for price discovery                       |

### Total tokens for sale

What percentage of supply you're selling publicly.

**Recent examples:**

* MegaETH: 5%
* Monad: 7.5%
* Plasma: 10%

Balance public sale against team, investors, treasury, and community allocations.

### Bid currency

What participants pay with.

**Options:** USDC, USDT, ETH

**Recommendation:** USDC. Stablecoins simplify accounting and eliminate volatility risk during the sale.

### Floor price / starting price

* **CCA:** Floor price = minimum acceptable clearing price. Below this, sale fails and refunds issued.
* **LBP:** Starting price = initial high price before curve declines.
* **Fixed price:** The price per token.

**How to determine:**

* Work backward from target raise: Target ÷ Tokens for sale = Price
* Reference comparable recent sales
* Be conservative — better to exceed a modest target than miss an ambitious one

### Graduation threshold

Minimum amount you need to raise for the sale to succeed. Below this, sale cancels and participants are refunded.

Set this at your true minimum viable raise, with buffer for expenses and liquidity provision.

### Optional parameters

#### Allocation limits

Cap tokens per wallet to promote broader distribution.

**Example:** Max 1% of sale per wallet.

#### Eligibility rules

Restrict participation:

* **Whitelist** — Pre-approved addresses only
* **Token holdings** — Must hold X amount of another token
* **Protocol usage** — Must have used your product
* **Sybil scoring** — Filter based on on-chain activity

#### Geographic lockups

Require tokens to lock for participants from certain jurisdictions.

**Example:** U.S. accredited investors receive tokens with 1-year lockup.

### Example configurations

**High-demand auction (CCA):**

```
Duration: 7 days
Tokens: 10,000,000 (10% of supply)
Floor price: $0.10
Graduation threshold: $1,000,000
Bid currency: USDC
Release schedule: Linear
```

**Broad distribution (LBP):**

```
Duration: 48 hours
Tokens: 5,000,000 (5% of supply)
Starting weight: 99/1
Ending weight: 50/50
Starting price: $5.00
Allocation limit: $50,000 per wallet
```

**Simple raise (Fixed Price):**

```
Duration: 24 hours
Tokens: 2,000,000 (2% of supply)
Price: $0.50
Target raise: $1,000,000
Allocation limit: $10,000 per wallet
```
