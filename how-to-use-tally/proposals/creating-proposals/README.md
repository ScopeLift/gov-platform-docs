---
description: Take action in your DAO by initiating an onchain proposal on Tally.
icon: box-ballot
---

# Create proposals



{% embed url="https://youtu.be/zpdi5We7mpE" %}

To submit an onchain proposal, you must have sufficient voting power to meet the DAO's Proposal threshold. This figure can be found on each DAO Page by expanding the Contract Parameters section near the top of the page.

![](https://p434.p1.n0.cdn.getcloudapp.com/items/Wnu7L511/62adb73a-14cf-43fc-a2ec-f18d81da37fd.jpg?v=41fa4940cdd4058e9c1c5300247c9fab)

### Create a Proposal

Visit the [DAO Page](broken-reference) of the DAO you'd like to create a proposal for, then click the **Create new proposal** button at the top of the page.

![](<../../../.gitbook/assets/Screenshot 2023-08-25 at 2.10.18 pm.png>)

If you haven't yet connected your wallet, Tally will prompt you to do so. Most governance frameworks require a proposal threshold - a minimum amount of voting power - to create a proposal. Make sure you connect with the tokens required to create a proposal in it. Then click **Continue**.

![](https://p434.p1.n0.cdn.getcloudapp.com/items/X6uRgGj2/bc81b614-618f-4326-a7b9-23c5cf49ec82.jpg?v=7aaf60e7686ab39166e3773b184fa759)

Enter a _Title_ for your proposal, then add a **Description**. Explain the intent behind the proposal and include any helpful context for the voters.&#x20;

<figure><img src="../../../.gitbook/assets/Screenshot 2023-12-08 at 7.11.35 pm.png" alt=""><figcaption><p>You can also paste images into the description box!</p></figcaption></figure>

Add actions to be executed if the proposal passes. You can select Tally's **Transfer Tokens** recipe for a proposal that calls for the transfer of tokens, or select the **Custom Action** button.

_Note:_ _Governor Alpha/Bravo has a limit of 10 actions. There is no limit for OpenZeppelin Governor._

<figure><img src="../../../.gitbook/assets/Screenshot 2023-12-08 at 7.15.10 pm.png" alt=""><figcaption></figcaption></figure>

If you choose the Transfer tokens recipe, enter the Target wallet address, select the Token you would like to transfer, and enter the Value of the token you would like to transfer. Enter a Memo to describe the purpose of the transfer, and optionally, upload a Media image such as an invoice. Tally will populate an infographic as a preview of the recipe.

For a Custom action, enter the Target contract address or upload your ABI file if the contract is not on Etherscan. Select the desired Contract method, and enter the call data for that method.

Actionless Proposals: If you choose to skip this step, and create a proposal with no actions, a transfer of 0 ETH to you (the proposer) will be added, as Governor requires one executable action for the proposal to be submitted onchain.

Preview your proposal, then select Save draft or Publish. If you're ready to submit the proposal onchain, you'll also need to sign the transaction to the chain using your wallet. Draft proposals are created offchain and can later be submitted onchain at any time. Draft proposals can be created and submitted by different users.

<figure><img src="../../../.gitbook/assets/Screenshot 2023-12-08 at 7.17.22 pm.png" alt=""><figcaption></figcaption></figure>

## Running Proposal Simulations

Having successful validations will give proposers, voters, and executors confidence that the proposal is valid. The Proposal Simulations feature is currently in beta and runs via the Tenderly Simulator API. Tally simulates the execution of the proposal assuming it is successful and queued on a fork of your DAO's network. From there, Tally runs each executable payload, impersonating the treasury (usually the timelock).

When creating a proposal on Tally, the API will automatically run a simulation for the executable payload provided. You can view the result of this simulation in the Executable code tab of the proposal details. Each function will have its own result.

![](https://p434.p1.n0.cdn.getcloudapp.com/items/d5uyw5Xz/28394171-2a60-43c8-83c8-503bde80b849.jpg?v=69e726e7f4645e69d2748c4be5e6410d)

If one function fails, it is likely that the proposal execution will fail. If the function failed, click View raw result to inspect the response from the Tenderly Simulator API for additional insights. If the function fails or in cases when state changes may impact the success of a function, you may also want to re-run the simulation of the proposal.

For example, a DAO proposes to transfer 1 ETH to an address, but their treasury has 0 ETH. As you might expect, the simulation result fails. From there, the DAO funds their treasury with 2 ETH; click Re-run to re-simulate the proposal. You should now expect a successful proposal!
