---
description: What does it mean to queue and execute a proposal?
---

# Queueing and Executing Proposals

{% hint style="warning" %}
_Once voting ends, a proposal is not done! If a proposal passed, there are still more steps to take before it’s executed. A successful Governor proposal still needs to be **queued**—if the DAO uses a Timelock—and then **executed**._
{% endhint %}

## What does it mean to “queue” a proposal?

**Queue** prepares a proposal for execution. The queue action sends the proposal to the Timelock contract, which starts the countdown until the proposal can be executed.

Someone needs to call the  `queue()` function because the EVM (Ethereum Virtual Machine) does not support scheduled or automatic calls. Every call must be kicked off by a user.

If a Governor does not have a Timelock, then proposals don’t need to be queued. They can be executed as soon as the proposal passes.

## Who can queue a proposal?

Generally, anyone can queue a proposal that has passed! The only exception is that some custom Governor contracts limit who can call `queue()`.

## How long will the proposal be queued?

This depends on the Timelock Delay of the Timelock contract. You can check that delay on Etherscan until Tally adds it to the [DAO page](../navigating-the-tally-platform/dao-page.md).

## What does it mean to “execute” a proposal?

**Executing** a proposal runs its function calls on-chain. Each proposal is associated with one or more function calls, which are visible in the `Executable Code` section of the [Proposal page](../navigating-the-tally-platform/proposal-page.md). These calls can do things like transfer assets from the treasury, update parameters of the Governor itself, change or upgrade a DeFi protocol, or call another smart contract.

## Who can execute a proposal?

Generally, anyone can execute a proposal that has passed! The only exception is when a custom Governor contract limits who can call `execute()`.

{% hint style="info" %}
#### _Sending ETH when executing a proposal_

In some situations it is important to send ETH at the same time as executing a proposal (for example, when paying the Toll for sending a cross chain message to a bridge). In this case, it may be necessary to send ETH as part of the execution of the proposal.
{% endhint %}

## Queueing and executing proposals on Tally

{% content-ref url="../proposals/manage-a-proposal.md" %}
[manage-a-proposal.md](../proposals/manage-a-proposal.md)
{% endcontent-ref %}
