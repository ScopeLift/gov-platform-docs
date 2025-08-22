---
icon: message-smile
---

# Optimistic Governance

### Introduction

Liquid democracy, where each token represents one vote, is an ideal governance model in theory. However, in practice, many DAOs face challenges such as voter apathy, lack of technical knowledge, and an overwhelming volume of complex proposals. These barriers can significantly reduce the effectiveness and speed of decision-making.

### The case for optimistic governance

Optimistic governance offers a solution to these challenges by assuming that most proposals are approved, unless explicitly veto-ed by delegates otherwise. In this model, the decision-making process is streamlined, with a clear mechanism for delegates or community members to intervene if necessary. This is particularly useful for proposals related to maintenance upgrades, technical changes, or parameter adjustments, which may not require extensive community deliberation, but still need oversight and the ability to veto in the edge case that the proposed changes are malicious.



### Proposed process for optimistic governance

To implement optimistic governance, Tally proposes a structured process designed to balance efficiency with accountability. The process involves several key steps:



1. **Proposal submission**
   1. Proposals are submitted by the proposer using a standardized template
   2. A proposal draft is shared with the community to gather initial feedback and ensure transparency
2. **Due diligence**&#x20;
   1. A review process is conducted to ensure that the proposal meets the necessary criteria, such as technical feasibility and alignment with the DAO’s goals
   2. This stage may involve verifying the proposal’s technical details, ensuring that any code or assets involved are secure, and confirming that the proposal author is legitimate
3. **Council vote**
   1. A council, consisting of delegates with technical expertise and community representatives, votes on the proposal
   2. If the proposal passes with a sufficient majority (eg: 4 out of 6 members), it proceeds to the next stage
4. **Optimistic veto window**
   1. Following the council vote, a defined veto window opens (typically lasting 7 days), during which any DAO member or delegate can cast a veto vote to block the proposal
   2. A veto vote can only cancel the proposal if 2 conditions are met:
      1. The veto turnout meets a quorum threshold, ensuring that the veto process remains representative of the broader community’s stance, **AND**
      2. A majority (eg >50%) of the veto votes are cast. By default, if delegates don’t vote at all, then only veto votes will be captured. If delegates choose to cast ‘Support’ votes, then this condition will only be met if the number of veto votes exceeds the number of support votes
5. **Execution**
   1. If the veto window closes without sufficient opposition, the proposal is executed as originally planned
   2. If the proposal is vetoed, it is canceled, and further revisions may be required before resubmission\


\
