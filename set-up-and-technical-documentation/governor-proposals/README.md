---
description: Standards for interacting with onchain Governor Proposals
hidden: true
icon: pen-to-square
---

# Governor Proposal Standards

Governor DAOs are smart contract accounts, which means they have the capability to make any on-chain call that a wallet or externally-owned account can. This flexibility is crucial for the integration of third-party applications with the Governor. This section will provide a detailed guide on how to integrate third-party apps with the Governor, ensuring seamless interaction and functionality.

### Integration Process&#x20;

Understand the Governor Contract: Before integrating a third-party app, it is essential to have a thorough understanding of the Governor contract, its functions, and its capabilities. The Governor contract is responsible for creating and managing proposals, as well as executing approved proposals.

1. **Identify the functions of the third-party app that need to be integrated with Governor.** These functions could include creating proposals, voting on proposals, or executing approved proposals.
2. **Develop an interface that will allow the third-party app to interact with the Governor contract.** This interface should include functions that allow the app to create proposals, vote on proposals, and execute approved proposals.
3. **Rigorously test the integration in a safe environment, such as a testnet.** This will ensure that it works as expected and does not have any security vulnerabilities.
4. **Deploy.**

### Considerations for Integration&#x20;

* **Security:** Ensure that the integration does not introduce any security vulnerabilities and that all interactions with the Governor contract are secure.
* **Gas Efficiency:** Ensure that the integration is optimized for gas usage to minimize costs.
* **Compatibility:** Ensure that the integration is compatible with the existing functions and capabilities of the Governor contract
* **Upgradability:** Design the integration in such a way that it can be easily upgraded in the future to accommodate changes in the Governor contract or the third-party app.

{% content-ref url="whats-the-standard-for-governor-proposal-descriptions.md" %}
[whats-the-standard-for-governor-proposal-descriptions.md](whats-the-standard-for-governor-proposal-descriptions.md)
{% endcontent-ref %}
