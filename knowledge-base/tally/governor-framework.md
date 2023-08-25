---
description: Tally is a frontend for Governor contracts.
---

# Governor Framework

> _Governor is the DAO standard. The Governor contract is battle-tested, audited and trusted by DAOs like ENS, Uniswap and Compound. Supported by OpenZeppelin, it’s modular, composable and extensible._

## What is Governor?

DAOs typically use [DAO governance frameworks](https://blog.tally.xyz/a-pocket-guide-to-dao-frameworks-8d7ad5af3a1b) to empower token or NFT holders with direct control over treasuries, protocols, or smart contracts. Tally supports [OpenZeppelin Governor](../../user-guides/smart-contract-compatibility/openzeppelin-governor.md), the most popular DAO governance framework.&#x20;

The Governor contract pattern, a widely adopted open-source smart contract, enables token holders to exercise control over a DAO through fully onchain voting. Token holders use Governor to make, pass and execute proposals.&#x20;

These proposals can encompass a wide range of onchain actions, including disbursing funds from a treasury, adjusting parameters of a DeFi protocol, altering permissions of sub-DAOs, minting NFTs, or even modifying the rules of the Governor contract itself.

## What is a token contract?

A token contract is a prerequisite for a Governor contract. It supplies the Governor with the voting power associated with different addresses. Tally supports Governors that operate with both token contracts (ERC20) and NFT contracts (ERC721).

## Why do DAOs use Governor?

The main benefit of the Governor pattern is that the DAO's decision-making happens completely onchain. This means that token voters don’t need to trust a third party to count their votes or to execute their transactions. Instead, the smart contract autonomously manages these processes on the blockchain, ensuring a trustless and transparent governance system.

## Is Governor customizable?

Yes! Tally's application requires a specific interface (Governor), but it offers considerable flexibility within that framework. OpenZeppelin's version has several different modules, and their  [deployment wizard](https://wizard.openzeppelin.com/) allows for full customization of the code. If you make changes to the contract, you can test them on Tally by deploying to a testnet.

To learn more about how to deploy a Governor, head over to [deploying-daos](../../user-guides/deploying-daos/ "mention").

If you're curious about which modifications will be compatible with Tally, please refer to[smart-contract-compatibility](../../user-guides/smart-contract-compatibility/ "mention").
