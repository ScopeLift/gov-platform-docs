---
description: Guide to auto-delegates in stGOV
icon: robot
---

# LST auto delegates

When users stake governance tokens with the LST, they can actively delegate their voting power to specific delegates. However, in situations where tokens are held in DeFi protocols, cold storage, or centralized exchanges, direct delegation becomes challenging. This is where **auto-delegates** come in.

Auto-delegates provide a backup mechanism for governance participation when stGOV tokens are not actively delegated by their holders. They ensure that governance power doesn't become "stranded" and maintains active participation in the protocol's governance.

### Why Auto-Delegates Matter

Auto-delegates solve several critical problems:

1. **Preventing Governance Power Loss**: Without auto-delegates, voting power from stGOV tokens held in DeFi or exchanges would be effectively lost to governance.
2. **Maintaining Quorum**: Auto-delegates help ensure sufficient voting participation to reach quorum for important proposals.
3. **Protecting Against Capture**: A well-designed auto-delegate strategy prevents governance capture when a large portion of tokens are inactive.
4. **Reflecting Community Consensus**: Auto-delegates can be configured to vote according to established community values and preferences.

### Auto-delegate tradeoffs

Any version of a liquid staking token that tries to force users to update their delegate punitively, by withholding rewards, is likely to be beaten in the market by a version that doesn't do this. And that version is very likely to be less organization aligned than this LST's strategy of moving voting weight to the AutoDelegate.

In out view, the best option is to allow disengaged token holders to earn the same yield, but make sure their voting weight stayed active in a way that is under the organization's contro&#x6C;_._ This approach is much better than trying to punish them, and allowing a more pathological set of incentives to play out. Ultimately, the AutoDelegate's is under the control of the active delegates and those that pick them.

### Available Auto-Delegate Options

#### No Auto-Delegate (Burn Address)

The simplest approach is to not use an auto-delegate at all, effectively sending the voting power to a "burn" address.

**Characteristics:**

* Voting power from non-delegated tokens is completely removed from governance
* Simplest implementation with no additional code or maintenance
* Reduces total active voting power, potentially making quorum easier to achieve
* May lead to governance power concentration among active delegators

**Best for:**

* Protocols prioritizing active participation only
* Situations where you want to penalize inactive token holders
* Communities with high active governance participation already

#### Overwhelming Support Auto-Delegate

This option, implemented in [`OverwhelmingSupportAutoDelegate.sol`](https://github.com/withtally/stGOV/blob/main/src/auto-delegates/OverwhelmingSupportAutoDelegate.sol), only votes on proposals that  have strong support, but haven't yet reached quorum.

**Characteristics:**

* Only votes when proposals have reached a configurable threshold of support
* Helps high-consensus proposals cross the finish line
* Won't vote on controversial proposals, i.e. those with mixed support.

**Key Parameters:**

* `subQuorumBips`: The percentage of the quorum that proposals must have already achieved from FOR votes
* `supportThreshold`: The required ratio of FOR votes to (FOR + AGAINST) votes
* `votingWindow`: The timeframe before a proposal's deadline when the auto-delegate can vote

**Best for:**

* Governance systems seeking to maintain quorum while respecting community consensus
* Protocols wanting to avoid governance deadlock on broadly supported proposals
* Communities with lower active participation rates

#### Build a Custom Auto-Delegate

Protocols can create custom auto-delegates tailored to their specific governance needs and philosophy.

**Potential Custom Implementations:**

* **Delegate Council Auto-Delegate**: Follows voting decisions made by a trusted council or experts
* **Meta-Governance Auto-Delegate**: Votes based on a meta-governance system

If you'd like help building a custom delegate, [get in touch with Tally](https://www.tally.xyz/contact). We'd love to help.
