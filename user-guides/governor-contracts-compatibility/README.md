---
description: >-
  What do your governance contracts need to maintain in order to be compatible
  with the Tally app?
---

# Governor contracts compatibility

If you want to learn about adding your DAO to Tally, you’re in the right place. Tally connects with the on-chain contracts for your DAO in two places. Tally’s servers index the on-chain data, and Tally’s web3 site lets users make calls directly to the contracts running on the blockchain.&#x20;

Here, we describe the interface that your contracts need to follow to be compatible with Tally. The easiest way to be compatible is to fork Open Zeppelin Governor or Compound’s Governor Bravo without changing anything.&#x20;

If you do need to change something, check the dependencies here in the docs to make sure that your changes are compatible with Tally’s data indexing and web3 calls.

{% content-ref url="openzeppelin-style.md" %}
[openzeppelin-style.md](openzeppelin-style.md)
{% endcontent-ref %}

{% content-ref url="compound-bravo-style.md" %}
[compound-bravo-style.md](compound-bravo-style.md)
{% endcontent-ref %}

{% content-ref url="token-contract.md" %}
[token-contract.md](token-contract.md)
{% endcontent-ref %}

{% content-ref url="supported-use-cases-faq.md" %}
[supported-use-cases-faq.md](supported-use-cases-faq.md)
{% endcontent-ref %}
