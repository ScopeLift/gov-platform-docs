---
description: Learn how to propose token vesting plans with Hedgey on Tally.
---

# Token Vesting with Hedgey

Using [Hedgey](https://hedgey.finance/), you can make a proposal for ERC-20 token vesting plans. Token vesting plans allow onchain teams to issue vesting token plans to members, mirroring traditional vesting with features like cliffs, flexible schedules, and backdated start dates. It's fully onchain, revocable, and customized for onchain teams' needs.

Key features include linear/periodic unlock strategies, onchain governance voting, customizable dates, governance rights to vesting tokens, admin features for transferring vesting plans, delegation of vesting plans to multiple addresses, and beneficiaries' ability to claim tokens at their discretion. The contracts are fully onchain, ensuring interaction even without Hedgey UIs​​.

## How to call Hedgey’s Contract

You can create vesting plans one at a time or multiple in the same transaction. You need to add 2 custom actions to a proposal.

### Creating Vesting Plans

1.  The first custom action is to approve the allowance for the Hedgey contract to spend the tokens to create vesting plans.

    * **Target contract address:** the address of your DAO governance token, or whatever token you are planning to use for vesting
    * **Contract method:** approve
    * **Calldatas:**
      * **spender:** 0x3466EB008EDD8d5052446293D1a7D212cb65C646 (the Hedgey Batch Planner contract address)
      * **amount:** the total amount that you will deploy in the vesting batch

    <figure><img src="https://lh7-us.googleusercontent.com/iMXSi_WU6FwGdzBUyktACIhr4wmZFqHdCpNeOy08L2_6_xFvy-HToiit8cx6A_6SQDh49-Y3_fDzmncQmfAwkyR_vr1qEnHlzqHGBX-bdg4idp-PnWTMMrzgVTqhJgm2gcGUQcxO3ANVzcDpL6cDr94" alt=""><figcaption></figcaption></figure>
2.  Create a second custom action with the following.

    * **Target contract address:** 0x3466EB008EDD8d5052446293D1a7D212cb65C646
    * **Contract method:** batchVestingPlans

    <figure><img src="../../../.gitbook/assets/Screenshot 2023-11-06 at 3.51.46 pm.png" alt=""><figcaption></figcaption></figure>

Then, input the parameters as follows:

* **Locker:** 0x1bb64AF7FE05fc69c740609267d2AbE3e119Ef82 (address of the vesting plans contract)
* T**oken:** address of your DAO token
* **totalAmount:** the total amount of tokens to be distributed to vesting recipients
* **Plans:** this is an array (tuple) of vesting plans that look like the following: \[\["0x0C4FAb8d9DBE774708EeC313bf0295278E307bcD", "100000000000000000000000", 1696161600, 1696161600, "1585489599188230"],\["0x0C4FAb8d9DBE774708EeC313bf0295278E307bcD", "100000000000000000000000", 1696161600, 1696161600, "1585489599188230"]], which coincides with \[“recipientAddress1”,”amountOfTokensForVestingPlan1”,”startDateForPlan1”,”cliffDateForPlan1”,”rateForPlan1”]
* **Period:** the seconds in the period for vesting, so for instance use a 1 for a streaming style period.
* **vestingAdmin:** the admin of the vesting plans who can revoke plans
* **adminTransferOBO:** this allows the vestingAdmin to transfer plans on the recipients behalf in the case of emergency
* m**intType: 7**; this is a specific number for the Hedgey dApp to display things properly.&#x20;

_Note all of the plans batched need to have the same period and vesting admin._

<figure><img src="https://lh7-us.googleusercontent.com/PvJB3beMHsQXIMdTG7vjEMLJ11tR3zGldv0Gsx8kwYV42XHMjhhEqE0D4PXJ560DHuZ_KZjg0Ri6-5jNCB5eBS5W9tzJGyRn45mPAE4sufxeqVmUbx96_Qm5Q5fBa4JX-J_ty7IA5k0fVaLAenpsilw" alt=""><figcaption><p>These calldatas are just examples; you will need to choose your own according to your DAO's plans.</p></figcaption></figure>

#### Help with Rates

Consider the following example:

If you have a specified total amount of tokens, for example 100,000, that you are distributing with a 2-year vesting term, the calculation for streaming would be different than for monthly payments.

_For streaming:_ The vesting term spans 63,072,000 seconds, as there are 31,536,000 seconds in a year. Assuming your token has 18 decimals, you would calculate the rate of token distribution per second as follows: (100,000 \* (10^18)) / 63,072,000 = 1,585,489,599,188,230. If your token has a different number of decimals, replace 18 with the appropriate number in the formula.

_For monthly payments:_ Over a 2-year vesting term, there are 24 discrete periods (months). The calculation for the rate of token distribution per month would be: (100,000 / 24) \* (10^18) = 4,167 \* (10^18). This implies that 4,167 tokens will vest each month. However, in the last month, only 4,159 tokens will vest to complete the total distribution of 100,000 tokens.
