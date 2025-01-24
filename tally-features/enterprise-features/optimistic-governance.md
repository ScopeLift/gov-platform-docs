---
icon: message-smile
---

# Optimistic Governance

Optimistic Governance lets a small group of decision-makers propose changes, subject to a veto from the larger DAO. This accelerates operational efficiency by automating routine decisions while maintaining appropriate oversight.



It's best to build Optimistic Governance on battle-tested governance contracts like Governor and Timelock. These modular contracts plug into a rich ecosystem of DAO apps and tools like Tally.

> **If you would like to work with Tally to set up Optimistic Governance for your DAO, email** [**hello@tally.xyz**](mailto:hello@tally.xyz) **to chat with our team!**

## Implementation

To implement Optimistic Governance, combine battle-tested governance contracts:

* One **Council** **NFT** contract that determines membership in the Optimistic Council.
* One **ERC20 contract** that determines voting power for vetoes.
* Two Governor contracts, the **Optimistic Governor** and the **Veto Governor.**
* One **Timelock** contract that holds the DAO assets and/or protocol.

<figure><img src="../../.gitbook/assets/optimistic dao.png" alt=""><figcaption></figcaption></figure>

## **Modifications from standard OZ Governor setup**

* Both Governors implement **"**[**Super Quorum**](https://github.com/withtally/governor-super-quorum)**."** Once a majority votes in favor, the voting ends. The Governor can send the proposal or veto to the timelock immediately
* The Optimistic Governor has `PROPOSER_ROLE` role on the Timelock
* The Veto Governor has`CANCELLER_ROLE` role on the Timelock. The veto Governor's voting period must be shorter than the timelock delay, so that it can cancel proposals in time
* Tally's frontend will need to connect the Veto Governor to the Optimistic Governor, so let us know at [**hello@tally.xyz**](mailto:hello@tally.xyz) **i**f you are interested in an Optimistic setup.
