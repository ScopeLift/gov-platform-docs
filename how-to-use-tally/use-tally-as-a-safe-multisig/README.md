---
description: >-
  Tally enables onchain transactions via Safe, including submitting proposals,
  voting, and delegating.
icon: shield-plus
---

# Use Tally as a Safe multisig

Safe wallet users can now sign in directly to Tally using WalletConnect. The flow detects Safe smart contract wallets and presents a unified authentication experience.\


### 1. Connect Safe wallet

* Select Connect Wallet and choose WalletConnect.
* [How to Connect a Safe using WalletConnect](https://help.safe.global/en/articles/108235-how-to-connect-a-safe-to-a-dapp-using-walletconnect).
* Tally detects  the connected wallet is a smart contract wallet (Safe).

### 2. Safe wallet detected

* Tally will automatically detect the Safe wallet
* Multiple signatures may be required&#x20;
* Do not close the window while the signing flow is in progress

### 3. Safe authentication flow

* A sign in message will appear
* A Safe transaction URL is generated and displayed:
  * This URL can be shared with co-signers for multi-sig Safes

### 4. Sign the safe transaction

* Complete signing process through Safe’s interface
* Submit message

### 5. Authentication complete

* Tally verifies the signed message
* The user is now authenticated as their Safe wallet

### 6. Use Tally as a Safe multisig&#x20;

* Users can now:
  * Update their Tally profiles
  * Participate in governance by voting and/or delegating
  * Execute on-chain transactions

\
\


You can also sign in as Safe using WalletConnect from the Safe mobile app, following:

* [Mobile instructions](https://help.safe.global/en/articles/40810-connect-to-dapps-with-walletconnect-on-mobile) (recommended)
* [Desktop instructions](https://help.safe.global/en/articles/40849-walletconnect-safe-app)
