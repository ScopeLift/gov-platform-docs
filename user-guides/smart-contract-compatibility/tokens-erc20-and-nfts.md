---
description: >-
  Compatibility considerations for an ERC20 or ERC721 token contract that will
  work with on-chain governance.
---

# Tokens: ERC20 and NFTs

### Events signatures



Tally's API listens to event logs from token contracts when indexing them. Your token contract will need to maintain the same event signatures:

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
```

Your contract will need to support transfer events, too.  Tally works with both ERC20 transfer events and ERC721 events.

ERC20:

```
event Transfer(
    address indexed from, 
    address indexed to, 
    uint256 amount
);


```

ERC721:

```
  event Transfer(
    address indexed from, 
    address indexed to, 
    uint256 indexed tokenId
);
```



### Function signatures

Your token contract also needs to implement voting and delegation functions. If you are using an ERC20 token, you can use the [`ERC20Votes`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC20Votes.sol) or the [`ERC20VotesComp`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC20VotesComp.sol) extensions from the OpenZeppelin token contracts library.

If you're using an ERC71 token, you can use OpenZeppelin's draft [`ERC721Votes`](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC721/extensions) extension.

The Tally frontend helps users make these function calls to delegate their votes:

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
function getVotes(address account) uint256
function name() string
function symbol() string
```
