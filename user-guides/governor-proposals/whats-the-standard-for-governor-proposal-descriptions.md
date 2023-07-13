# What’s the standard for Governor proposal descriptions?

Ever since [Compound Governor Alpha](https://docs.compound.finance/v2/governance/#governance), Governor proposals have had an onchain, human-readable \`description\` field. Governor front ends like Tally, Compound and others follow this de-facto standard:

1. Proposal descriptions should be markdown text
2. The first line of the description, regardless of format, is the title
3. Everything after the first newline is the body of the proposal. Frontends should renderer it as markdown

If a proposal description doesn’t follow this standard, Tally’s frontend will make a best-effort to render it, but it might look weird.

{% hint style="info" %}
If there’s a proposal whose on-chain description isn’t rendering right, reach out to Tally support. Tally may be able to add a note about the formatting errors or add a cleaner description to supplement the on-chain one.
{% endhint %}
