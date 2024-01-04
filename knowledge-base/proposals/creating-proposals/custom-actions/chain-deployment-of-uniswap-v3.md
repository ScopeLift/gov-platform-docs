---
description: Learn how to propose deploying Uniswap v3 on a fresh EVM chain using Tally.
---

# Chain Deployment of Uniswap v3

You can make a proposal on Tally to deploy Uniswap v3 on a fresh EVM chain.

The first step of launching Uniswap V3 on a fresh EVM chain is to deploy the smart contracts that comprise the protocol. To simplify this process, Uniswap Labs has devised deployment scripts and management CLI, ensuring a smooth rollout of the required contracts onto a new EVM chain.&#x20;

Simply set up and fund a deployment account to cover the gas charges (estimating 40-50M gas). Then, execute a single command within the CLI. This will sequentially deploy each contract, marking checkpoints that can be rolled back if complications arise.

## How to make a proposal to deploy Uniswap v3 on a fresh chain

Make a proposal on Tally using Custom Actions.

* **Target contract address:** 0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41 (the public ENS resolver address)
* **Contract method:** setText
* **Calldatas:**
  * **node:** 0x0b9638d2c5bd4528d603562a1fa1e734fe1b88e680f448d779531e9bc2b55f12 (the hash of v3deployments.uniswap.eth)
  * **key:** network key of chain you're deploying to&#x20;
  * **value:** address of v3 factory on that network

<figure><img src="../../../../.gitbook/assets/telegram-cloud-photo-size-1-5048850042496068615-y (1).jpg" alt=""><figcaption><p>You will need to fill in the three calldatas according to which chain you are deploying Uniswap v3 on.</p></figcaption></figure>

Resources

* [Uniswap v3 Deployment Script](https://github.com/Uniswap/deploy-v3)
* [This example](https://github.com/uniswapfoundation/governance-seatbelt/blob/main/sims/change-celo-text-record.sim.ts) of Uniswap v3 deployment on Celo
* [Uniswap Crosschain Deployment Guide](https://gov.uniswap.org/t/cross-chain-deployment-guide/19988)
* [Uniswap v3 New Chain Deployments](https://github.com/Uniswap/v3-new-chain-deployments)
* [Chainlist](https://chainlist.org/) for ChainIDs
