---
description: >-
  Design token vesting & distribution that build trust and protect long-term
  value
icon: handshake-simple
---

# Vesting & disitribution

How you distribute tokens matters as much as how many you create. Vesting schedules, lockups, and release mechanisms signal credibility to investors, regulators, and your community. Tally integrates with on-chain vesting providers like [Hedgey](../../how-to-use-tally/proposals/creating-proposals/custom-actions/token-vesting-with-hedgey.md) and [Sablier](../../how-to-use-tally/proposals/creating-proposals/custom-actions/streaming-payments-with-sablier.md) plus custodians including [Fireblocks](https://www.fireblocks.com/), [Anchorage](https://www.anchorage.com/), and [BitGo](https://www.bitgo.com/), to enforce your token release schedule transparently and automatically.

## Token vesting best practices

Vesting schedules are critical infrastructure for token launches. They align stakeholder incentives with long-term protocol success, prevent market manipulation, and signal credibility to regulators and community members.

This guide provides actionable best practices for implementing token vesting in your launch.

### Core Principles

#### Always Use on-chain enforcement

Never announce vesting schedules without smart contract enforcement. Off-chain promises create trust deficits and enable manipulation.

* Deploy audited vesting contracts before TGE
* Lock tokens in contracts before Token Generation Event
* Make vesting contracts publicly verifiable on block explorers
* Test contracts extensively on testnets before mainnet deployment

#### Apply Consistent Standards Across All Insiders

Team, investors, and advisors should follow similar vesting frameworks. Different standards for different groups create misaligned incentives.

**Recommended minimums:**

* **Cliff period:** 12 months for all insider allocations
* **Total vesting:** 3-4 years from TGE
* **Release schedule:** Linear monthly or quarterly unlocks

#### Design for Market Stability

Structure unlocks to minimize price volatility.

* Use linear vesting over cliff unlocks when possible
* Stagger large unlock events across multiple dates
* Avoid unlocking more than 5-10% of circulating supply in any single month
* Consider longer vesting (4+ years) for founder allocations

### Allocation Guidelines

Industry benchmarks for token distribution:

| Stakeholder        | Typical Allocation | Recommended Vesting | Recommended Cliff |
| ------------------ | ------------------ | ------------------- | ----------------- |
| Founders/Core Team | 15-22%             | 4 years             | 1 year            |
| Early Investors    | 13-19%             | 2-3 years           | 12-18 months      |
| Strategic Advisors | 0.5-5%             | 2-4 years           | 6-12 months       |
| Community/Treasury | 40-45%             | Variable            | Variable          |
| Public Sale        | 5-15%              | 0-6 months          | None              |

> **Key insight:** Keep total insider allocation (team + investors + advisors) under 40% to maintain credible decentralization.

### Investor Vesting

#### Discount-Based Lockups

Higher discounts require longer lockups to prevent immediate arbitrage:

| Discount | Cliff        | Total Vesting |
| -------- | ------------ | ------------- |
| 70%+     | 24+ months   | 36-48 months  |
| 50-70%   | 18-24 months | 30-36 months  |
| 30-50%   | 12-18 months | 24-30 months  |
| <30%     | 6-12 months  | 18-24 months  |



### Team and Founder Vesting

#### Standard Structure

4-year vesting with 1-year cliff remains the gold standard, mirroring traditional startup equity:

1. Nothing vests before 12-month cliff
2. After cliff: 25% vests immediately
3. Remaining 75% vests monthly or quarterly over 36 months

#### Departure Scenarios

Document clearly before launch:

| Scenario                | Typical Treatment             |
| ----------------------- | ----------------------------- |
| Voluntary departure     | Unvested tokens forfeit       |
| Termination for cause   | All unvested tokens forfeit   |
| Involuntary termination | Consider partial acceleration |
| Death or disability     | Consider full acceleration    |

### Community Distribution

#### Airdrop Strategies

Avoid immediate 100% liquidity for airdrop recipients. Consider:

* **Multi-round seasonal drops:** Distribute 20-30% of community allocation across 3-4 seasons
* **Incremental claiming:** Allow claims over 6-12 months with increasing amounts
* **Staking requirements:** Require token locks for governance participation

#### Liquidity Mining

Time-weighted rewards prevent mercenary capital:

* Vest newly earned tokens over 7-30 days
* Implement point systems that reward sustained participation
* Consider token locks for boosted rewards and voting power

#### Anti-Sybil Design

Combine vesting with sybil resistance:

* Minimum transaction count or volume thresholds
* Cross-platform activity verification
* Wallet age requirements
* Community-sourced sybil identification programs

### Technical Implementation

#### Smart Contract Security

Before deployment:

* **Audit contracts:** Minimum two independent security audits
* **Test extensively:** Deploy to testnets for 4+ weeks
* **Verify immutability:** Ensure vesting terms cannot be unilaterally changed
* **Admin key management:** Use multisig (3-of-5 minimum) for any admin functions

#### Monitoring and Transparency

Post-launch requirements:

* Publish vesting contract addresses prominently
* Create public dashboards showing unlock schedules
* Provide APIs for third-party verification
* Regular updates on token unlock events

### Common Pitfalls to Avoid

#### Critical Mistakes

* **Tokens in regular wallets despite announced vesting:** Always use smart contract enforcement
* **Vesting beneficiaries different from stated parties:** Publicly verify beneficial ownership
* **Excessive team/investor concentration (>60% total):** Limits governance credibility
* **Terminating employees just before cliff dates:** Destroys team trust
* **No departure scenario documentation:** Leads to disputes and legal issues

#### Warning Signs

Be cautious if you observe:

* Resistance to on-chain enforcement from any stakeholder group
* Pressure to exempt specific parties from standard vesting terms
* Requests for hidden or obfuscated vesting schedules
* Vesting schedules shorter than industry norms without justification

### Vesting Modification

#### When to Modify

Legitimate reasons for adjustment:

* Market conditions create retention problems with grants far below market value
* Regulatory guidance requires structural changes
* Material changes to project timeline or roadmap
* Stakeholder consensus on improved alignment

#### How to Modify Responsibly

1. **Obtain broad stakeholder consent:** Team, investors, and community
2. **Maintain or extend total duration:** Do not reduce overall vesting periods
3. **Communicate transparently:** Announce changes with clear rationale
4. **Implement on-chain:** Deploy new contracts with proper migration

### Emerging Best Practices

#### Milestone-Based Vesting

Consider combining time-based with achievement-based unlocks:

* Protocol TVL thresholds
* User adoption metrics
* Technical development milestones
* Revenue or usage targets

> **Caution:** Complex milestone definitions can create disputes. Keep criteria objective and verifiable on-chain where possible.

### Pre-Launch Checklist

Before TGE, confirm:

* \[ ] Vesting contracts audited by 2+ independent firms
* \[ ] All insider tokens deposited into vesting contracts
* \[ ] Public dashboard showing unlock schedules deployed
* \[ ] Departure scenario policies documented and signed
* \[ ] Multisig admin controls configured and tested
* \[ ] Block explorer verification of all vesting contracts
* \[ ] Community communications prepared explaining vesting rationale

### Why vesting&#x20;

Well-designed vesting schedules are infrastructure, not afterthoughts. They signal credibility to all stakeholders, align incentives with sustainable value creation, and provide regulatory defensibility.

The projects succeeding long-term implement transparent on-chain vesting with reasonable timelines, consistent standards across insider groups, and honest acknowledgment when vesting creates challenges rather than solutions.

> **Key takeaway:** Every stakeholder benefits from properly structured vesting. Teams retain talent, investors protect valuation, communities gain trust, and protocols build sustainable foundations for long-term growth.
