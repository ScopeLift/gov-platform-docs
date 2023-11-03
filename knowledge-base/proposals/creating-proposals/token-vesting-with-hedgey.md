---
description: Learn how to propose token vesting plans with Hedgey on Tally.
---

# Token Vesting with Hedgey

Using [Hedgey](https://hedgey.finance/), you can make a proposal for ERC-20 token vesting plans. Token vesting plans allow onchain teams to issue vesting token plans to members, mirroring traditional vesting with features like cliffs, flexible schedules, and backdated start dates. It's fully onchain, revocable, and customized for onchain teams' needs.

Key features include linear/periodic unlock strategies, onchain governance voting, customizable dates, governance rights to vesting tokens, admin features for transferring vesting plans, delegation of vesting plans to multiple addresses, and beneficiaries' ability to claim tokens at their discretion. The contracts are fully onchain, ensuring interaction even without Hedgey UIs​​.

## How to call Hedgey’s Contract

You can create vesting plans one at a time or multiple in the same transaction.

### Creating Vesting Plans One at a Time

1. Enter the batchplanner address (0x3466EB008EDD8d5052446293D1a7D212cb65C646) into “Target contract address” under “Add actions” while creating your proposal on Tally.

<figure><img src="../../../.gitbook/assets/Screenshot 2023-11-03 at 2.46.52 pm.png" alt=""><figcaption></figcaption></figure>

2. Select "createPlan" under "Contract method" and input calldatas.

* **Recipient:** the address of the recipient of the vesting plan
* **Token:** the address of the ERC20 token (typically your DAO native token)
* **Amount:** the total amount granted in the vesting plan
* **Start:** the unix timestamp when tokens start vesting
* **Cliff:** an optional cliff date, when tokens begin their first unlock discretely after the start date. If not desired you can enter 0 or the same time as the start date
* R**ate:** the rate at which tokens will vest over the ‘period’
* **Period:** the amount of seconds in a period. For Streaming version use 1. For Monthly periods use 2,628,000. For Daily use 86,400, for weekly: 604,800 (as examples)
* **VestingAdmin:** the DAO contract address, or another mutlisig address used to revoke the plan&#x20;
* a**dminTransferOBO:** toggle on or off the ability for the VestingAdmin to transfer the plan to a different recipient wallet after issuance to be used in case of emergency

<figure><img src="../../../.gitbook/assets/Screenshot 2023-11-03 at 2.54.43 pm.png" alt=""><figcaption><p>The calldatas in this image are examples only.</p></figcaption></figure>

#### Help with Rates

Consider the following example:

If you have a specified total amount of tokens, for example 100,000, that you are distributing with a 2-year vesting term, the calculation for streaming would be different than for monthly payments.

_For streaming:_ The vesting term spans 63,072,000 seconds, as there are 31,536,000 seconds in a year. Assuming your token has 18 decimals, you would calculate the rate of token distribution per second as follows: (100,000 \* (10^18)) / 63,072,000 = 1,585,489,599,188,230. If your token has a different number of decimals, replace 18 with the appropriate number in the formula.

_For monthly payments:_ Over a 2-year vesting term, there are 24 discrete periods (months). The calculation for the rate of token distribution per month would be: (100,000 / 24) \* (10^18) = 4,167 \* (10^18). This implies that 4,167 tokens will vest each month. However, in the last month, only 4,159 tokens will vest to complete the total distribution of 100,000 tokens.

### Creating Multiple Plans in the Same Transaction

You can batch together and create multiple plans in the same transaction using an intermediary batching contract.&#x20;

To do this, create a proposal on Tally with the following:

* **Target contract address:** 0x3466EB008EDD8d5052446293D1a7D212cb65C646
* **Contract method:** batchVestingPlans

Then, input the parameters as follows:

* **Locker:** 0x2CDE9919e81b20B4B33DD562a48a84b54C48F00C (address of the vesting plans contract)
* T**oken:** address of your DAO token
* **totalAmount:** the total amount of tokens to be distributed to vesting recipients
* **Plans:** this is an array (tuple) of vesting plans that look like the following: \[\["0x0C4FAb8d9DBE774708EeC313bf0295278E307bcD", "100000000000000000000000", 1696161600, 1696161600, "1585489599188230"],\["0x0C4FAb8d9DBE774708EeC313bf0295278E307bcD", "100000000000000000000000", 1696161600, 1696161600, "1585489599188230"]], which coincides with \[“recipientAddress1”,”amountOfTokensForVestingPlan1”,”startDateForPlan1”,”cliffDateForPlan1”,”rateForPlan1”]
* **Period:** the seconds in the period for vesting, so for instance use a 1 for a streaming style period.
* **vestingAdmin:** the admin of the vesting plans who can revoke plans
* **adminTransferOBO:** this allows the vestingAdmin to transfer plans on the recipients behalf in the case of emergency
* m**intType:** 4; this is a specific number for the Hedgey dApp to display things properly.&#x20;

_Note all of the plans batched need to have the same period and vesting admin._\


<figure><img src="https://lh7-us.googleusercontent.com/BZjOrrSsjquvC5hPvxl3J1gI2p_VCuGI_Q71O5bR7TQAw9w6XT6Gm7yt3X1DhR2i25_Ca0ae0HhqjlUe1oNLzRP4PFNa3Zh1tLCBdyMocXr_JNLUacxszY5c6zN9Ui1rKRdVF83fcSNLHPruwqFNaCM" alt=""><figcaption></figcaption></figure>
