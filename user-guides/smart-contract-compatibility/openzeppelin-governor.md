---
description: Compatibility considerations when implementing OpenZeppelin governor
---

# OpenZeppelin Governor

To be compatible with the Tally app we recommend you to use OpenZeppelin's library [Governor contract](https://docs.openzeppelin.com/contracts/4.x/api/governance). If you want to implement changes to this base contract, here is the interface that you should follow to make sure your contract works with our app.

### Event signatures

Tally's API listens to event logs from Governor contracts when indexing them. Your contract will need to maintain the same event signatures that OZ Governor implements:

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

### Function signatures

Tally's frontend app helps users make web3 calls to your Governor contract. The app lets users create Proposals as well as vote on, queue and execute them.  In addition, the app reads state from the contract with function calls.&#x20;

To be compatible with Tally, your Governor will need these function signatures:

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

If your OpenZeppelin governor contract uses a Timelock, it will also need this signature:

```
function queue(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
) public virtual override returns (uint256)
```

#### Quorum

Tally needs the quorum to calculate if a proposal has passed. That means that Tally requires the Governor to have a `quorum()` function:

```
function quorum(uint256 blockNumber) public view virtual returns (uint256);
```

**Optionally**, Tally also supports the `quorumNumerator()` and `quorumDenominator()` functions. Governors with quorums that are a function of token supply should implement these functions:

```
function quorumNumerator() public view virtual returns (uint256);
function quorumDenominator() public view virtual returns (uint256);
```

If the Governor is missing either `quorumNumerator()` or `quorumDenominator()`, Tally falls back to the `quorum()` function and assumes that the quorum is fixed.&#x20;

#### Voting Delay

Tally needs to know the voting delay to calculate when voting starts without polling the blockchain. A `votingDelay()` function on Governor is required:

```
function votingDelay() public view virtual returns (uint256);
```

#### Voting Period

Tally needs to know the voting period to calculate when a proposal finishes voting without polling the blockchain. A `votingPeriod()` function on Governor is required:

```
function votingPeriod() public view virtual returns (uint256);
```

### Proposal state lifecycle

Tally's app expects the following proposal states. If your Governor uses a custom proposal lifecycle, those states won't show up correctly on on Tally:

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

### Governor Parameter Changes

Governors can change their own parameters, like proposal times and the amount of voting power required to create and pass proposals. To make sure that Tally indexes your Governor's parameter changes, implement these event signatures:

```
 event VotingDelaySet(uint256 oldVotingDelay, uint256 newVotingDelay);
 event VotingPeriodSet(uint256 oldVotingPeriod, uint256 newVotingPeriod);
 event ProposalThresholdSet(uint256 oldProposalThreshold, uint256 newProposalThreshold);
 event QuorumNumeratorUpdated(uint256 oldQuorumNumerator, uint256 newQuorumNumerator);
```

### Quorum Extension

Tally handles the `ProposalExtended` event, which is emitted by governors that implement the `PreventLateQuorum` extension:

```
event ProposalExtended(uint256 indexed proposalId, uint64 extendedDeadline);
```
