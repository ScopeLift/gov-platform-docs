---
description: How to make your Token and Governor contract compatible with Tally
icon: check
---

# Check for token contract compatibility

Tally supports organizations on Ethereum, Polygon, Optimism, Arbitrum, Avalanche, Base, Moonbeam, Scroll, BNB Chain, Gnosis, and various testnets.

Tally connects with the on-chain contracts for your organization in two places. Tally’s servers index the on-chain data, and Tally’s web3 site helps users make calls directly to the contracts running on the blockchain.

Here, we describe the interface that your contracts need to follow to be compatible with Tally. The easiest way to be compatible is to use the [Open Zeppelin Wizard](https://wizard.openzeppelin.com/) to deploy a governance token and governor&#x20;

If you do need to change something, check that your contracts implement the methods and event logs in the sections below to make sure that your changes are compatible with Tally’s data indexing and transaction calls.

{% content-ref url="tokens-erc20-and-nfts.md" %}
[tokens-erc20-and-nfts.md](tokens-erc20-and-nfts.md)
{% endcontent-ref %}

{% content-ref url="openzeppelin-governor.md" %}
[openzeppelin-governor.md](openzeppelin-governor.md)
{% endcontent-ref %}

{% content-ref url="compound-governor-bravo.md" %}
[compound-governor-bravo.md](compound-governor-bravo.md)
{% endcontent-ref %}

{% content-ref url="/broken/pages/GHXQ6k3biAumJ9XZPY3Z" %}
[Broken link](/broken/pages/GHXQ6k3biAumJ9XZPY3Z)
{% endcontent-ref %}

{% content-ref url="supported-use-cases-faq.md" %}
[supported-use-cases-faq.md](supported-use-cases-faq.md)
{% endcontent-ref %}
