---
description: Tally enables crosschain governance with Advanced Execution.
---

# Advanced Execution

> _Advanced execution refers to the execution of actions specified in a proposal as soon as it is passed._

### Basic Execution vs Advanced Execution&#x20;

In a basic execution scenario, a proposal, once approved by the DAO members, would need to be manually executed by someone, usually a DAO member or a designated executor. This manual step can introduce delays and is dependent on human intervention.

On the other hand, advanced execution involves setting up smart contracts and automated processes to execute the actions specified in a proposal as soon as it is approved. This can include sending funds to a specified address, but can also involve more complex actions such as interacting with other smart contracts, triggering certain functions, or even a series of actions that need to be executed in a specific order.

### Use Cases

One common use case for advanced execution involves interacting with a cross-chain bridge in a situation where the exact cost of the transaction is not known in advance. For example, a DAO may have a timelock contract that currently has no funds in it, and they need to send an instruction to a cross-chain bridge. However, the bridge charges a fee for moving messages from one blockchain to another, and the exact cost of this fee is not known until the transaction is executed. As a result, it is not possible to specify the fee when creating the proposal.

In such scenarios, advanced execution can be extremely useful as it allows the DAO to write the smart contract code in such a way that the necessary funds (e.g., ETH) can be sent to the execute function at the time of execution, which then gets forwarded to the timelock contract, and ultimately to the final destination (the cross-chain bridge).

### How does this work?

Advanced execution works by allowing the smart contract underlying a proposal to include more sophisticated logic and actions that can be executed automatically once the proposal is approved.

In the example above, the smart contract code for the proposal could be written to include a function that sends ETH to the `execute`  function of the contract. This ETH would then be forwarded to the timelock contract, and then to the final destination (the cross-chain bridge). This way, even though the exact fee for the cross-chain bridge is not known at the time of creating the proposal, the necessary funds can still be sent at the time of execution.

### How to use Advanced Execution

When a proposal is created, then you can enter some ETH value to send in the Custom Action’s recipe.

To use advanced execution, you need to include the necessary logic and actions in the smart contract code underlying the proposal.

When creating a proposal, you can specify the amount of ETH (or any other token) to be sent as part of the Custom Action’s recipe. This is the set of instructions that will be executed if the proposal is approved.

For example, you could specify that a certain amount of ETH should be sent to the execute function of the contract as part of the Custom Action’s recipe. This ETH would then be forwarded to the timelock contract and then to the final destination as specified in the smart contract code.
