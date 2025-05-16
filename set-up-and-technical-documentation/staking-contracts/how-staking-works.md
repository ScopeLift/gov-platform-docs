---
description: Understand how Tally's staking contracts work under the hood
icon: gears
---

# How Staking Works

[Staker](https://github.com/withtally/staker) is a flexible, configurable staking contract. It distributes onchain staking rewards to the holders of an ERC20 token, including DAO governance tokens. The rewards are proportional to  with arbitrary reward criteria.\


**System Architecture**

Here's an architecture diagram of the staking smart contracts:

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXdEeZ22as7vFBVcreItQ3FzdzF__ZDU-TQm_cD3_qiP0Ytn247IcsOmlkG1JnJHQBbfTPn6RvBUJSho3KwOf8kssxnDO23D59UIEbw1BUX2T2egQOlMGJVNIsmNiNar-YZhFOyjaQ?key=-A0yyh0GoubDpQhSpbBdwPkR" alt=""><figcaption></figcaption></figure>

* The staking contracts have modules for [calculating earning power](https://github.com/withtally/staker/tree/main/src/calculators), hooking up [sources of rewards](https://github.com/withtally/staker/tree/main/src/notifiers), and [extensions](https://github.com/withtally/staker/tree/main/src/extensions). Protocol teams can assemble a staking system from these audited pieces.
* Staking is out-of-the-box compatible with existing \`ERC20Votes\` governance tokens. It supports \`ERC20Votes\` delegation with the "surrogate factory" pattern. Staking creates a surrogate contract for each delegate. It delegates voting power in each surrogate to the delegate.
* When Staker receives rewards, it distributes them over a period of time, e.g. 30 days. Distributing over time gives unstaked tokenholders a chance to stake. A smooth schedule also minimizes discontinuities from flash staking.
* Staker is built on[ UniStaker](https://github.com/uniswapfoundation/UniStaker). Unistaker is based on Synthetix's[ StakingRewards](https://github.com/Synthetixio/synthetix/blob/develop/contracts/StakingRewards.sol).
* UniStaker and Staker have been audited several times. The audit reports are[ available here](https://github.com/withtally/staker/tree/main/audits/unistaker).

#### Core Components

Any instance of Staker needs these pieces to work.

1. **Staker Contract**: The main contract that handles staking, reward distribution, and voting power delegation
2. **Earning Power Calculator**: Determines how rewards are distributed to stakers
3. **Delegation Surrogate**: Manages governance voting power for staked tokens
4. **Reward Notifier(s)**: Connect reward sources to the staking system

#### Extensions

Instances of Staker can add these extensions for extra features.

1. **StakerPermitAndStake**: Adds EIP-2612 permit functionality for better UX
2. **StakerOnBehalf**: Enables signature-based execution of staking actions
3. **StakerCapDeposits**: Enforces a cap on the total stake amount

#### Liquid Staking Token (LST)

The LST, also called stGOV, is the easiest way to get rewards from staking.&#x20;

1. The LST is, of course, **liquid**. Staking positions can be transferred without unstaking.
2. The LST **auto-compounds rewards**. Holders will automatically accrue the rewards without having to call claim()&#x20;
3. The LST **keeps governance power active**. When the LST is in DeFi, cold storage, or a centralized exchange, the LST provides a backup plan for governance power.&#x20;
   1. The backup is a configurable strategy for keeping voting power active in governance. For example, see the [OverwhelmingSupportAutoDelegate](https://github.com/withtally/stGOV/blob/main/src/auto-delegates/OverwhelmingSupportAutoDelegate.sol), which only votes on proposals that have lots of consensus.

Access the open-source [stGOV repo](https://github.com/withtally/stGOV).&#x20;

### In-Depth Technical Walkthrough

#### Tally's Staking contracts are open source:

* [Staker ](https://github.com/withtally/staker)
* [LST ](https://github.com/withtally/stGOV)

#### Staker Contract

The `Staker` contract is the core of the system. It manages:

* Staking deposits and withdrawals
* Reward distribution over time
* Delegation of voting power
* Earning power calculation

Staker uses a streaming reward mechanism, where rewards are added as lump sums, then distributed evenly over time. This gives stakers time to respond to changes in reward rates.

```
// Sample code to create a basic Staker implementation
contract MyStaker is
  Staker,
  StakerDelegateSurrogateVotes,
  StakerPermitAndStake
{
  constructor(
    IERC20 _rewardsToken,
    IERC20Staking _stakeToken,
    IEarningPowerCalculator _earningPowerCalculator,
    uint256 _maxBumpTip,
    address _admin
  )
Staker(_rewardsToken, _stakeToken, _earningPowerCalculator, _maxBumpTip, _admin)
    StakerPermitAndStake(_stakeToken)
    StakerDelegateSurrogateVotes(_stakeToken)
  {}
}
```



#### Earning Power Calculation

Staker uses a concept called "Earning Power" to distribute rewards. Every depositor gets Earning Power. Their share of the reward is their earning power divided by the total earning power in Staker, over time. The earning power calculator determines which depositors are eligible for rewards and how much they earn

**Flat Earning Power**

[IdentityEarningPowerCalculator](https://github.com/withtally/staker/blob/main/src/calculators/IdentityEarningPowerCalculator.sol): Simple 1:1 mapping where earning power equals staked amount.

**Oracle-based Earning Power**

[BinaryEligibilityOracleEarningPowerCalculator](https://github.com/withtally/staker/blob/main/src/calculators/BinaryEligibilityOracleEarningPowerCalculator.sol): More advanced calculator where earning power depends on the delegate's activity score. Here’s how it works:



* An oracle puts scores onchain
* The calculator turns earning power on and off based on whether an address's score exceeds a configurable threshold
* Staker uses the earning power over time to distribute rewards.

**. Tally provides two implementations:**

```
// Deploy a simple earning power calculator
IdentityEarningPowerCalculator calculator = new IdentityEarningPowerCalculator();

// Or deploy an oracle-based calculator
BinaryEligibilityOracleEarningPowerCalculator oracleCalculator = 
  new BinaryEligibilityOracleEarningPowerCalculator(
    owner,
    scoreOracle,
    staleOracleWindow,
    oraclePauseGuardian,
    delegateeScoreEligibilityThreshold,
    updateEligibilityDelay
  );
```

#### Reward Notifiers

#### Reward Source Options

Tally's system distributes rewards through a stream mechanism:

1. Rewards periodically enter the staking system as lump sums
2. Those rewards stream to stakers over time
3. Stakers earn proportional to their staked amount

This approach gives stakers time to respond to changes in rewards.

#### Reward Notifiers

Reward notifiers connect different token sources to the staking system. Tally provides three standard notifiers:

1. ERC20 transfer() Direct token transfers from a treasury or revenue source
2. ERC20 transferFrom() Approved transfers from a separate contract or wallet
3. ERC20 mint() -[ ](https://github.com/withtally/staker/blob/main/src/notifiers/MintRewardNotifier.sol)Newly minted tokens from an inflationary schedule

Each notifier handles capturing rewards from your chosen source and adding them to the staking reward pool.

Reward notifiers are responsible for informing the staking contract about new rewards:

1. [TransferRewardNotifier.sol ](https://github.com/withtally/staker/blob/main/src/notifiers/TransferRewardNotifier.sol)holds rewards directly and distributes them by calling `transfer()`
2. [TransferFromRewardNotifier.sol](https://github.com/withtally/staker/blob/main/src/notifiers/TransferFromRewardNotifier.sol) relies on an `approve()`, so that it can call `transferFrom()` on the reward source
3. [MintRewardNotifier.sol ](https://github.com/withtally/staker/blob/main/src/notifiers/MintRewardNotifier.sol)calls `mint()` on a token contract.

```
// Example: deploy a transfer reward notifier
TransferRewardNotifier transferNotifier = new TransferRewardNotifier(
  stakerContract,         // The staking contract to notify
  initialRewardAmount,    // Amount to distribute per period
  initialRewardInterval,  // Time between distributions
  owner                   // Admin of the notifier
);

// Transfer reward tokens to the notifier
rewardToken.transfer(address(transferNotifier), totalRewards);

// Call notify to distribute rewards
transferNotifier.notify();
```

#### Delegation Surrogates

Staker uses the “surrogate pattern” to make staking compatible with governance tokens. That way, tokenholders don’t have to choose between earning rewards and doing governance.

1. Staker creates a surrogate contract for each delegate (address receiving voting power)
2. Surrogate deposits and withdrawals are fully controlled by the staking system. Staker does all the accounting.
3. The surrogate contract holds staked tokens and delegates all its voting power to the chosen delegatee. That way, staking is compatible with the underlying governance token.
   1. Note that these surrogate contracts allow tokenholders to split up their voting power. i.e. partial delegation

```
// The staking contract creates a surrogate for each delegatee
function _fetchOrDeploySurrogate(address _delegatee) internal returns (DelegationSurrogate _surrogate) {
  _surrogate = new DelegationSurrogateVotes(stakeToken, _delegatee);
  return _surrogate;
}
```

### Configuring Earning Power

#### Custom Earning Power Rules

Create custom earning power calculators to incentivize specific behaviors:

1. **Activity-based rewards**: Require governance participation to earn full rewards.&#x20;
2. **Time-weighted staking**: Increase rewards for long-term stakers
3. **Protocol usage rewards**: Tie rewards to protocol usage

```
// Example of a custom earning power calculator
contract CustomEarningPowerCalculator is IEarningPowerCalculator {
  function getEarningPower(uint256 _amountStaked, address _staker, address _delegatee)
    external
    view
    returns (uint256)
  {
    // Custom logic to determine earning power
    return _calculateCustomEarningPower(_amountStaked, _staker, _delegatee);
  }

  function getNewEarningPower(
    uint256 _amountStaked,
    address _staker,
    address _delegatee,
    uint256 _oldEarningPower
  ) external view returns (uint256, bool) {
    uint256 newPower = _calculateCustomEarningPower(_amountStaked, _staker, _delegatee);
    bool qualifiedForBump = _isQualifiedForBump(newPower, _oldEarningPower);
    return (newPower, qualifiedForBump);
  }
  
  // Your custom calculation logic
  function _calculateCustomEarningPower(uint256 _amountStaked, address _staker, address _delegatee)
    internal
    view
    returns (uint256)
  {
    // Implementation details
  }
}
```

#### Roles

1. **Admin controls**:&#x20;

The admin of the staking contracts can’t touch staked assets. They do control some system parameters:

* Add and remove reward sources, by enabling and disabling reward notifiers
* Set the eligibility criteria for rewards, by changing the earning power calculator
* Change the emergency pause guardian.
* Override eligibility for a particular address.
* Set claim fee parameters



2. **Upgrade strategy**:&#x20;

These contracts could be deployed immutable or with the upgradeable proxy pattern

* **To migrate an immutable Staker**:&#x20;
  * Deploy a new staking contract
  * Send rewards there
  * Have tokenholders migrate to the new one
* **To upgrade-in-place a proxy contract**:&#x20;
  * Use initializers instead of constructors for key params at deployment
  * Check the storage slots carefully to avoid corrupting state

3. **Emergency measures**:

The oracle-based calculator has failsafes in case the oracle misbehaves or goes offline:

* If the oracle misbehaves by posting incorrect scores, a \`PauseGuardian\` can pause the system, reverting it to flat earning power.&#x20;
* If the oracle goes offline, the calculator also automatically reverts to using flat earning power.
* The oracle can be replaced by Staker's admin.

### Resource Usage and Gas Optimization

* **Deposit**: \~100,000-150,000 gas
* **Claiming rewards**: \~60,000-100,000 gas
* **Withdrawal**: \~80,000-120,000 gas

**For optimal performance**:

* Distribute rewards at reasonable intervals, e.g., weekly or monthly
* The earning power calculator should wait between updates, e.g. daily
* The earning power calculator shouldn’t make lots of small updates, especially networks with high gas costs
* Anyone can update earning power as it changes, but someone needs to do it. Staker provides “tips” as incentive for bots to do updates. If MEV bots do not know about the incentive, consider running the staker bots script directly.&#x20;
* These incentives don’t work testnets or for tokens with no market value.

\
