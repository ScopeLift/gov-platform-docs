---
icon: sack-dollar
---

# Delegate compensation

### What is delegate compensation?  <a href="#id-7bd8cccb-6b50-4c44-a2f1-27975232711b" id="id-7bd8cccb-6b50-4c44-a2f1-27975232711b"></a>

Delegate compensation programs are designed to reward active participants in governance for time, expertise, and contributions. Compensation mechanisms encourage thoughtful participation while reducing voting power concentration among a few large holders. Systems include requirements to ensure only engaged and accountable delegates are rewarded, such as maintaining a minimum reputation score or meeting participation thresholds.

### Delegate compensation is currently live for [The OBOL Collective](https://www.tally.xyz/gov/obol). <a href="#id-7bd8cccb-6b50-4c44-a2f1-27975232711b" id="id-7bd8cccb-6b50-4c44-a2f1-27975232711b"></a>

### OBOL delegate compensation <a href="#id-7bd8cccb-6b50-4c44-a2f1-27975232711b" id="id-7bd8cccb-6b50-4c44-a2f1-27975232711b"></a>

The Obol delegate compensation mechanism distributes 165,000 OBOL tokens over 6 months to active delegates, proportional to the square root of their voting power. This incentivizes participation while reducing centralization advantages.

**Key Requirements:**

* Maintain DRS (Delegate Reputation Score) ≥65% to be eligible
* Rewards stream continuously and can be claimed at any time

### How to Claim Compensation <a href="#f26614aa-ba0a-4968-afe4-8b0e337b16df" id="f26614aa-ba0a-4968-afe4-8b0e337b16df"></a>

1. **Check Eligibility**
   * Ensure your [DRS ](delegate-reputation-score-drs.md)is ≥65% (visible on the delegate profile)
2. **View Accrued Compensation**
   * Check unclaimed rewards on the [profile ](../../how-to-use-tally/set-up-a-tally-profile.md)page
   * Compensation accrues continuously while eligibility is maintained
3. **Claim OBOL**
   * Click the claim button
   * Confirm the transaction
   * No minimum claim amount required

### Technical Reference <a href="#id-114c4a24-2ba5-457d-855b-84d7e7cfa853" id="id-114c4a24-2ba5-457d-855b-84d7e7cfa853"></a>

#### Smart Contract Functions <a href="#id-774c0749-a41b-4447-9a70-d4cc196338ea" id="id-774c0749-a41b-4447-9a70-d4cc196338ea"></a>

`function claimReward(DepositIdentifier _depositId) external returns (uint256)`

**Check Unclaimed Balance**

`function unclaimedReward(DepositIdentifier _depositId) external view returns (uint256)`

**Verify Delegate Eligibility**

`function isDelegateeEligible(address _delegatee) external view returns (bool)`

#### Compensation Calculation <a href="#id-80f079d7-cfc0-49c1-bf3f-b2450ade1a9a" id="id-80f079d7-cfc0-49c1-bf3f-b2450ade1a9a"></a>

Rewards are distributed proportionally based on:

`delegate_share = √(voting_power)`

The square root function uses [OpenZeppelin's Math library](https://docs.openzeppelin.com/contracts/5.x/api/utils#Math-sqrt-uint256-) for precision and reliability.



### Important Details <a href="#id-8ead744e-c46d-4817-b200-de3fb709c2dd" id="id-8ead744e-c46d-4817-b200-de3fb709c2dd"></a>

* **Gas Costs**: Similar to standard Staker reward claims
* **Eligibility Loss**: If DRS drops below 65%, earning power is removed (same as Staker)
* **Oracle Updates**: Voting power snapshots update every 3 weeks
* **Fallback**: If oracle becomes stale or is paused, system reverts to pure √voting power calculation

### Contract Architecture <a href="#id-83695b95-4f88-484d-95e0-e3e02d92002b" id="id-83695b95-4f88-484d-95e0-e3e02d92002b"></a>

The delegate compensation system is implemented as a Staker contract with custom earning power calculation:

* Uses `ObolBinaryVotingWeightEarningPowerCalculator.sol`
* Integrates with DRS oracle for eligibility verification
* Maintains same security model as main Staker system

Ready to launch delegate compensation? [Talk to our team to get started](http://tally.xyz/contact).
