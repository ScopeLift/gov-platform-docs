# OpenZeppelin Goveror

**Key Facts:**

* [On chain voting](https://tally.document360.io/docs/en/on-chain-vs-off-chain-voting)
* [Vote delegation](https://tally.document360.io/docs/en/vote-delegation) is supported
* Optional compatibility with [Compound Governor](https://wiki.withtally.com/docs/compound-governor) components

**Background:**

Compound Governor has become one of the most widely used governance frameworks. OpenZeppelin's new Governor framework shares many similarities in design, with some architectural changes and improved standardization that may bring benefits to supported protocols.

**Governance Process:**

Voting power is determined based on the number of tokens delegated to each address. This means users _must_ submit a delegation transaction before their tokens will be included in governance votes. Users may either delegate to a third party, or self-delegate if they would like to participate in voting directly.

The basic unit of governance is a proposal, which represents a package of executable code to make specific adjustments to the underlying protocol. To prevent spamming, only users whose voting power exceeds the **proposal submission threshold** are able to submit proposals. Many protocols set this to 1% of total tokens, but each protocol can select their own preferred value.

An optional **proposal delay** parameter allows protocols to delay the start of voting for a specified length of time after a proposal is submitted, giving time for users to update their vote delegation

Voting takes place over a predefined **voting period** determined by the underlying protocol (e.g. Compound has a \~2.5 day voting period, while Uniswap uses a 7 day period). When the voting period ends, the system first checks if the number of yes votes exceed the protocol's **quorum threshold** (e.g. Compound currently requires 4% of total tokens to vote in support to meet quorum).

If the **quorum threshold** has been met and the vote gains majority support, the passed proposal is then placed into a **timelock** queue which delays code execution (this is currently set to 2 days for most governance systems). This timelock is intended as a security measure, allowing users to withdraw funds if they think the proposal is malicious or otherwise unacceptable. However, in contrast to Compound Governor which requires use of a linked timelock to function, _OpenZeppelin Governor can be deployed and used without a timelock if desired_.

If the proposer's voting power drops below the **proposal submission threshold** at any time from submission until the voting or time-lock period ends, the proposal can be cancelled. Finally, once the entire process has finished, the proposal can be executed and relevant code or parameter changes are implemented in the protocol. The image below shows the general process flow for proposals (note that the specific timelines shown for each phase correspond with Compound governance, but other protocols can choose different time periods).

![image.png](https://cdn.document360.io/5b297d02-8aa1-4075-baa1-d431b2292be1/Images/Documentation/image\(18\).png)

**Autonomous Proposals:**

While submitting proposals directly requires a large share of voting power, participants can submit an **autonomous proposal** with a lower vote requirement. The proposal contract address can then accept vote delegations from users, and will be submitted for a full vote once total delegations have surpassed the **proposal submission** threshold.

**Key Changes Versus Compound Governor**

* Modular design and architecture to minimize protocols' need to fork components
* Ability to meet protocol specific requirements with addition of small modules using solidity inheritence
* Minimized use of storage improves gas efficiency
* Two versions of many components: one optimized for efficiency, with another designed for optional compatibility with Compound Governor contracts
* Use of a timelock contract is recommended in most cases, but no longer required (as it is with the Compound Governor framework)

**Resources:**

* Announcement post: [https://blog.openzeppelin.com/governor-smart-contract/](https://blog.openzeppelin.com/governor-smart-contract/)
* Open Zeppelin Forum: [https://forum.openzeppelin.com/](https://forum.openzeppelin.com/)
* Open Zeppelin Governor Github: [https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/governance](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/governance)
* OpenZeppelin Governor docs: [https://docs.openzeppelin.com/contracts/4.x/api/governance](https://docs.openzeppelin.com/contracts/4.x/api/governance)
