# Signal Voting

[Multisig governance](../../../how-to-use-tally/proposals/voting-on-proposals/making-onchain-transactions-as-safe.md) is typically paired with a signal voting mechanism to maintain legitimacy. As an example, Yearn, Synthetix, and Sushiswap all use the Snapshot voting tool to let token holders make key decisions and delegate authority.

After considering a proposal in the community's discussion venue, a signal vote will be held to assess support. While this typically involves voting with Snapshot, in some cases communities may use onchain signal voting (eg. early Yearn [ygov.finance voting tool](https://ygov.finance/vote)) or off chain voting which is weighted by user accounts instead of token holdings (eg. polls in Discourse forums or Discord).

Regardless of voting system used (on or off chain, weighted by users or token holdings), the vote itself doesn't trigger execution of the proposal's effects. Instead, the vote serves as instructions for the multisig signers to execute the proposal using their admin priveledges.
