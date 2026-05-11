# OpenZeppelin Governor

## **Background**

The OpenZeppelin Governor is a contract for onchain governance, designed to be compatible with existing systems based on Compound's GovernorAlpha and GovernorBravo. It is a modular system that allows different requirements to be accommodated by writing small modules using Solidity inheritance. The OpenZeppelin Governor system includes compatibility with existing systems, ERC20Votes & ERC20VotesComp, Governor & GovernorCompatibilityBravo, and GovernorTimelockControl & GovernorTimelockCompound. It also provides a guide on setting up a token, governor, timelock, proposal lifecycle, and timestamp-based governance.

## **Governance Process**

Voting power is determined based on the number of tokens delegated to each address. This means users _must_ submit a delegation transaction before their tokens will be included in governance votes. Users may either delegate to a third party, or self-delegate if they would like to participate in voting directly.

The basic unit of governance is a proposal, which represents a package of executable code to make specific adjustments to the underlying protocol. To prevent spamming, only users whose voting power exceeds the **proposal submission threshold** are able to submit proposals. Many protocols set this to 1% of total tokens, but each protocol can select their own preferred value.

An optional **proposal delay** parameter allows protocols to delay the start of voting for a specified length of time after a proposal is submitted, giving time for users to update their vote delegation

Voting takes place over a predefined **voting period** determined by the underlying protocol (e.g. Compound has a \~2.5 day voting period, while Uniswap uses a 7 day period). When the voting period ends, the system first checks if the number of yes votes exceed the protocol's **quorum threshold** (e.g. Compound currently requires 4% of total tokens to vote in support to meet quorum).

If the **quorum threshold** has been met and the vote gains majority support, the passed proposal is then placed into a **timelock** queue which delays code execution (this is currently set to 2 days for most governance systems). This timelock is intended as a security measure, allowing users to withdraw funds if they think the proposal is malicious or otherwise unacceptable. However, in contrast to Compound Governor which requires use of a linked timelock to function, _OpenZeppelin Governor can be deployed and used without a timelock if desired_.

If the proposer's voting power drops below the **proposal submission threshold** at any time from submission until the voting or time-lock period ends, the proposal can be cancelled. Finally, once the entire process has finished, the proposal can be executed and relevant code or parameter changes are implemented in the protocol. The image below shows the general process flow for proposals (note that the specific timelines shown for each phase correspond with Compound governance, but other protocols can choose different time periods).

![Governance process using OpenZeppelin Governor](https://cdn.document360.io/5b297d02-8aa1-4075-baa1-d431b2292be1/Images/Documentation/image\(18\).png)

## **Governor Alpha and Bravo**

The original version of Compound Governor, Governor Alpha, was set up as an immutable contract. This means any changes to governance parameters (eg. quorum, voting period, etc) require deploying a new governance contract and transferring ownership of the governance timelock. This can create difficulty for integrated user interfaces or other services that need to point to a new governance contract address.

Governor Bravo is an upgraded version of the contract allowing for upgrades and changes to the governance parameters without migrating. Compound and a few other protocols have elected to use Bravo for greater convenience, and because any changes still need to pass a governance vote and timelock delay there are no additional security or governance risks compared with using the Alpha version.

***

### **Resources**

* [Announcement Post](https://blog.openzeppelin.com/governor-smart-contract/)
* [Open Zeppelin Forum](https://forum.openzeppelin.com/)
* [Open Zeppelin Governor Github](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/governance)
* [OpenZeppelin Governor Docs](https://docs.openzeppelin.com/contracts/4.x/api/governance)
