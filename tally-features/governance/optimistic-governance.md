---
icon: message-smile
---

# Optimistic governance

### Introduction

Liquid democracy, where each token represents one vote, is an ideal governance model in theory. But many organizations face challenges such as voter apathy, lack of technical knowledge, and an overwhelming volume of complex proposals. These barriers can significantly reduce the effectiveness and speed of decision-making.

### Why optimistic governance

Optimistic governance offers a solution to these challenges by assuming that most proposals are approved, unless explicitly veto-ed by delegates otherwise. In this model, the decision-making process is streamlined, with a clear mechanism for delegates or community members to intervene if necessary. This is particularly useful for proposals related to maintenance upgrades, technical changes, or parameter adjustments, which may not require extensive community deliberation, but still need oversight and the ability to veto in the edge case that the proposed changes are malicious.

### Proposed process for optimistic governance

To implement optimistic governance, Tally proposes a structured process designed to balance efficiency with accountability. The process involves several key steps:



1. **Proposal submission**
   1. Proposals are submitted by the proposer using a standardized template
   2. A proposal draft is shared with the community to gather initial feedback and ensure transparency
2. **Due diligence**&#x20;
   1. A review process is conducted to ensure that the proposal meets the necessary criteria, such as technical feasibility and alignment with the organization's goals
   2. This stage may involve verifying the proposal’s technical details, ensuring that any code or assets involved are secure, and confirming that the proposal author is legitimate
3. **Council vote**
   1. A council, consisting of delegates with technical expertise and community representatives, votes on the proposal
   2. If the proposal passes with a sufficient majority (eg: 4 out of 6 members), it proceeds to the next stage
4. **Optimistic veto window**
   1. Following the council vote, a defined veto window opens (typically lasting 7 days), during which any organization member or delegate can cast a veto vote to block the proposal
   2. A veto vote can only cancel the proposal if 2 conditions are met:
      1. The veto turnout meets a quorum threshold, ensuring that the veto process remains representative of the broader community’s stance, **AND**
      2. A majority (eg >50%) of the veto votes are cast. By default, if delegates don’t vote at all, then only veto votes will be captured. If delegates choose to cast ‘Support’ votes, then this condition will only be met if the number of veto votes exceeds the number of support votes
5. **Execution**
   1. If the veto window closes without sufficient opposition, the proposal is executed as originally planned
   2. If the proposal is vetoed, it is canceled, and further revisions may be required before resubmission\


### Implementation

* **Scope limitation:** This process should typically only be reserved for maintenance-related or technical proposals that require timely decisions but do not necessitate lengthy discussions
* **Council composition**: The council is composed of a diverse set of members, balancing technical expertise with community representation. This ensures both competent oversight and broad representation in decision-making
* **Conflict of interest disclosures**: Council members are required to disclose any conflicts of interest that may affect their voting on proposals
* **Transparency**: The entire process is transparent, with regular updates and community access to the proposal lifecycle through public channels

### Modifications from standard OZ Governor setup

* Both Governors could implement a "**Super Quorum**."&#x20;
  * Once a majority votes in favor, the voting ends. The Governor can send the proposal or veto to the timelock immediately
* The Optimistic Governor has the ‘PROPOSER\_ROLE’ role on the timelock
* The Veto Governor has the ‘CANCELLER\_ROLE’ role on the Timelock. The veto Governor's voting period must be shorter than the timelock delay, so that it can cancel proposals in time
* Tally's frontend will need to connect the Veto Governor to the Optimistic Governor

### Next steps

Optimistic governance provides an efficient way to manage routine and technical proposals, enabling a more agile decision-making process while ensuring that the organization retains oversight and accountability.

This approach helps prevent decision-making gridlock while fostering community participation and informed decision-making. \
\
If you're interested in implementing Optimistic governance,?  [Talk to our team to get started](http://tally.xyz/contact).

\
