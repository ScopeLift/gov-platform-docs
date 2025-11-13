---
icon: money-bill-simple-wave
---

# Staking for value accrual

### Why Staking?

Staking on Tally distributes protocol revenue or native issuance to token holders. It's the foundation for open, trust-minimized systems.

Optionally, the rewards can be incentives for particular actions. Rewards can depend on particular behavior, like validating the network, long-term holding or governance activity.

Tally staking offers:

1. **Flexible staking infrastructure**: Implement staking for your protocol’s specific needs.
2. **Multiple reward sources**: Distribute rewards from protocol revenue, treasury assets, token emissions, or all of the above.
3. **Governance integration**: Staking is compatible with governance, so that holders don’t have to choose between rewards and governance. Optionally, rewards can be conditional on active participation in governance.
4. **Validator support**: Pay stakers and operators to validate protocol security.\


Tally's solution works for protocols at any stage. It supports new token launches and established projects. This guide covers both strategic direction and technical details.&#x20;

Launch a new token with built-in utility, or enhance your existing tokenomics. Either way, Tally's solution provides the foundation for sustainable economic alignment.

### How it works&#x20;

1. **Staking contracts distribute rewards over time**
   1. Rewards can come from anywhere. The most common sources are 1) protocol revenue and 2) issuance of the protocol's native token. The rewards can be in any ERC20 token or even in more than one token.
   2. Tally's staking contracts distribute rewards among eligible staking users over time.&#x20;
2. **Tokenholders stake protocol tokens for a share of the rewards**
   1. Tokenholders stake the staking token: the protocol's native token. Then, they earn a share of the rewards proportional to their share of all staked tokens over time. They can stake, claim rewards, and unstake at any time.
   2. Staking supports governance. If the staking token is also a governance token, holders can use their staked tokens in governance. That way, tokenholders don't have to choose between governance and receiving rewards.
   3. Optionally, the staking system can have eligibility criteria stipulate particular actions from tokenholders to get rewards. For example, it could require that staked tokens be active in governance to earn rewards. There's a large design space for incentivizing token-aligned services.

### Case study: ZKsync's staking program

ZKsync is using Tally's staking solution to create an economic feedback loop where active governance participation drives protocol growth and rewards flow back to contributors. The program will distribute 35 million ZK tokens across two seasons.

**Program structure:**

* **Season 1**: 10M ZK rewards for 400M tokens staked&#x20;
* **Season 2**: 25M ZK rewards for 1B tokens staked
* Participants earn up to 10% APR by staking ZK and delegating to active governance participants.

**How it works:**

* **Delegation-based rewards:** Token holders must stake ZK and delegate to active participants to earn rewards. Active participants are delegates who voted in at least 2 of the last 5 governance proposals. This ties rewards directly to governance activity.
* **Continuous reward streaming:** Rewards distribute continuously over 30-day epochs, preventing yield discontinuities and giving stakers time to respond to changing conditions.
* **Governance integration** Staked tokens retain full voting power. Eligibility criteria ties rewards to governance activity, ensuring staking incentivizes active protocol participation.

Learn more about [ZKsync Token Staking](https://forum.zknation.io/t/tpp-12-zknomics-token-staking).



Ready to launch staking? [Talk to our team to get started](http://tally.xyz/contact).
