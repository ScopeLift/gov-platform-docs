---
description: Ensure cross-chain governance with ERC20Votes Extension.
hidden: true
---

# Bridge Providers

### Problem Statement

Cross-chain bridges enable token transfers between different blockchain networks. While effective for the basic ERC20 tokens, these bridges present a significant limitation for governance tokens that implement OpenZeppelin's [ERC20Votes extension](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/9a2e4cb3a71326bc91a177f7b1f184448ccc799f/contracts/token/ERC20/extensions/ERC20Votes.sol). As a result, governance tokens, once bridged, lose their inherent governance capabilities, significantly undermining their utility in Decentralized Autonomous Organizations (DAOs).

### Technical Overview of ERC20Votes Extension

Governance tokens issued by many DAOs, such as Uni, Compound, and Optimism, utilize the OpenZeppelin ERC20Votes extension. This extension enhances the standard ERC20 token capabilities by enabling voting checkpointing and delegation.

The checkpointing feature allows the contract to track the historical balance of each token holder. The delegation feature enables token holders to delegate their voting rights to others. These functionalities are integral for facilitating token holder participation in the DAO's decision-making process.

### Issue with Current Bridge Technologies

The current bridging technologies primarily support the transfer of basic ERC20 tokens. When a governance token implementing the ERC20Votes extension is bridged to a new network using these technologies, it is reduced to a vanilla ERC20 token. Although the token retains its economic value, it loses the voting checkpointing and delegation functionalities associated with the ERC20Votes extension, becoming effectively useless for DAO governance on the destination network.

### Proposed Solution

To address this issue, a modification in the bridging process is necessary. Specifically, when bridging a token that supports the ERC20Votes extension, bridges should also support the creation of tokens compatible with ERC20Votes on the destination network. This change would ensure that the governance capabilities of the tokens are preserved when they're bridged across networks.

The technical implementation would require:

1. **Detection of ERC20Votes Extension:** The bridge should implement a mechanism to detect whether the token being bridged implements the ERC20Votes extension.
2. **Support for ERC20Votes in Token Creation:** If the bridged token implements the ERC20Votes extension, the bridge should create a corresponding token on the destination network that also supports this extension. This process will preserve the governance functionalities of the token.

By implementing this solution, we can ensure that DAO governance mechanisms remain functional across multiple chains, leading to a more interoperable cross-chain governance ecosystem.

Note: The ERC20Votes extension does not track voting power until an address holding the token has elected to start delegating their voting power, either to themselves or another address. This means that using the ERC20Votes extension has no gas cost overhead for users who are not interested in using the token for governance purposes. [Learn more](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/9a2e4cb3a71326bc91a177f7b1f184448ccc799f/contracts/token/ERC20/extensions/ERC20Votes.sol#L22-L23).

For further technical details of implementing [ERC20Votes](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/9a2e4cb3a71326bc91a177f7b1f184448ccc799f/contracts/token/ERC20/extensions/ERC20Votes.sol), we recommend referring to the [OpenZeppelin Documentation](https://docs.openzeppelin.com/contracts/4.x/api/governance). Through a collective effort to integrate the ERC20Votes extension into bridge mechanisms, we can effectively address the governance token bridging problem.
