---
description: Governing protocols on multiple chains
icon: link
---

# MultiGov

Tally has partnered with [Wormhole](https://wormhole.com/) on MultiGov, which powers multichain governance for organizations. &#x20;

## **What is Multichain Governance?**

Your organization, everywhere. MultiGov lets organizations meet token holders where they are. organization members can govern an on-chain organization from any chain. MultiGov supports organizations on Solana, Ethereum and EVM-compatible L2s. Multichain organizations will lower barriers to participation and reach users everywhere.

### **Single-chain vs MultiGov**

Until now, organizations operated their governance on a single chain.

_On L1_

Many of the oldest and largest organizations have their token, Governor and treasury all on Ethereum mainnet. Rising L1 gas costs make that setup increasingly expensive. MultiGov gives voters a way to lower gas costs.

_On a single L2_

Newer protocol organizations might launch on one network. Once they find product-market fit there, they often want to expand to other ones. MultiGov gives protocols a way to meet users where they are.

### _Benefits of MultiGov:_

* Save on gas costs
* Govern protocol across chains
* Meet community where they are
* organization can follow the protocol to new networks

### **Implementation: the hub-and-spoke model**

MultiGov organizations use a hub-and-spoke model. This model combines well-understood building blocks – governor, token bridges, and message-passing.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXf9y23qa92tXynFJEFYf2mkPciluPRl2bokIyFGg-6l1ZYiqluurJslF4r_5uHTtGkf2_NkUZMn4CDl-0jqg-wYj3UF8ONyjCbaNfsACsO8Bfy1anlQISxev8oOxha6MkOteTJd?key=AwOyyJTVZW0WAjn_zFwnD4lF" alt=""><figcaption></figcaption></figure>

On the "hub" chain, the organization has a standard [ERC20Votes token](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC20Votes.sol) and [OpenZeppelin Governor](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/governance) with the [Flexible Voting extension](https://flexiblevoting.com/). The hub can be any supported EVM chain. Tokenholders can choose bridge their hub governance tokens to spoke chains.

On each "spokes" of a MultiGov organization, there's a bridged gov token and a spoke Governor. The bridged gov token keeps track of voting power on that chain. When there is a proposal, the voters on that spoke chain vote on a spoke Governor. Votes on each spoke Governor can be aggregated and bridged back to the hub chain.

To learn more about how organizations can use MultiGov, watch Tally CTO Raf Solari’s ETH Denver 2024 talk on Multichain organizations [here.](https://twitter.com/tallyxyz/status/1762609578863198698)

### **Wormhole**

Wormhole, powered by $W token holders, will be the first to use this pioneering multichain governance system. Wormhole's organization will enable token holders on any supported chain to engage in the governance process. This approach to governance will enhance the user experience, making community contributions easier.



Interested in implementing MultiGov for your protocol?  [Talk to our team to get started](http://tally.xyz/contact).

<br>
