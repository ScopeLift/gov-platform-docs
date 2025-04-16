---
description: The Tally API is in open beta!
icon: computer
---

# Tally API

The [Tally API](https://apidocs.tally.xyz/) makes it easy to query onchain data about Governor DAOs. List Governors, onchain proposals, and accounts with delegations. Use the API to build notifications, dig into voter data or build governance right into your game or app.

Whether you're a developer, a data enthusiast, or an organization aiming to integrate governance into your platform, the Tally API is designed with you in mind.

> **Interested in learning more? Email** [**biz@tally.xyz**](mailto:biz@tally.xyz) **to set up a chat with our team!**

### Why choose the Tally API?

* **Comprehensive Data Access:** Dive deep into the world of Governor DAOs. From listing Governors to exploring on-chain proposals and accounts with delegations, we've got you covered.&#x20;
* **Versatility:** Dreaming of building a notification system for DAO proposals? Or perhaps integrating governance mechanics into your next big game? The Tally API supports a myriad of applications.&#x20;
* **Ease of Use:** With our GraphQL-based API, you only request the data you need. Plus, with GraphQL's self-documenting nature, you'll find it a breeze to navigate and understand our API's capabilities.&#x20;
* **Robust Support:** Our community and support channels are always ready to assist. Whether you're just getting started or need advanced technical support, we're here for you in our Discord.

***

## How to Use the Tally API

### Get an API key

To get started, you'll need an API key. Sign in to Tally. On your [User Settings Page](https://www.tally.xyz/user/settings), see the "Tally API" section. Generate an API key, and keep it somewhere safe.

You'll need to **include that API key as an HTTP header with every request**, i.e. `{"Api-Key": "YOUR_KEY_HERE"}`&#x20;

<figure><img src="../.gitbook/assets/image (1) (1) (1) (1) (1).png" alt=""><figcaption><p>User Settings Page</p></figcaption></figure>

### Quickstart example

To get started quickly, check out the [Tally API quickstart example](https://github.com/withtally/tally-api-quickstart). This simple React app uses Tally's API to list DAOs and their proposals.

### API docs

The public API is documented on [this site](https://apidocs.tally.xyz/). The API is a graphql API lets you request exactly the data you need.

### Graphql playground

One big advantage of graphql is that it's self-documenting. Check out the [Graphql API Playground](https://api.tally.xyz/playground). You'll need to **add your API key in the "Request Headers" section**, like this: `{"Api-key": "YOUR_KEY_HERE"}`&#x20;

Note that the playground also includes undocumented endpoints. Using them is not recommended for production apps, because they are subject to change without notice.

<figure><img src="../.gitbook/assets/image (1) (1) (1) (1) (1) (1).png" alt=""><figcaption><p>Graphql Playground</p></figcaption></figure>

### Rate limits

Free Tally API keys are rate-limited to \~1 request per second. If you'd like to switch to the paid tier to increase your rate limit, reach out on the [#support channel on Discord](https://discord.com/invite/sCGnpWH3m4).

