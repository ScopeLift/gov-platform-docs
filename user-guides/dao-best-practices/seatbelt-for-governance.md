---
description: >-
  Seatbelt automates proposal simulations and translates technical details into
  clear, actionable insights for all governance participants.
icon: memo-circle-check
---

# Seatbelt for governance

## What is Seatbelt?

Seatbelt is an automated simulation layer that [ScopeLift](https://scopelift.co/blog/seatbelt-for-governance) and [Uniswap Labs](https://blog.uniswap.org/governance-seatbelt) [built](https://blog.uniswap.org/governance-seatbelt) to pre-screen every on-chain proposal before execution. The tool replays a proposal in a local fork, captures all state changes and external calls, and outputs a PDF or HTML report in plain language. All processing occurs off-chain, so the simulation adds no gas cost and does not touch mainnet.

A small error in a proposal’s calldata like an incorrect parameter and/or a misplaced address can brick a treasury or block future upgrades. Seatbelt provides a final, automated check. In past Compound votes (examples [1](https://www.tally.xyz/gov/compound/proposal/94), [2](https://www.tally.xyz/gov/compound/proposal/95), and [3](https://www.tally.xyz/gov/compound/proposal/99)), the simulator identified transactions that would have reverted on execution, allowing proposers to fix the issue before the vote closed.

## How seatbelt works

Every few hours Seatbelt scans supported organizations for active proposals, forks the chain at the current block, and runs each candidate through [Tenderly](https://tenderly.co/transaction-simulator/). The resulting trace is parsed for:

* State-variable mutations
* External contract calls and target addresses
* Emitted events
* Compiler warnings
* Static-analysis findings from [Slither](https://github.com/crytic/slither) (by Trail of Bits)

The fork can override timestamps, block numbers, and quorum thresholds, so Seatbelt handles both Governor Bravo and OpenZeppelin Governor instances without manual configuration.

## Stakeholder impact

* **Delegates and token-holders** receive a one-page summary that describes the intended changes in ordinary language, removing the need to inspect raw calldata.
* **Proposal authors** get a low-overhead linting step to catch mistakes before submission.
* **Governance and operations** teams see fewer failed executions and less emergency remediation work.

## Seatbelt implementation

Seatbelt currently runs on Uniswap, Compound, and ENS. Additional organizations can opt in by submitting a pull request to the Seatbelt repository or by contacting Tally. The same simulation routine can be executed locally for ad-hoc checks; the local output matches the report served to delegates.

\
Helpful resources
-----------------

* [Adding a “Seatbelt” to Secure Governance Proposals](https://blog.uniswap.org/governance-seatbelt)&#x20;
* [Seatbelt GitHub Repository](https://github.com/uniswapfoundation/governance-seatbelt/actions/runs/15071483827)
* [Scopelift technical update and walkthrough of Seatbelt](https://scopelift.co/blog/seatbelt-for-governance)

\
