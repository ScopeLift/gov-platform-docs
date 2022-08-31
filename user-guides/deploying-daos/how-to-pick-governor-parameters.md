---
description: >-
  How to set Proposal Threshold, Quorum, Voting Period,  Voting Delay, and
  Timelock Delay.
---

# Pick good Governor parameters

A Governor contract has several important parameters that affect the lifecycles of its proposals . Think about these parameters as a balancing act between ease of passing proposals and security against malicious proposals. That’s an important – and tough – tradeoff to get right!&#x20;

Here's a guide to picking these parameters to set a DAO up for success by picking the right parameters:

* Picking a good [Proposal Threshold](how-to-pick-governor-parameters.md#how-to-pick-the-proposal-threshold)
* Picking a good [Quorum](how-to-pick-governor-parameters.md#how-to-pick-the-quorum)
* Picking a good [Voting Period](how-to-pick-governor-parameters.md#how-to-pick-the-voting-period)
* Picking a good [Voting Delay](how-to-pick-governor-parameters.md#how-to-pick-the-voting-delay)
* Picking a good [Timelock Delay](how-to-pick-governor-parameters.md#how-to-pick-the-timelock-delay)

#### ℹ️ _Governors (except legacy ones like Governor Alpha) can upgrade their parameters with an on-chain proposal. Be careful at the start, though! If the parameters are set too high, it might be too hard to make an on-chain proposal to modify them to make it easier._

### **How to pick the Proposal Threshold**

The Proposal Threshold is the amount of voting power that an account needs to make a proposal. Governors on Tally usually set the threshold to somewhere between 0% and 2% of circulating token supply.

The purpose of the threshold is to prevent spam proposals and to make sure that anyone making a proposal has either direct economic exposure or trust from delegators. Some DAOs set the proposal threshold to 0 to lower the barriers to participating.

Picking a good Proposal Threshold depends on the distribution of delegated voting power, which might be hard to know before the DAO gets off the ground. Once the distribution of voting power is known, it’s a good idea to have a medium-size group of delegates over the threshold. DAOs on Tally typically set their Proposal Threshold to a place where at least 5-10 delegates have enough voting power to make a proposal.

#### ℹ️ _If there isn't anyone above the proposal threshold, the best option is to get more tokenholders to delegate. Another option is to ask people to delegate to an_ [_Autonomous Proposal_](https://medium.com/compound-finance/compound-autonomous-proposals-354e7a2ad6b7)_, which is a smart contract that can make a proposal when it gets enough delegations_ 

### **How to pick the Quorum**&#x20;

The Quorum is the amount of \`For\` votes – sometimes also including the amount of \`Abstain\` votes – for a proposal.&#x20;

#### ℹ️ _Note that this definition of quorum is different from the commonly-used one in legislatures, which also includes \`Against\` votes. The motivation for the different definition is to prevent a situation where voting \`Against\` a proposal causes it to pass by pushing it over the quorum._

Picking a good quorum is tough, because it depends on voter turnout, which might be hard to know in advance. A too-high quorum might make it impossible for a Governor to pass \*any\* proposals! On the other hand, too-low quorum might open up the Governor to spam attacks, where an attacker repeatedly submits a malicious proposal and forces other voters to repeatedly vote it down.

For Governors on Tally, the quorum is usually somewhere in the range of 1-10% of circulating token supply.

#### ⚠️ _Note that many DAOs have a non-circulating token supply. Those tokens can’t vote! The original Yam finance bricked its Governor by calculating quorum as a percentage of total supply, while also automatically minting new supply to its timelock._



### **How to pick the Voting Period**

The voting period is how voting lasts on each proposal. At the end of the voting period, the proposal has passed or failed. Most DAOs pick a period between 3 and 7 days.&#x20;

Less than 3 days, and someone can try to sneak through a proposal on a weekend or during a period of low activity. Something closer to 7 days gives everyone time to review a proposal.



### **How to pick the Voting Delay**

The voting delay is the amount of time between when a proposal is submitted and when it goes up for voting. Most Governors have a voting delay of 0. The Governors that do have one usually pick a period of one day or less.

The delay gives token holders time to delegate their voting power before the vote starts or buy more votes. Governor takes a snapshot of all the voting power at the start of voting. Delegation and balance changes after that don’t affect voting power. That said, most DAOs decide that this extra time for managing votes isn’t worth slowing down the proposal.



### **How to pick the Timelock Delay**

The timelock delay is the minimum amount of time between when a proposal posses and when it can be executed. There’s a big agility vs. security tradeoff here, so DAOs pick values all the way from 0 days to 7 days for their timelock delay.

Tally recommends picking a delay of 0 for Governors that only manage a treasury. The security benefit of a delay isn’t as relevant. The exception is if the Timelock has someone with an emergency veto/cancel role. In that case, they probably want at least 3 days to react to potentially malicious proposals.&#x20;

For Governors that control a DeFi protocol  where users might want to withdraw their funds before a big protocol change, we usually see timelock delays closer to 7 days.\
