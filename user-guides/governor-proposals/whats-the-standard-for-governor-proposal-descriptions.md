# Governor Proposal Descriptions Standards

Ever since [Compound Governor Alpha](https://docs.compound.finance/v2/governance/#governance), Governor proposals have had an onchain, human-readable \`description\` field. Governor frontends like Tally, Compound and others follow this de-facto standard:

1. Proposal descriptions should be markdown text
2. The first line of the description, regardless of format, is the title
3. Everything after the first newline is the body of the proposal. Frontends should renderer it as markdown

If a proposal description doesn’t follow this standard, Tally’s frontend will make a best-effort to render it, but it might not appear as intended.

{% hint style="info" %}
If there’s a proposal that's onchain description isn’t rendering correctly, reach out to Tally support. Tally may be able to add a note about the formatting errors or add a cleaner description to supplement the on-chain one.
{% endhint %}
