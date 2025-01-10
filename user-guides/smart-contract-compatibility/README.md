---
icon: gear
description: How to make your Token and Governor contract compatible with Tally
---

# Tally Contract Compatibility

Tally supports DAOs on Ethereum, Polygon, Optimism, Arbitrum, Avalanche, Base, Moonbeam, Scroll, BNB Chain, Gnosis, and various testnets.

Tally connects with the on-chain contracts for your DAO in two places. Tally’s servers index the onchain data, and Tally’s web3 site helps users make calls directly to the contracts running on the blockchain.

Here, we describe the interface that your contracts need to follow to be compatible with Tally. The easiest way to be compatible is to fork [Open Zeppelin Governor](https://wizard.openzeppelin.com/) without changing anything.&#x20;

If you do need to change something, check the dependencies here in the docs to make sure that your changes are compatible with Tally’s data indexing and web3 calls.

{% content-ref url="./" %}
[.](./)
{% endcontent-ref %}

{% content-ref url="openzeppelin-governor.md" %}
[openzeppelin-governor.md](openzeppelin-governor.md)
{% endcontent-ref %}

{% content-ref url="../tally-contract-compatibility/compound-governor-bravo.md" %}
[compound-governor-bravo.md](../tally-contract-compatibility/compound-governor-bravo.md)
{% endcontent-ref %}

{% content-ref url="tokens-erc20-and-nfts.md" %}
[tokens-erc20-and-nfts.md](tokens-erc20-and-nfts.md)
{% endcontent-ref %}

{% content-ref url="supported-use-cases-faq.md" %}
[supported-use-cases-faq.md](supported-use-cases-faq.md)
{% endcontent-ref %}
