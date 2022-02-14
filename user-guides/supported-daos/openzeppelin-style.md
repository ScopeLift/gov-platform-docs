---
description: Compatibility considerations when implementing OpenZeppelin governor
---

# OpenZeppelin Style

To be compatible with the Tally app we recommend you to use OpenZeppelin's library [Governor contract](https://docs.openzeppelin.com/contracts/4.x/api/governance). If you want to implement changes to this base contract these are the things you should keep in mind.

### Events signatures

Please maintain the event signatures that OZ Governor implements, we use these to index the data needed from your governance.

```
event ProposalCreated(
    uint256 proposalId,
    address proposer,
    address[] targets,
    uint256[] values,
    string[] signatures,
    bytes[] calldatas,
    uint256 startBlock,
    uint256 endBlock,
    string description
);
event ProposalCanceled(uint256 proposalId);
event ProposalExecuted(uint256 proposalId);
event VoteCast(
    address indexed voter, 
    uint256 proposalId, 
    uint8 support, 
    uint256 weight, 
    string reason
);
```

### Functions signatures

These are the functions signatures that cannot change:

```
function votingDelay() public view virtual returns (uint256);
function votingPeriod() public view virtual returns (uint256);
function quorum(uint256 blockNumber) public view virtual returns (uint256);
function proposalThreshold() public view virtual returns (uint256);
function state(uint256 proposalId) public view virtual override returns (
    ProposalState
);

function getVotes(
    address account, 
    uint256 blockNumber
) public view virtual returns (uint256);

function propose(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    string memory description
) public virtual returns (uint256 proposalId);

function execute(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
) public payable virtual returns (uint256 proposalId);

function castVote(
    uint256 proposalId, 
    uint8 support
) public virtual returns (uint256 balance);

function castVoteWithReason(
    uint256 proposalId,
    uint8 support,
    string calldata reason
) public virtual returns (uint256 balance);

function castVoteBySig(
    uint256 proposalId,
    uint8 support,
    uint8 v,
    bytes32 r,
    bytes32 s
) public virtual returns (uint256 balance);
```

If your OpenZeppelin governor contract implements a timelock, this function signature also needs to be maintained:

```
function queue(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
) public virtual override returns (uint256)
```

### Proposal state lifecycle

We support the following states during the proposal lifecycle if your governance uses different states from these it won't work on Tally:

```
enum ProposalState {
    Pending,
    Active,
    Canceled,
    Defeated,
    Succeeded,
    Queued,
    Expired,
    Executed
}
```
