---
description: Add a DAO to an existing ERC20 token or NFT
---

# Add a DAO to an existing token

**How to add a Governor to a token**

A Governor contract expects a particular interface from its token contract.  [An OpenZeppelin Governor](https://docs.openzeppelin.com/contracts/4.x/api/governance) requires a token contract that implements the [ERC20Votes interface](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Votes) or the [ERC721Votes interface](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#ERC721Votes).&#x20;

If a token may someday be useful for running an on-chain DAO, deploy it with a voting interface for future Governor compatibility! If the token is already deployed and it cannot be upgraded, the best workaround is to deploy a wrapper token contract that adds the voting interface to an existing token.



**How to deploy a wrapper**

Deploy an OpenZeppelin token contract that includes both [ERC20Wrapper](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Wrapper) and [ERC20Votes](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Votes). Then, point the Governor wrapper contract instead of the token contract.

For more information, see [this post from the Tally blog](https://blog.tally.xyz/how-to-add-dao-governance-to-existing-token-contracts-397855f081ac) that walks through the process of deploying a Governor for an existing token.



**UX tradeoffs**

A token wrapper does come with tradeoffs.  Users will have to wrap their tokens to vote, and then unwrap them to use them in places that expect the unwrapped version. They may also be confused about where their token went after wrapping if their wallet doesn’t know about the wrapped version.

One thing to note is that setting up voting already requires setup: token holders have to delegate their votes – even to themselves – before voting. The wrapping step could be combined with delegation to keep the process simpler for tokenholders.



**Why does Governor need the voting interface?**

The \`ERC20Votes\`/\`ERC721Votes\` logic on the token contract is responsible for voting power bookkeeping that can’t be done on another contract. That bookkeeping involves several things: updating voting power when there’s a delegation or transfer, taking a snapshot of the voting power at the start of each proposal, and emitting event logs for indexers whenever there’s a change in delegation or voting power.&#x20;

Each \`transfer()\` and \`delegate()\` call updates the counts of voting power, so that it’s computationally cheap to save a voting power snapshot for a proposal. Governor needs a voting power snapshot to prevent double-voting. It would be too computationally expensive for an external contract like Governor to keep track of which tokens have already voted without a snapshot, because an attacker could move around tokens to vote multiple times with the same token.
