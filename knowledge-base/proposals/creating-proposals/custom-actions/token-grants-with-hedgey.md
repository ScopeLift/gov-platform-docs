---
description: Learn how to propose token grants with Hedgey on Tally.
---

# Token Grants with Hedgey

Using [Hedgey](http://app.hedgey.finance), you can make a proposal for your DAO to distribute grants directly to grant recipients. Token Grants allow your DAO to distribute tokens for incentives, and other reward mechanisms to spur ecosystem development, decentralization, and proliferation.&#x20;

Grants by Hedgey come in a few forms, so it is important to decide beforehand which version is most appropriate for your grant needs. Grants is at its core a simple distribution mechanism to distribute tokens to the grantees, with a public dashboard, and bake in time based milestones when the grantees will receive the tokens. Grants can be either revocable, or non-revocable, include ability to participate in governance with Tally, or can prevented from governance participation. Other key features include linear (streaming) or periodic time-based distribution schedules.

#### Revocable vs Non-revocable Grants

For your grants distribution, you will need to make a decision on whether grants are revocable or not. A good rule of thumb is that for retroactive public goods funding, and other retroactive grants mechanisms, the milestones have already been achieved; so, the non-revocable grant is a great distribution mechanism to distribute tokens over time automatically, instead of simply disbursing tokens directly.&#x20;

Conversely, revocable grants are a solution for grantees that are expected to perform tasks and achieve milestones, or distribute incentives and rewards, in the future. With a revocable grant, if the grantee does not meet their milestones, or for any other reason, the DAO can claw back the tokens from the grantee based on their vesting schedule - which is often configured to align with the time based milestones.&#x20;

## Preparation

Before creating the grants proposal, you should prepare the data that will be pasted into Tally and be delivered to the Hedgey smart contract upon execution of the approved proposal.&#x20;

#### Requirements:&#x20;

1. Token Contract Address: _\<ERC-20 Token Contract Address>_
2. Hedgey Batch Contract Address: 0x3466EB008EDD8d5052446293D1a7D212cb65C646
3. Hedgey Grants Contract: _\<Hedgey Smart contract - depends on revocable & voting grid below>_

| Hedgey Grants Contracts | Revocable                                  | Not Revocable                              |
| ----------------------- | ------------------------------------------ | ------------------------------------------ |
| Allows Tally Governance | 0x1bb64AF7FE05fc69c740609267d2AbE3e119Ef82 | 0x73cD8626b3cD47B009E68380720CFE6679A3Ec3D |
| No Tally Governance     | 0x2CDE9919e81b20B4B33DD562a48a84b54C48F00C | 0x1961A23409CA59EEDCA6a99c97E4087DaD752486 |

4. Distribution Frequency / Period: This determines (in seconds) how frequently tokens are distributed to grantees. For the “streaming” version, this would be 1, where a small amount of tokens is distributed and claimable each second. Here are some other handy periods:&#x20;

| Frequency                     | Value for Period |
| ----------------------------- | ---------------- |
| Streaming / Linear per second | 1                |
| Daily                         | 86,400           |
| Weekly                        | 604,800          |
| Every 2 Weeks                 | 1,209,600        |
| Monthly                       | 2,628,000        |
| Quarterly                     | 7,884,000        |
| Annually                      | 31,536,000       |

5. &#x20;Grant Recipients Details:&#x20;
   1. Recipient Address
   2. Total amount of Tokens to be distributed
   3. Start date (in unix time)
   4. Cliff date (in unix time)
   5. Rate: the amount of tokens that vest in each period

You can use [this link](https://docs.google.com/spreadsheets/d/1uPW2cqSK\_aXuOR873b\_Q\_Zajx0P4Czq7P9Riqy\_Nm5s/edit?usp=sharing) and make a copy to help you create the plans, input the items in orange, and then you’ll have your finished Tuple of Plans in cell B6 to copy into Tally.&#x20;

## How to Create the Grants Distributions

With your prepared data at hand, navigate to the Tally portal and create your proposal. In the "Custom Actions" section, you will need to input two actions: the first is the ERC-20 token allowance approval, and the second is the actual Hedgey Grants creation transaction.&#x20;

#### Action #1&#x20;

1. Target Contract address: the Address of your DAO Token or ERC-20 Token to be used for grants
2. Contract method: ‘approve’
3. Calldatas:\
   spender: 0x3466EB008EDD8d5052446293D1a7D212cb65C646 (the Hedgey Batch Planner contract address)
4. amount: the total amount that you will deploy in the grants batch

<figure><img src="https://lh7-us.googleusercontent.com/xt0aLOthGx46QjL0PHIx0GOqi__U28DXSn8GQoF23lSwteqbtWT-uvlrVMf9m8WWrPX2lXugtE8jKi1IHcW__W6TWsWQhVvD1gFQJmuEEMGtqyfpYvLrCzRJWxgSkPXQjcSfKjb4wLLIlqMyyFtfMKo" alt=""><figcaption></figcaption></figure>

#### Action #2

Paste in the BatchPlanner contract 0x3466EB008EDD8d5052446293D1a7D212cb65C646, and then we need to select one of two methods.&#x20;

If you are distributing Revocable Grants, choose the “batchVestingPlans” method. If you are distributing Non-revocable Grants, choose the “batchLockingPlans” method.&#x20;

<figure><img src="https://lh7-us.googleusercontent.com/oiy0ooT4HjX4K7IYHswxvpV2Y0C4h2NEHUocj6TgZYooT7RdYGtNAmHZaX8KLeHJYfJ85FpwzthB7_54nTbnQFj4b0XhDWCpR971oKY4wmOveUAcSjeJlwP-nna2I1lu49wMdO3R6eCbcf1xab0Y4x4" alt=""><figcaption></figcaption></figure>

Inputs are as follows:

* Locker: _\<Hedgey Contract Address>_
* Token: address of your DAO token
* totalAmount: the total amount of tokens to be distributed to grant recipients
* Plans: this is an array (tuple) of each grants plan, which you can paste in the details of each recipient individually
  * Recipient: address of grant recipient
  * Amount: total amount of tokens they will granted (include decimals)
  * Start: Unix time stamp of when the unlocking will start
  * Cliff: Unix time stamp of an optional cliff, if no cliff you can input 0 or the start date
  * Rate: The amount of tokens that unlock each period - use the spreadsheet helper
* Period: the seconds in the period for vesting&#x20;
* vestingAdmin: the admin of the vesting plans who can revoke plans - only for revocable grants
* adminTransferOBO: this allows the vestingAdmin to transfer plans on the recipients behalf in the case of emergency
* mintType: 7; this is a specific number for the Hedgey dApp to display things properly

<figure><img src="https://lh7-us.googleusercontent.com/hemppymVrgav0GrGzDKVCAQg-STg74j5FKae_UnnFc6p5NrGzE93-KNK5iw_lxZmBt1PmZhOjZJeXSnoRvCt6cEKwkiUDzm7Hze5GAyl4hXXQyc1tVRRQlr4t2ylbsFIFO2ADOyQ3B6h0OkTTeYyUBo" alt=""><figcaption><p>Example of Revocable Grant</p></figcaption></figure>

For non-revocable grants, still use mintType 7, but the vestingAdmin and adminTransferOBO functions will not be required.

<figure><img src="https://lh7-us.googleusercontent.com/DyCgOIUBSSGkRHAofduFe37eXt-gXezhalzJ5DgPLQ_S6-vLrXxODJMyM_5c6jZObOMVlL-6V4UF_r_tn47-xMMAECSXp-GIQoIxThUsLoIlqOJP-yKDAqik-bsfeMQAIGtU7MyenXRLDCwG2Nw1kyw" alt=""><figcaption><p>Example of Non-revocable Grant</p></figcaption></figure>
