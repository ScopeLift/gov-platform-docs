---
description: When can a proposal be canceled?
---

# Canceling Proposals

## When can a proposal be canceled?

It depends! There isn’t a standard version of cancel logic across Governor implementations. Governor Alpha, Governor Bravo and OpenZeppelin Governor each have different behavior.

**OpenZeppelin Governor**

OpenZeppelin Governor leaves the cancellation up to the developer implementing the contract. Many DAOs implement a `Canceller` role that gives a list of addresses the power to cancel proposals.

**Governor Alpha**

If the proposer’s voting power drops below the voting threshold, anyone can cancel that proposal.

**Governor Bravo**

Same as Governor Alpha. Also, the proposer can always cancel their proposal.

## Can a canceled proposal be re-submitted?

Not if it’s the exact same one. To re-submit a proposal, create a new proposal with the same executable code.

## Canceling proposals on Tally

{% content-ref url="../proposals/manage-a-proposal.md" %}
[manage-a-proposal.md](../proposals/manage-a-proposal.md)
{% endcontent-ref %}
