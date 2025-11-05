---
description: Include ERC20Votes to future-proof a token for onchain governance
icon: wand-magic-sparkles
---

# Deploy a Governor with a new token

If you are deploying a token that might govern a DAO in the future, include voting methods. It's easy and safe to add them up front. It's much harder to upgrade or wrap the token to add them later.

### How to deploy a compatible token

Deploy your token with [EIP-5805 compatibility](https://eips.ethereum.org/EIPS/eip-5805). That means providing voting methods, `getVotes` and `getPastVotes`. Governors can call those voting methods when counting votes on proposals.

[OpenZeppelin's ERC20Votes extension](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC20Votes.sol) is a canonical implementation of EIP-5805. [OpenZeppelin Governor](https://blog.openzeppelin.com/governor-smart-contract/) – or a custom Governor contract – uses the extension to calculate voting power.

{% hint style="info" %}
[Learn more about Governor](broken-reference), the leading DAO smart contact setup.
{% endhint %}

### Deploying a token with voting is safe and easy

Open Zeppelin's ERC20Votes extension is safe and self-contained. It has been audited and is currently deployed in thousands of token contracts.

The main tradeoff is gas usage. Fortunately, users can make that decision themselves.&#x20;

Users can choose to activate their voting power by calling `delegate`. When an account is delegated, `transfers` will also update voting power. That update uses extra gas. Users who do a lot of transfers can always undelegate their tokens to save gas by delegating to the zero address.
