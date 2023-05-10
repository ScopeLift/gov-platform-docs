---
description: Enabling cross-chain governance via your bridge solution
---

# Bridge providers

A growing area of research and development in the Governor ecosystem is around cross-chain governance. Bridges are technology by which users move their tokens between chains, however for the most part Governance tokens such as Uni, Compound, Optimism and others, loose their native governance capabilities once bridged to a new network.&#x20;

The problem is that Governor DAO ERC20 tokens implement the OpenZeppelin [ERC20Votes extension](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC20Votes.sol) that enables checkpointing and delegation, while most bridges only support the creation of vanilla ERC20 tokens, without the `votes` extension. This means that bridged tokens are no longer usable by DAOs for governance.

The solution is simple: when bridging a token that supports the ERC20Votes extension, bridges should also support ERC20Votes when minting tokens on the destination side of the bridge.&#x20;

To learn more about ERC20Votes, see the [OpenZeppelin Documentation](https://docs.openzeppelin.com/contracts/4.x/api/governance) on implementing governance.&#x20;
