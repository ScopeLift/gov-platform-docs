---
description: >-
  Arbitrum DAO requires proposers to use custom actions to initiate token
  transfers.
---

# Token Transfer Proposals in Arbitrum DAO

Because of the way Arbitrum DAO's timelocks are set up, the preset 'Transfer' action on Tally is unable to issue ARB from the treasury. The proposer must instead use the 'Custom Action' flow to call transfer().

For more information on how to create proposals in the Arbitrum DAO, please review the [Arbitrum DAO Governance Docs](https://docs.arbitrum.foundation/how-tos/create-submit-dao-proposal). This section expands on step 2.6 of the process for creating a proposal in the Arbitrum DAO: “Add proposal actions to be executed if passed.”

### How to add proposal actions on Tally for Arbitrum DAO

_For this guide, we will use the example of a proposal that transfers ARB from the DAO treasury._

1.  Create an Arbitrum proposal and select “Arbitrum Treasury”\
    \


    <figure><img src="https://lh3.googleusercontent.com/X3bMkyyPPeY8mRw89EgRmwZDeZmqN-DPx_w6R7RHYWoYnh4ND8dQhlxi2XHWS0lR04RnmHnxO5b3P5rqFudd4v-hAKJrhSkrJXa6-88rcyKcdUYnpguqUfvgCYwiYytp8bqQhaW5Njq2kC_2vBsj-3E" alt=""><figcaption></figcaption></figure>
2.  Select “Custom action”\
    \


    <figure><img src="https://lh6.googleusercontent.com/RvXUmou2bGegTZwGwuIrd0DS3_bWu81-WLotCjI0QqHyNvt0sEVeBQb3He6eK8GaHYOtRLbRzJky1ILTdcy59BWuSwUFZiHWCKkB1tWl-c81ZaM8oK99_6SkSTiebdlvEEF3wpGo2ViyMr8NxZCLnoQ" alt=""><figcaption></figcaption></figure>
3.  Set the target contract address to 0xF3FC178157fb3c87548bAA86F9d24BA38E649B58 (this is the Arbitrum Treasury address).\
    \


    <figure><img src="https://lh4.googleusercontent.com/jlPo1pj8ypJLXgO304Jd20ew1l9qE7tCOsEuM6Ou7Q7rbKrILfpCzx8I3uMPn9AqL9Sca0xXcn3JjVjrkDrOzLPaqi0VSMRizt6Zebt2jkxxahy_fgYY8fbnNEg0wV0Z-_Oh-Q-lKF3Jt9UXLRnEy2Q" alt=""><figcaption></figcaption></figure>
4. Select “Use the imported ABI”.

<figure><img src="https://lh6.googleusercontent.com/rcMXY7AwDXrG_4xWYre6taY6mcdbqgsmhfrl7mZBb8s2MxcHbM1zxZSwH4fPamCQZsIp22_xLMfOenafmMIA1KbgMUu4f5RmlxycJ9cLHA_bUv076ALCqTSbJgI9i2quXhdhYoNAgwvGV4KqZap8xQE" alt=""><figcaption></figcaption></figure>

5. Select the contract method and fill out the calldatas

* select `transfer`
* set `token_` to 0x912ce59144191c1204e64559fe8253a0e49e6548

Select the recipient and amount. Be sure to get the decimals right on the amount (many folks find E[TH Converter](https://eth-converter.com/) to be helpful with decimals).

<figure><img src="https://lh6.googleusercontent.com/yaHeKYjHwfbceJgxte7Cx6QrFErE8C5gWWhl9XXL0D9B1PBsUA-EZadBmVQCwaZ-Vg7iAyuc6c3s23-a1QMtlM9VoBFzahZRaD0dOprYkHq-hnhaVZbF9mzVTjABTx0BVLZE2N0pqUlZT8RE7jqDsn0" alt=""><figcaption></figcaption></figure>
