---
description: Best practices to ensure efficiency, security, and transparency.
---

# Running an On-Chain DAO Using OpenZeppelin Governor

> _Decentralized Autonomous Organizations (DAOs) have emerged as a powerful way to manage and govern decentralized projects. OpenZeppelin Governor is a popular smart contract framework that provides a robust and secure foundation for building on-chain DAOs on Ethereum. These best practices will help ensure your DAO's efficiency, security, and transparency._

## 1. Use the latest version of OpenZeppelin Contracts

[OpenZeppelin Contracts](https://www.openzeppelin.com/contracts) is a library of secure and community-vetted smart contracts that provides building blocks for implementing your DAO. Always use the latest version of the library to ensure you have the most up-to-date security patches and features.

## 2. Customize the OpenZeppelin Governor contract

OpenZeppelin Governor is a modular and upgradeable smart contract. Customize it to suit your DAO's requirements by modifying or extending the contract. Choose the right quorum and voting mechanisms, as well as define custom actions or permissions such as the ability to cancel a proposal.&#x20;

## 3. Token Distribution

The quality of your DAO community will only be as good as its participants, so ensuring a good token distribution at the start is key to success. Depending on your DAO’s purpose, work to ensure long term alignment with token holders. Ways to do this might include a distribution heavily weighted towards users with tangible contributions to the DAO, or starting with an initially non-transferable token to prevent short term financial speculation.

## 4. Set reasonable proposal and voting durations

Define proposal and voting durations that strike a balance between providing ample time for participants to review and vote on proposals, while ensuring the DAO can operate efficiently. Consider using Timelock Controller to enforce time restrictions on proposal execution.

## 5. Encourage delegation and holding delegates accountable

One of the most successful differentiating features of the Governor framework is the ability for voters to delegate their vote to other addresses. Delegation is a powerful way to reward engaged, committed voters with a greater voice in your DAO.  To ensure a healthy delegate system, it’s important to enforce community norms around delegation and holding delegates accountable. If your DAO distribution comes from an initial airdrop, it’s highly recommended that users are required to delegate to either themselves or others in order to claim tokens.&#x20;

## 6. Maintain clear and accessible documentation

Provide clear and up-to-date documentation for your DAO, including the governance process, smart contract functionality, and any customizations. Accessible documentation enables a more inclusive and informed community of participants.

## 7. Monitor and learn from other DAOs

Stay informed of the latest developments in the DAO ecosystem and learn from other projects' successes and challenges. Continuously iterate and improve your DAO's governance based on lessons learned from the broader community.

\
