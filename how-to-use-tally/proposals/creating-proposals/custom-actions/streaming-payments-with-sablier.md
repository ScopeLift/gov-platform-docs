---
description: Learn how to propose streaming payments with Sablier on Tally.
---

# Streaming Payments with Sablier

Using [Sablier](https://sablier.com), you can make a proposal on Tally to stream ERC-20 tokens.&#x20;

Streaming refers to the continuous transfer of tokens over time from one account to another. Instead of sending a lump sum of tokens in a single transaction, streaming allows for the gradual and real-time transfer of funds.

Streaming can be used for vesting, airdrops, grants, payroll, etc. You can read more about the benefits of streaming for organizations [here](https://sablier.com/organizations/) and [here](https://blog.sablier.com/why-your-treasury-manager-will-love-sablier-and-you-too/).

### How to call Sablier's contract

To call Sablier's contract, there are three steps:

1. Find the [address of Sablier contract](https://docs.sablier.com/contracts/v2/deployments) on your DAO's network.
2. Enter that address into Tally's Custom action.&#x20;

<figure><img src="../../../../.gitbook/assets/image (1) (1).png" alt=""><figcaption></figcaption></figure>

3. Pick the method that you want to call.&#x20;

<figure><img src="../../../../.gitbook/assets/image (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

## How to make a proposal to stream ERC-20 tokens

### Spending Approval

Before interacting with the Sablier contracts, the first step is to approve the spending of the token you are looking to use. If you want to stream DAI, for example, you will need to approve the spending of a certain amount of DAI. This is not done in our own contracts, but instead, in the contract of the token you are looking to spend.

The ERC-20 implementation has a function called `approve`, which is the function we are going to call. Let’s say we want to stream 3141 DAI. The approval call will look like this:

```jsx
Signature: approve(address,uint256)

Calldata:
address: 0xB10daee1FCF62243aE27776D7a92D39dC8740f95
uint256: 3141000000000000000000

Target: 0x6B175474E89094C44Da98b954EedeAC495271d0F
Value: 0
```

In the example above, the `Signature` field highlights the function to be called. In the `Calldata` field, the `address` field is the contract address of the Sablier contract you are looking to interact with, and `uint256` is the amount of tokens you are looking to spend, decimals included.

This is important. Different tokens have different amounts of decimals. For example, USDC has 6 decimals and DAI has 18 decimals.

If the token you are looking to spend has 18 decimals, as is the case with DAI, you will need to add eighteen 0s to the amount you are looking to spend. If you want to stream 542 DAI, that means that the actual amount you will need to put in will be `542000000000000000000`.

_Note:_ If the amount you are trying to send already has decimals (for example, 124.5 DAI), you will need to subtract the amount of decimals in the amount from the amount of 0s that you need to add. To make this clearer, if you are looking to stream 124.5 DAI, meaning an amount with 1 decimal, you will only need to add seventeen 0s as opposed to eighteen, as there is already a decimal included in the amount. In this case, the deposit amount will look like this: 124500000000000000000."

Finally, the `Target` value is the contract address of the token you are looking to stream, with the `Value` field having no relevance here given we won’t spend any ETH in this transaction; we are merely approving the spending of a certain ERC-20 token.

On every chain Sablier is deployed on, there are two contracts you can interact with to create streams:

* **SablierV2LockupLinear:** allows you to create linear streams, with or without cliffs.
* **SablierV2LockupDynamic:** allows you to create streams with dynamic payment curves, including non-linear ones.

More can be read about the different types of streams [here](https://docs.sablier.com/concepts/protocol/stream-types). Depending on which contract you are looking to interact with, and on which chain you are will be doing so, the contract addresses will change. Head over [here](https://docs.sablier.com/contracts/v2/deployments) to find the right contract address.

We have approved the spending of our token, so we can create the actual stream now.

### Stream Creation

In this example, we will focus on LockupLinear as opposed to LockupDynamic, as interacting with the latter is harder. We recommend reaching out to the Sablier team if you are interested in doing that.

There are two ways to create a stream in LockupLinear:

* **CreateWithDurations:** allows you to create a stream that will start as soon as the stream creation transaction is included in the blockchain, which will run for a specific duration.
* **CreateWithRange:** allows you to create a stream that will start on a specific date and will end on a specific date.

Both ways support cliffs, and differ only slightly in the way you call them programmatically in Sablier's contracts.

Here is an example of what a function call with `CreateWithRange` looks like:

```jsx
Signature: createWithRange(tuple)

Calldata:
tuple: [0xB57Ab8767CAe33bE61fF15167134861865F7D22C, 0xC09c8905cd3112deE53BbFBdeBC1e9C9963BD325, 3141000000000000000000, 0x6B175474E89094C44Da98b954EedeAC495271d0F, true, true, [1689811200, 1689811200, 1721433600], [0x0000000000000000000000000000000000000000, 0]]

Target: 0xB10daee1FCF62243aE27776D7a92D39dC8740f95
Value: 0
```

As in the previous spending approval example, the `Signature` field highlights the function we are calling. The `Target` field represents the contract we are calling, which in this case is the SablierV2LockupLinear contract on Mainnet. And as in our last example, the `Value` field can be set to `0`.

We will now take an interest in the `Calldata` field, and specifically the `tuple` it contains.

The structure of the tuple is as follows:

```jsx
tuple: [
  sender address,
  recipient address,
  amount (decimals included),
  token contract address,
  cancelable (true/false),
  transferable (true/false),
  [
    start date (unix timesteamp),
    cliff date (unix timesteamp),
    end date (unix timesteamp)
  ],
  [
    broker address,
    broker fee
  ]
]
```

Let’s go over them one by one:

* **sender address:** this is the address you are funding the stream with, which will also have the ability to cancel the stream.
* **recipient address:** the address you are looking to stream the funds to. They will be able to subsequently withdraw funds from the stream.
* **amount (decimals included):** the amount of tokens you are looking to stream, with decimals included, as previously explained. Numbers have to be sent between quotation marks, meaning if a parameter's value is 100.0, it should be written as "100.0".
* **token contract address:** the contract address of the ERC-20 token you are looking to stream.
* **cancelable (true/false):** whether or not the stream should be cancelable. We will go over this more in a minute.
* transferable (true/false): whether or not the stream is transferable to someone else. We will go over this more in a minute.
* **start date (unix timestamp):** the start date of the stream, as a UNIX timestamp. The Unix Timestamp is in seconds, not to be confused with milliseconds.
* **cliff date (unix timestamp):** the cliff date of the stream, as a UNIX timestamp. We will go over this more in a minute.
* **end date (unix timestamp):** the end date of the stream.
* **broker address:** the broker address. If you don’t know what this is, you don't need it. Simply set it to `0x0000000000000000000000000000000000000000` as laid out in the example.
* **broker fee:** the broker fee. Again, if you don’t know what this is, you don’t need it. Simply set it to `0`.

Regarding cancelation, all streams in Sablier V2 have a cancelation setting.

If it’s set to `true`, that means that the stream can be canceled at any time by the stream creator. The stream creator is the DAO. Canceling the stream will stop it and return the funds which haven’t yet been streamed over to the stream creator. If the DAO wants to cancel a cancellable stream, generally that will require another proposal.

If it’s set to `false`, the stream is non-cancelable, which means that it cannot be stopped. The recipient is then guaranteed to receive the funds in the stream, no matter what happens. Setting the stream as non-cancelable is an irreversible action, there’s no way to make it cancelable afterwards.

Regarding transferability, all streams in Sablier V2 are represented by an NFT owned by the stream recipient. Whoever owns the NFT is the recipient of the stream.

If transferability is set to true, the NFT (and by extension the stream) is transferable to someone else. This means the recipient could send the stream over to another address they own, or they could send it over to someone else. It also means the stream could be sold on OpenSea by the recipient without the vesting period being over. Or they could theoretically borrow against it in an NFT lending protocol by using it as collateral.

If transferability is set to false, the NFT cannot be transferred to someone else. The recipient will not be able to sell it to someone else on a marketplace like OpenSea, and they won’t be able to borrow against it in an NFT lending protocol.

Regarding the cliff date, it’s a cut-off point for releasing assets. Prior to the cliff, the recipient cannot withdraw, though assets continue to accrue in the stream. If you don’t want a cliff, you simply set the same date there as the start date.

If you want a cliff, you can set a date in the future depending on how long you want your cliff to last. If you want a 1-month cliff, and your stream starts on January 1st, your will cliff date will need to be on February 1st.

`CreateWithDuration` differs only slightly, as can be seen in the following `tuple`:

```jsx
tuple: [
  sender address,
  recipient address,
  amount (decimals included),
  token contract address,
  cancelable (true/false),
  transferable (true/false),
  [
    cliff duration (seconds),
    total (seconds)
  ],
  [
    broker address,
    broker fee
  ]
]
```

As you may have noticed, the only different part is the following section:

```jsx
[
  cliff duration (seconds),
  total (seconds)
]
```

Instead of having a start date, cliff date, and end date, as in `CreateWithRange`, the `CreateWithDurations` function only requires a cliff duration (in seconds), and the total stream duration (also in seconds).

There is no start date or end date required, as the stream will start as soon as the stream creation transaction is validated. Once that’s done, the stream starts and will last for the `total` duration.
