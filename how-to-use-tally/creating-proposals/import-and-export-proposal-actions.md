# Import & export proposal actions

Export and import proposal actions as JSON files to verify calldata externally, reuse proposal configurations, and reduce errors when creating complex proposals.

{% hint style="info" %}
**Note:** This feature is currently available for **ENS governance**.&#x20;
{% endhint %}

### Export proposal actions

#### 1) Navigate to the Proposal Builder

Go to your DAO’s governance page and click **Create Proposal** to access the proposal builder.&#x20;

#### 2) Configure & export

* Set up your proposal actions (contract calls, custom transactions, etc.)
* Click **Export Actions** to download a JSON file with all action data&#x20;

### Import proposal actions

#### 1) Access and Import

In the proposal builder:

* Click **Import Actions**
* Upload a JSON file (**max 1 MB**) or paste JSON directly
* Click **Import** to load the actions
* Tally validates the structure and displays clear error messages if needed&#x20;

***

### Required JSON Format

Your JSON file must follow the **Safe Transaction Builder** format. This format is compatible with **Safe wallets**.

#### Basic Structure

<pre><code>{
  "version": "1.0",
  "chainId": "1",
  "createdAt": 1731063959080,
  "meta": {
    "name": "Transactions Batch",
    "description": "",
    "txBuilderVersion": "1.17.1",
    "createdFromSafeAddress": "",
    "createdFromOwnerAddress": "",
    "checksum": ""
  },
  "transactions": [
    {
      "to": "0xb1040D3ce131b3204E5229C80a8d5Ae271B2ef09",
      "value": "1000000000000000000",
      "data": null,
      "contractMethod": {
        "inputs": [],
        "name": "transfer",
        "payable": true
      },
<strong>      "contractInputsValues": null
</strong>    }
  ]
}
</code></pre>

#### Top level fields

| Field               | Description                                                     |
| ------------------- | --------------------------------------------------------------- |
| `version`           | Must be `"1.0"`                                                 |
| `chainId`           | Network chain ID as a string (e.g., `"1"` for Ethereum mainnet) |
| `createdAt`         | Unix timestamp in milliseconds                                  |
| `meta` _(optional)_ | Metadata object describing the batch                            |
| `transactions`      | Array of transaction objects (**max 10 actions**)               |

#### Transactional object fields

Each transaction in the `transactions` array supports the following fields:

| Field                  | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `to`                   | Target contract address                              |
| `value`                | Amount of native token (ETH) to send in wei (string) |
| `data`                 | ABI-encoded calldata (`null` for native transfers)   |
| `contractMethod`       | Function metadata object                             |
| `contractInputsValues` | Optional decoded parameter values                    |

### Examples

#### Native token transfer

```
{
  "version": "1.0",
  "chainId": "1",
  "createdAt": 1731063959080,
  "meta": {
    "name": "ETH Transfer",
    "description": "Send 1 ETH",
    "txBuilderVersion": "1.17.1"
  },
  "transactions": [
    {
      "to": "0xb1040D3ce131b3204E5229C80a8d5Ae271B2ef09",
      "value": "1000000000000000000",
      "data": null,
      "contractMethod": {
        "inputs": [],
        "name": "transfer",
        "payable": true
      },
      "contractInputsValues": null
    }
  ]
}
```

#### ERC20 token transfer

```
{
  "version": "1.0",
  "chainId": "1",
  "createdAt": 1731063959080,
  "meta": {
    "name": "USDC Transfer",
    "description": "Transfer 1000000 USDC"
  },
  "transactions": [
    {
      "to": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "value": "0",
      "data": "0xa9059cbb000000000000000000000000b1040d3ce131b3204e5229c80a8d5ae271b2ef0900000000000000000000000000000000000000000000000000000000000f4240",
      "contractMethod": {
        "inputs": [
          {
            "name": "recipient",
            "type": "address"
          },
          {
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "payable": false
      },
      "contractInputsValues": {
        "recipient": "0xb1040D3ce131b3204E5229C80a8d5Ae271B2ef09",
        "amount": "1000000"
      }
    }
  ]
}
```

#### Custom contract call

```
{
  "version": "1.0",
  "chainId": "1",
  "createdAt": 1731063959080,
  "meta": {
    "name": "USDC Transfer",
    "description": "Transfer 1000000 USDC"
  },
  "transactions": [
    {
      "to": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "value": "0",
      "data": "0xa9059cbb000000000000000000000000b1040d3ce131b3204e5229c80a8d5ae271b2ef0900000000000000000000000000000000000000000000000000000000000f4240",
      "contractMethod": {
        "inputs": [
          {
            "name": "recipient",
            "type": "address"
          },
          {
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "payable": false
      },
      "contractInputsValues": {
        "recipient": "0xb1040D3ce131b3204E5229C80a8d5Ae271B2ef09",
        "amount": "1000000"
      }
    }
  ]
}
```

{% hint style="info" %}
Note: The data field contains ABI-encoded calldata and is difficult to write manually. We recommend exporting existing actions or using Safe's Transaction Builder to generate the correct format.
{% endhint %}

