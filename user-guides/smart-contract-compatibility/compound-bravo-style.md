---
description: Compatibility considerations when implementing Compound Governor Bravo
---

# Compound Bravo Style

Tallys supports [Compound Governor Bravo](https://github.com/compound-finance/compound-protocol/blob/master/contracts/Governance/GovernorBravoDelegate.sol). However, if you are deploying a new Governor, we recommend [OpenZeppelin's Governor.](openzeppelin-governor.md) OZ Governor is more actively maintained.

&#x20;If you're already a direct for of Governor Bravo, then it should work out of the both. If you insist on making changes to the base contract, then you can use this guide to make sure that your changes are compatible with Tally's API and web interface.

### Event signatures

Tally's API listens to event logs from Governor contracts when indexing them. Your contract will need to maintain the same event signatures that OZ Governor implements:

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

Tally's frontend app helps users make web3 calls to your Governor contract. The app lets users create Proposals as well as vote on, queue and execute them.

To be compatible with Tally, your Governor will need these function signatures:

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

The Tally app need reads state from the public getters of these state variables:

```
uint public votingDelay;
uint public votingPeriod;
uint public proposalThreshold;
uint public constant quorumVotes;
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
