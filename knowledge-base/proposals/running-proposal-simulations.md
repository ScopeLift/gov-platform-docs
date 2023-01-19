# Running Proposal Simulations

_Having successful validations will give proposers, voters, and executors confidence that the proposal is valid. The Proposal Simulations feature is currently in beta and runs via the Tenderly Simulator API. Tally simulates the execution of the proposal assuming it is successful and queued on a fork of your DAO's network. From there, Tally runs each executable payload, impersonating the treasury (usually the timelock)._

When creating a proposal on Tally, the API will automatically run a simulation for the executable payload provided. You can view the result of this simulation in the Executable code tab of the proposal details. Each function will have its own result.&#x20;

![](https://p434.p1.n0.cdn.getcloudapp.com/items/d5uyw5Xz/28394171-2a60-43c8-83c8-503bde80b849.jpg?v=69e726e7f4645e69d2748c4be5e6410d)

If one function fails, it is likely that the proposal execution will fail. If the function failed, click **View raw result** to inspect the response from the Tenderly Simulator API for additional insights. If the function fails or in cases when state changes may impact the success of a function, you may also want to re-run the simulation of the proposal.

For example, a DAO proposes to transfer 1 ETH to an address, but their treasury has 0 ETH. As you might expect, the simulation result fails. From there, the DAO funds their treasury with 2 ETH; click **Re-run** to re-simulate the proposal. You should now expect a successful proposal!
