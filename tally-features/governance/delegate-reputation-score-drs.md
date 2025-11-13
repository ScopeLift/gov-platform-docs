---
icon: star
---

# Delegate Reputation Score (DRS)

Effective governance hinges on motivated, informed delegates. Yet in most mature organizations, fewer than 10 % of token holders take the time to read, debate, and vote.&#x20;

A transparent Delegate Reputation Score (DRS) turns that silent majority into a strategic resource by rewarding the behavior every protocol needs: participating in proposal commentary, adding context, and voting with responsibility and accountability. organizations like Arbitrum and Obol are already utilizing DRS for delegate compensation mechanisms to reward quality governance participation.

### Why does apathy persist?

* **Lack of interest:** most token holders are speculators and are only interested in direct profits through upward price appreciation of their tokens. This has also resulted in low and/or stagnant rates of delegation. On the delegate front, voting in organizations can be time-consuming, as it often requires reading through proposals and understanding the implications of each vote. Without an explicit upside, most are simply not interested enough to commit themselves to this process.
* **Lack of Knowledge:** for non-technical delegates especially, some proposals are just too complex to understand. The sensible thing to do in such cases is to abstain from voting.
* **Free‑rider dilemma:** most benefits accrue regardless of participation.
* **Information overload**: proposals can exceed 40 pages; time is scarce.
* **Fragmented tooling:** forum, off-chain voting, and on‑chain voting platforms are often different.

### Why Incentivize Governance Participation?

* **Quorum resilience:** more active voters means proposals pass or fail on merit, not turnout luck.
* **Higher decision quality:** structured rationales expose trade‑offs early, reducing costly rewrites.
* **Professionalized stewardship:** paying for attention lets delegates hire analysts or subject‑matter experts.
* **External confidence:** regulators, partners, and institutional LPs equate sustained turnout with robustness.

### Recommended Components of a Delegate Reputation & Participation Score

| Metric                            | Why it matters                                                                                    | Possible Data Sources                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| On‑chain vote participation       | Direct impact on governance protocol rules & treasury                                             | Tally APIs / contract calls from block explorer |
| Off‑chain vote participation      | Signals attentiveness to sentiment checks and social proposals that often precede binding actions | Snapshot APIs                                   |
| Forum topic creation              | Starts public discussions and proposals, shows initiative and research depth                      | Discourse API                                   |
| Forum replies & rationale quality | Adds context for delegates and contributes to healthy discourse                                   | Discourse API                                   |
| Governance‑call attendance        | Real‑time engagement, question‑answer loop, social accountability                                 | Calendar analytics                              |
| Research & reporting              | Long‑form analyses, risk reports; lifts the knowledge floor for everyone                          | GitHub PRs and commits                          |

### Weighting parameters and score formula design

Weightings should mirror the causal leverage of each action on proposal quality, not merely its ease of measurement.&#x20;

Voting is an outcome event stemming from weeks of deliberation, and forum discourse is the process that actually shapes that outcome. Threads in which delegates surface trade‑offs, negotiate red lines, and integrate feedback from diverse stakeholders do more to refine a proposal’s final state than the eventual on‑chain “yes” or “no.”&#x20;

Empirically, organizations that weight forum contributions 2‑3× higher than raw vote counts (e.g., Arbitrum, Obol) observe faster consensus formation and fewer post‑vote amendments.&#x20;

In addition to weightings, there are also other important aspects to consider in designing the delegate scoring formula.

* Limiting the reward pool, and the number of delegates who are eligible to receive rewards each cycle.
* Including a normalization window (last 90 days or last 5 proposals) keeps scores responsive while muting one‑off spikes.
* Having correlation mechanisms to add additional points to the score only when delegates explain at least 50 % of their votes.
* Exploring square‑root or tiered payouts mitigate plutocracy by flattening the payout curve beyond a threshold.
* Ensuring sybil resistance, which can be achieved from requiring verified delegation, KYC, or proof‑of‑personhood attestations.

### Case Studies

#### Arbitrum DAO’s Delegate Incentive Program

* Budget: Up to 7 000 USD (or 16 500 ARB) per delegate per month.
* Metric stack: Forum participation (communicating vote rationale, feedback on proposals, creating new proposals) + Offchain Voting (Snapshot) + Onchain Voting (Tally)
* Results:
  * An average of 40 out of 75 enrolled delegates qualified for rewards.
  * Voting power mobilised: + $56.8 M previously dormant.
  * Average voter count per proposal: 7 → 15+ (↑ 117 %).
  * Quorum time fell from 58 h to 48 h (‑17 %).

#### Obol Collective — Delegate Compensation & DRS

* Rewards: 165 000 OBOL over six months, distributed via square rooted voting‑power curve.
* Scoring window: Last 5 on‑chain proposals → agile enough to reflect new entrants.
* Qualitative override: Core team can grant “research bonuses” for deep‑dive analyses.

### Best‑Practice Checklist

1. Co‑design weights with the community to avoid perceptions of capture.
2. Short look‑back windows (≤ 6 cycles) keep scores up‑to‑date.
3. Curve or tier budgets to reward breadth of participation (Obol) or minimum standards (Arbitrum).
4. Publish the data – CSV export + public Dune dashboard.
5. Review quarterly – Retune weights; prune gamed edge cases.

### Ready for DRS?&#x20;

Tally can surface delegate scores directly on your organization’s delegate page, and if the scores are onchain, these scores can directly be streamed into reward‑distribution contracts. Whether you’re launching your first incentive pilot or scaling an existing scheme, our team can help.

Interested in integrating DRS? [Talk to our team to get started](http://tally.xyz/contact).
