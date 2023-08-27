# Compound Governor

**Key Facts:**

* [On chain voting](https://tally.document360.io/docs/en/on-chain-vs-off-chain-voting)
* [Vote delegation](https://tally.document360.io/docs/en/vote-delegation) is supported

**Background:**

Compound Governor was originally developed by Compound Labs for use with COMP voting and proposals. Because the code is flexible, open source, and has been well vetted, many other protocols have elected to copy (or "fork") Compound's governance system instead of developing a new system of their own. Compound Governor is currently one of the most prominent and widely adopted governance frameworks.

**Governance Process:**

Voting power is determined based on the number of tokens delegated to each address. This means users _must_ submit a delegation transaction before their tokens will be included in governance votes. Users may either delegate to a third party, or self-delegate if they would like to participate in voting directly.

The basic unit of governance is a proposal, which represents a package of executable code to make specific adjustments to the underlying protocol. To prevent spamming, only users whose voting power exceeds the **proposal submission threshold** are able to submit proposals. Many protocols set this to 1% of total tokens, but each protocol can select their own preferred value.

An optional **proposal delay** parameter allows protocols to delay the start of voting for a specified length of time after a proposal is submitted, giving time for users to update their vote delegation

Voting takes place over a predefined _voting period_ determined by the underlying protocol (e.g. Compound has a \~2.5 day voting period, while Uniswap uses a 7 day period). When the voting period ends, the system first checks if the number of yes votes exceed the protocol's _quorum threshold_ (e.g. Compound currently requires 4% of total tokens to vote in support to meet quorum).

If the _quorum threshold_ has been met and the vote gains majority support, the passed proposal is then placed into a _timelock_ queue which delays code execution (this is currently set to 2 days for most governance systems). This timelock is intended as a security measure, allowing users to withdraw funds if they think the proposal is malicious or otherwise unacceptable. If the proposer's voting power drops below the _proposal submission threshold_ at any time from submission until the time-lock period ends, the proposal can be cancelled.

Finally, once the time-lock period has elapsed, the proposal can be executed and relevant code or parameter changes are implemented in the protocol. The image below shows the general process flow for Compound Governor proposals (note that the specific timelines shown for each phase correspond with Compound governance, but other protocols can choose different time periods).

![image.png](https://cdn.document360.io/5b297d02-8aa1-4075-baa1-d431b2292be1/Images/Documentation/image\(18\).png)

**Autonomous Proposals:**

While submitting proposals directly requires a large share of voting power, participants can submit an _autonomous proposal_ with a lower vote requirement. The proposal contract address can then accept vote delegations from users, and will be submitted for a full vote once total delegations have surpassed the _proposal submission_ threshold.

**Governor Alpha and Bravo:**

The original version of Compound Governor, Governor Alpha, was set up as an immutable contract. This means any changes to governance parameters (eg. quorum, voting period, etc) require deploying a new governance contract and transferring ownership of the governance timelock. This can create difficulty for integrated user interfaces or other services which need to point to a new governance contract address.

Governor Bravo is an upgraded version of the contract allowing for upgrades and changes to the governance parameters without migrating. Compound and a few other protocols have elected to use Bravo for greater convenience, and because any changes still need to pass a governance vote and timelock delay there are no additional security or governance risks compared with using the Alpha version.

**Resources:**

* Compound governance docs: [https://compound.finance/docs/governance](https://compound.finance/docs/governance)
* Compound autonomous proposals blog post: [https://medium.com/compound-finance/compound-autonomous-proposals-354e7a2ad6b7](https://medium.com/compound-finance/compound-autonomous-proposals-354e7a2ad6b7)
* Compound governance Github: [https://github.com/compound-finance/compound-protocol/tree/master/contracts/Governance](https://github.com/compound-finance/compound-protocol/tree/master/contracts/Governance)
