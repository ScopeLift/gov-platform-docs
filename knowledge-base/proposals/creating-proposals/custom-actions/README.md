---
description: You can put any onchain action into a Tally proposal using Custom Actions.
---

# Custom Actions

Custom Actions on Tally provide a versatile way to create and manage DAO proposals with complex requirements. These actions enable users to execute a variety of operations within a single proposal. Custom actions include any onchain action that Tally does not have a custom UI for (ex: token transfers).&#x20;

Tally has recipe books for the following custom actions:

* [deploying protocols like Uniswap v3 on new chains](../../../../custom-proposal-actions/chain-deployment-of-uniswap-v3.md)
* [implementing token vesting schemes](../../../../custom-proposal-actions/token-vesting-with-hedgey.md)
* [setting up token grants](../../../../custom-proposal-actions/token-grants-with-hedgey.md)
* [managing streaming payments](../../../../custom-proposal-actions/streaming-payments-with-sablier.md)

Each action involves targeting specific contract addresses, selecting appropriate contract methods, and setting calldata according to the needs of the specific operation being proposed. This flexibility allows for a wide range of governance activities to be conducted seamlessly.

### Using Custom Actions

To include custom actions in your proposal on Tally, enter the _Target contract address_ or upload your ABI file if the contract is not on Etherscan. Select the desired _Contract method_, and enter the call data for that method.

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-12-08 at 10.55.09 pm.png" alt=""><figcaption></figcaption></figure>
