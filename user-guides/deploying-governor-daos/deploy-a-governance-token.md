---
description: Include ERC20Votes to future-proof a token for on-chain governance
---

# Deploy a governance token

If you are deploying a token that might govern a DAO in the future, you'll want to include voting checkpoints. It's easy and safe to add them up front. It's much harder to upgrade or wrap the token to add them later.

### How to deploy a compatible token

Deploy your token with [EIP-5805 compatibility](https://eips.ethereum.org/EIPS/eip-5805). That way, Governor contracts can call the voting methods,  \`getVotes\` and \`getPastVotes\`.

[OpenZeppelin's ERC20Votes extension](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC20Votes.sol) is a canonical implementation of EIP-5805.  [OpenZeppelin Governor](https://blog.openzeppelin.com/governor-smart-contract/) and custom Governor contracts use the extension to calculate voting power.

{% hint style="info" %}
[Learn more about Governor](../../knowledge-base/tally/governor-framework.md), the leading DAO smart contact setup.
{% endhint %}

### Deploying a token with voting is safe and easy

Open Zeppelin's ERC20Votes extension is safe and self-contained. It has been audited and is currently deployed in thousands of token contracts.

The main tradeoff is gas usage. Fortunately, users can make that decision themselves.&#x20;

Users can choose to activate their voting power by delegating it to themselves or others. \`transfers\` by delegated tokens also updates voting power. That update uses extra gas. Users who do a lot of transfers can always undelegate their tokens to save gas.
