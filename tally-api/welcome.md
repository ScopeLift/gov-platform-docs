---
description: The Tally API is in closed beta!
---

# 👩💻 Tally API

The Tally API makes it easy to query on-chain data about Governor DAOs. List Governors, on-chain proposals, and accounts with delegations.

Use the API to build notifications, dig into voter data or build governance right into your game or app.

### Request an API key

To get started, you'll need an API key. To request one, fill out [this form](https://notionforms.io/forms/tally-api)! &#x20;

You'll need to include that API key as an HTTP header with every request, i.e. `{"Api-key": "YOUR_KEY_HERE"}`&#x20;

### Quickstart example

To get started quickly, check out the [Tally API quickstart example](https://github.com/withtally/tally-api-quickstart). This simple React app uses Tally's API to list DAOs and their proposals.

### API docs

The public API is documented on [this site](https://apidocs.tally.xyz/). The API is a graphql API lets you request exactly the data you need.

### Graphql playground

One big advantage of graphql is that it's self-documenting. Check out the [Graphql API Playground](https://api.tally.xyz/playground). You'll need to add your API key in the "Request Headers" section, like this: `{"Api-key": "YOUR_KEY_HERE"}`&#x20;

Note that the playground also includes undocumented endpoints. Using them is not recommended for production apps, because they are subject to change without notice.

### Rate limits

Free Tally API keys are rate-limited. If you'd like to increase your rate limit, reach out to support@tally.xyz.\
