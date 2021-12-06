---
description: Compatibility considerations when implementing Compound bravo governor
---

# Compound Bravo Style

To be compatible with the Tally app using a [Compound bravo](https://github.com/compound-finance/compound-protocol/blob/master/contracts/Governance/GovernorBravoDelegate.sol) governance If you want to implement changes to this base contract these are the things you should keep in mind.

### Events signatures

Please maintain the event signatures that Compound bravo governor implements, we use these to index the data needed from your governance.

```
event ProposalCreated(
    uint id, 
    address proposer, 
    address[] targets, 
    uint[] values, 
    string[] signatures, 
    bytes[] calldatas, 
    uint startBlock, 
    uint endBlock, 
    string description
);

event VoteCast(
    address indexed voter, 
    uint proposalId, 
    uint8 support, 
    uint votes, 
    string reason
);

event ProposalCanceled(uint id);
event ProposalQueued(uint id, uint eta);
event ProposalExecuted(uint id);
```

### Functions signatures

These are the functions signatures that cannot change:

```
function castVote(uint proposalId, uint8 support) external
function castVoteWithReason(
    uint proposalId, 
    uint8 support, 
    string calldata 
    string reason
) external

function castVoteBySig(
    uint proposalId, 
    uint8 support, 
    uint8 v, 
    bytes32 r, 
    bytes32 s
) external

function state(uint proposalId) public view returns (ProposalState)

function propose(
    address[] memory targets, 
    uint[] memory values, 
    string[] memory signatures, 
    bytes[] memory calldatas, 
    string memory description
) public returns (uint)

function execute(uint proposalId) external payable
function queue(uint proposalId) external
function cancel(uint proposalId) external
```

### State variables

The Tally app need access to the public getters of these state variables.

```
uint public votingDelay;
uint public votingPeriod;
uint public proposalThreshold;
uint public constant quorumVotes;
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
