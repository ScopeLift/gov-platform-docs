---
description: How to queue, execute, and cancel proposals
icon: computer-mouse
---

# Execute Proposals

Besides creating and voting on proposals, users can also: queue, execute, and cancel.

Queuing, executing, and canceling proposals can all be accomplished directly from the [proposal-page.md](../../../tally-features/navigating-the-tally-platform/proposal-page.md "mention").

## Queuing and Executing Proposals

{% hint style="warning" %}
_Once voting ends, a proposal is not complete. If a proposal passes, additional steps are required before execution. A successful Governor proposal still needs to be **queued**—if the DAO uses a Timelock—and then **executed**._
{% endhint %}

Once a proposal passes, you can queue and execute it from the same place you voted:

![](https://p434.p1.n0.cdn.getcloudapp.com/items/llugw09k/b6741915-c668-406e-83f1-0de5a6ad0d9c.jpg?v=706969e0024d71df04d581d9add0096e)

### _What does it mean to “queue” a proposal?_

**Queue** prepares a proposal for execution. The queue action sends the proposal to the Timelock contract, which starts the countdown until the proposal can be executed.

Someone needs to call the  `queue()` function because the EVM (Ethereum Virtual Machine) does not support scheduled or automatic calls. Every call must be kicked off by a user.

If a Governor does not have a Timelock, then proposals don’t need to be queued. They can be executed as soon as the proposal passes.

### _Who can queue a proposal?_

Generally, anyone can queue a proposal that has passed! The only exception is that some custom Governor contracts limit who can call `queue()`.

### _How long will the proposal be queued?_

This depends on the Timelock Delay of the Timelock contract. You can check that delay on Etherscan until Tally adds it to the [dao-page.md](../../../tally-features/navigating-the-tally-platform/dao-page.md "mention").

### _What does it mean to “execute” a proposal?_

**Executing** a proposal runs its function calls onchain. Each proposal is associated with one or more function calls, which are visible in the `Executable Code` section of the [Proposal page](../../../tally-features/navigating-the-tally-platform/proposal-page.md). These calls can do things like transfer assets from the treasury, update parameters of the Governor itself, change or upgrade a DeFi protocol, or call another smart contract.

### _Who can execute a proposal?_

Generally, anyone can execute a proposal that has passed! The only exception is when a custom Governor contract limits who can call `execute()`.

{% hint style="info" %}
#### _Sending ETH when executing a proposal_

In some situations it is important to send ETH at the same time as executing a proposal (for example, when paying the Toll for sending a crosschain message to a bridge). In this case, it may be necessary to send ETH as part of the execution of the proposal.
{% endhint %}

## Canceling Proposals

To cancel a proposal, click the three-dot menu to access additional actions. You can also copy the proposal's URL and view contextual information.

<figure><img src="https://p434.p1.n0.cdn.getcloudapp.com/items/E0uRPy90/f9fa4b65-08c5-4f0c-9971-fe7ef4308be8.jpg?v=e790800cb7f502c072447917bd021510" alt=""><figcaption></figcaption></figure>

### _When can a proposal be canceled?_

It depends! There isn’t a standard version of cancel logic across Governor implementations. Governor Alpha, Governor Bravo and OpenZeppelin Governor each have different behavior.

**OpenZeppelin Governor**

OpenZeppelin Governor leaves the cancellation up to the developer implementing the contract. Many DAOs implement a `Canceller` role that gives a list of addresses the power to cancel proposals.

**Governor Alpha**

If the proposer’s voting power drops below the voting threshold, anyone can cancel that proposal.

**Governor Bravo**

Same as Governor Alpha. Also, the proposer can always cancel their proposal.

### _Can a canceled proposal be re-submitted?_

Not if it’s the exact same one. To re-submit a proposal, create a new proposal with the same executable code.
