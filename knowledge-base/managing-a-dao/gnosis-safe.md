---
description: Understand Gnosis Safes on Tally.
---

# Gnosis Safes

> _It's easy to create or link a Gnosis Safe on Tally from_ [dao-settings.md](dao-settings.md "mention")_. Learn more about Gnosis Safes below, or skip right to the_ [_step-by-step instructions_](gnosis-safe.md#tally)_._

## Understanding Gnosis Safes <a href="#what" id="what"></a>

Gnosis Safe is a smart contract multi-sig wallet running on Ethereum that requires a minimum number of people to approve a transaction before it can occur. This added layer of security helps to protect against the loss or theft of funds.

Gnosis Safes are commonly used to manage pooled DAO funds. DAOs often require a certain number of members to sign off on any fund transfers. DAO actions are generally voted upon by all members and then executed by the core group of signers.

### How does a Gnosis Safe work? <a href="#how" id="how"></a>

A multi-sig Gnosis Safe works by requiring multiple signatures, or "keys," in order to execute a transaction. When the safe is created, the user specifies the number of keys that are required to sign a transaction before it is executed.

### What is the process for submitting a transaction with a Gnosis Safe? <a href="#transaction" id="transaction"></a>

To submit a transaction with a Gnosis Safe, you would first need to create the transaction on the Ethereum network. This can typically be done using a wallet or other Ethereum-enabled application. Once the transaction has been created, it must be signed by the required number of keys associated with the safe. This process typically involves each key holder using their own private key to sign the transaction. Once the transaction has been signed by the required number of keys, it can be submitted to the Ethereum network to be executed.

### What are Gnosis Safe assets and types? <a href="#types" id="types"></a>

Gnosis Safe supports Ether and all assets that fully comply with the [ERC20 standard](https://eips.ethereum.org/EIPS/eip-20). This includes assets such as DAI, USDC, UNI, and many others.

### What is a Gnosis Safe owner? <a href="#owner" id="owner"></a>

An Owner is a signer of the of the Gnosis Safe smart contract wallet. Owner accounts sign off on transactions on the Gnosis Safe smart contract, such as transferring funds from the wallet.

### What is a Gnosis Safe threshold? <a href="#threshold" id="threshold"></a>

The threshold is the number of signers required to confirm a transaction. Once the threshold of owner accounts have confirmed a transaction, the Safe transaction can be executed.

### What is a Gnosis Safe delegate? <a href="#delegate" id="delegate"></a>

Delegates are non-owners that are authorized to initiate transactions for a specific Safe which then would show up on the official Gnosis Safe interfaces. Delegates need to be authorized by an owner of a Safe.

Delegates can be viewed, added and removed via the [Safe transaction service](https://safe-transaction-mainnet.safe.global/).

## Gnosis Safes on Tally <a href="#tally" id="tally"></a>

To empower DAOs that use Gnosis Safes, Tally allows users to create or link their Safes to your DAO.

Creating a Gnosis Safe on Tally creates the exact same instance of Gnosis’s smart contract that Gnosis’s own app does, with the added benefit of managing it from the same Tally DAO that you may be using for Governor and Tokenless DAOs. Having your Gnosis Safe linked on Tally will also allow users to take advantage of Tally features such as the Create Proposal tool and Recipes.

<figure><img src="../../.gitbook/assets/CleanShot 2023-02-22 at 20.33.18@2x.png" alt=""><figcaption><p>Gnosis Safes tab in <a data-mention href="dao-settings.md">dao-settings.md</a>.</p></figcaption></figure>

### Create a Gnosis Safe

To create a new Gnosis Safe, simply select the **Create Safe** button from the Safes tab of the [dao-settings.md](dao-settings.md "mention") page.

<figure><img src="../../.gitbook/assets/CleanShot 2023-02-22 at 20.40.12@2x.png" alt=""><figcaption><p>Create a Gnosis Safe.</p></figcaption></figure>

Select the Safe's network, give it a name, add [Safe owners](gnosis-safe.md#owner) and set its [threshold](gnosis-safe.md#threshold). Then click the **Create Safe** button!

### Link a Gnosis Safe

To link an existing Gnosis Safe, select the **Link Safe** button from the Safes tab of the [dao-settings.md](dao-settings.md "mention") page.

<figure><img src="../../.gitbook/assets/CleanShot 2023-02-22 at 20.35.55@2x.png" alt=""><figcaption><p>Link a Gnosis Safe.</p></figcaption></figure>

Select the Safe's network, give it a name, and enter its address. Then simply click **Link Safe**!
