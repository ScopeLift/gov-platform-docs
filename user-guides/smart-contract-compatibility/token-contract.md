---
description: >-
  Compatibility considerations when implementing the token contract that will
  work with your governance.
---

# Token contract

### Events signatures

```
event DelegateVotesChanged(
    address indexed delegate, 
    uint previousBalance, 
    uint newBalance
);
event DelegateChanged(
    address indexed delegator, 
    address indexed fromDelegate, 
    address indexed toDelegate
);
event Transfer(
    address indexed from, 
    address indexed to, 
    uint256 amount
);
```

### Functions signatures

Your token contract should implement these functions, if you are using an ERC20 token, you can use the ERC20Votes or the ERC20VotesComp extensions from the OpenZeppelin library to add these to your contract.

If you're using an ERC71 you will need a custom implementation that uses the events signatures mentioned above and these functions signatures or do something similar to what Nouns DAO did with their [ERC721Checkpointable](https://github.com/withtally/my-nft-dao-project/blob/main/contracts/ERC721Checkpointable.sol) contract.

```
function delegate(address delegatee)
function delegateBySig(
    address delegatee, 
    uint nonce, 
    uint expiry, 
    uint8 v, 
    bytes32 r, 
    bytes32 s
)
function getVotes(address account) public view returns (uint256)
```
