# MakerDAO (MKR)

**Key Facts:**

* [On chain voting](https://tally.document360.io/docs/en/on-chain-vs-off-chain-voting) using MKR token
* [Vote delegation](https://tally.document360.io/docs/en/vote-delegation) is not yet supported, but is planned in a future upgrade
* Uses unique MakerDAO governance architecture

**Protocol Overview:**

MakerDAO is a decentralized organization that manages the DAI stablecoin/credit system. MKR holders are responsible for maintaining system stability and the DAI-USD peg on an ongoing bases by voting on risk parameter and monetary policy adjustments.

**Venues for Discussion:**

Most discussion and activity takes place in the [MakerDAO Discourse forum](https://forum.makerdao.com/). Maker also maintains a fairly active [Rocketchat chatroom](https://chat.makerdao.com/channel/general) for more informal discussions. Formal proposal submission (after initial discussion in the forum) is performed via [MakerDAO's Github account](https://github.com/makerdao/community/tree/master/governance).

**Voting Interface and Process:**

MakerDAO's voting interface includes separate sections for ["executive votes"](https://vote.makerdao.com/) used to approve formal changes and make code updates, and ["polls"](https://vote.makerdao.com/polling) which measure community sentiment but don't execute any changes. Currently, Maker's polling system involves on chain transaction costs, but the community is also experimenting with [snapshot based](https://snapshot.page/#/maker) poll votes.

Maker's system differs from Compound by using "continuous approval voting", where new proposals need to exceed the vote support on the prior passed vote before being executed. A side effect of this architecture is that MakerDAO executive votes generally involve "bundling" of several unrelated changes into a single vote.

Items are included or excluded in upcoming executive vote bundles based upon a [procedural governance](https://tally.document360.io/docs/en/procedural-soft-governance) framework codified in Maker Improvement Proposals (MIPs). The criteria for inclusion can include building consensus in forum discussions, on-chain poll results, and/or recommendations from voter approved domain representatives (eg principal risk or smart contracts domain team members). Final adjudication of these meta-governance requirements falls to the voter approved Community Facilitator(s) and/or MIP Editor(s).

While these procedural norms are considered key parts of MakerDAO governance, discretion of the facilitator/editor only extends to merging PRs into the MakerDAO Github and adding votes to the voting app user interface. Anyone can submit a proposal or vote directly through the MakerDAO governance smart contracts. Newly passed executive votes are timelocked for 12 hours before they can be executed, which give the community time to respond to malicious governance actions.

The Maker system is planning to upgrade various aspects of the governance system. Potential improvements include unbundling executive proposals, lower gas costs for voting, and support for delegation. Additional details can be found in the [system specification](https://forum.makerdao.com/t/mip26-dssgov-governance-contract-redesign/4589) posted on the Maker forum.

\
