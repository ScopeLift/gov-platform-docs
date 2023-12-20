---
description: >-
  Say goodbye to inconsistent and unpredictable block-denominated time durations
  and hello to human readable timestamps!
---

# Clock Mode

Managing durations in terms of block numbers can be challenging, especially on certain L2 networks where block production varies based on blockchain activity. This variability can impact governance rules, particularly when network upgrades alter the frequency of block creation.

### Contract Compatibility

When considering the transition from block numbers to timestamps, it's crucial to ensure compatibility between the Governor and the token in terms of how past votes are queried. If a token is configured to operate based on block numbers, it becomes difficult for a Governor to conduct accurate searches using timestamps.

Both Governor and token code must be v4.9 and above. If you update your token code to use timestamps, make sure to also update your Governor code.

You can check compatibility [here](https://docs.openzeppelin.com/contracts/4.x/governance#disclaimer).
