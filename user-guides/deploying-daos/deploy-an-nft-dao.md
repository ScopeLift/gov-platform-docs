---
description: How to deploy an NFT DAO with on-chain voting
---

# Deploy an NFT Governor

<figure><img src="https://cdn-images-1.medium.com/max/1600/1*mOf0QP92hZdOalWiM2lVEA.png" alt=""><figcaption></figcaption></figure>

Are you looking to build at the intersection of DAOs and NFTs? You're in the right place.

This walkthrough aims to help you create a DAO-ready NFT project from day 1. We'll walk through the steps to create an on-chain DAO where 1 NFT = 1 vote. You'll need a working knowledge of the Solidity build environment.

We'll use the [**PaulrBeerg Solidity Template**](https://github.com/paulrberg/solidity-template), which has all the configuration needed to start writing our contracts.

We'll also mix in a few Solidity libraries:

* **Open Zeppelin ERC721:** a token contract that implements the Non-Fungible Token standard.
* **Open Zeppelin Governor**: contract for creating and voting on DAO proposals.
* **Open Zeppelin ERC721Votes:** This contract implements the support for voting and delegation, where each individual NFT counts as one vote unit.
* [**Timelock**](https://github.com/withtally/my-nft-dao-project/blob/main/contracts/Timelock.sol)**:** This contract will allow the successful proposals to enter a review period before execution.

#### Let's dive in!

1. First, let's create our repository using [Paul's solidity template](https://github.com/paulrberg/solidity-template). You can use this command:

```
git clone https://github.com/paulrberg/solidity-template.git my-nft-dao-project
```

2\. After creating our repository, we can go to the created directory:

```
cd my-nft-dao-project
```

3\. In the project directory, let's run the \`yarn\` installation command:

```
yarn install
```

4\. Now, we can open the project in our favorite editor, and it should look like this:

<figure><img src="https://cdn-images-1.medium.com/max/1600/1*e16NtWO_Igy9qbvzxh9K3Q.png" alt=""><figcaption><p>Project structure</p></figcaption></figure>

We won't jump into the details of the project structure. Instead, we'll focus on the following folders:

* **contracts/**folder, which is where all our **solidity** contracts will be. You can add more subfolders if you want a more detailed structure. We won't do so in this tutorial.
* **tasks/**folder, which is where we'll add the scripts needed to deploy our contracts in our desired Ethereum network.

5\. We'll need to add a **.env** file following the **.env.template** defined in the project folder. These variables are necessary for deploying our contract later and are used in the **hardhat.config.ts** file in our root folder:

```
# Any RPC endpoint goes here. Doesn't have to be InfuraINFURA_API_KEY=zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
```

```
# This is the MNEMONIC of a rinkeby accountMNEMONIC=here is where your twelve words mnemonic should be put my friend
```

6\. Now, let's add the OpenZeppelin contracts library package to our project:

```
yarn add @openzeppelin/contracts
```

#### Let's start coding

First, let's add our NFT contract. We'll keep it to the minimum for this tutorial:

1. Let's add a file called **MyNftToken.sol** in our contracts folder
2. Now let's add the following code to our file:

This simple NFT contract implementation allows minting new tokens using the **safeMint** function and keeps track of the issued token count using the **\_tokenIdCounter**.

Also, we import **ERC721Votes** to make our token contract compatible with the DAO Governor contract we'll implement later. This helps keep track of how many votes a token holder has along with other important information, such as whether they have delegated their voting power to another account, etc.

Now, let's add our Governor contract. You can either use the [OpenZeppelin Contract Wizard](https://wizard.openzeppelin.com/#governor) or create it step by step:

1. Let's make a fileInalled **`MyGovernor.sol`** in our contracts folder:

Now, let's review this file to understand what we're doing with it:

1. We'll import OpenZeppelin contracts instances of Governor, GovernorVotes, GovernorSettings, and GovernorCountingSimple to create the the base of MyGovernor contract.
2. We also import GovernorTimelockCompound to make our governor contract compatible with Compound style Timelock.
3. Then, in the constructor for our Governor contract, we'll initialize the governor contract with a name and tell the addresses we will use for the token contract and the timelock contract.
4. After calling the constructor, we'll define the configuration of our governor contract. Generally, these rules trade-off between making proposals easier and harder to pass. Your DAO can change them later, but only with an on-chain vote.

* [votingDelay](https://docs.openzeppelin.com/contracts/4.x/api/governance#Governor-votingDelay-): the number of blocks a proposal needs to wait after creation to become active and allow voting. Usually set to zero, a longer delay gives people time to set up their votes before voting begins.
* [votingPeriod](https://docs.openzeppelin.com/contracts/4.x/api/governance#Governor-votingPeriod-): number of blocks to run the voting. A more extended period gives people more time to vote. Usually, DAOs set the period to somewhere between 3 and 6 days.
* [quorum](https://docs.openzeppelin.com/contracts/4.x/api/governance#Governor-quorum-uint256-): the minimum number of 'Yes' votes needed for the proposal to pass. Usually, DAOs are set to 1–2% of the outstanding tokens, but a token with a wide distribution and few whales might want to put it lower.
* [proposalThreshold](https://docs.openzeppelin.com/contracts/4.x/api/governance#GovernorProposalThreshold): the minimum amount of voting power an address needs to create a proposal. A low threshold allows spam, but a high threshold makes proposals nearly impossible! DAOs are set to a number that will enable 5 or 10 of the largest token holders to create proposals.

4\. Last, we'll add overrides for the following functions. These interfaces are abstract, so we need to implement these functions:

* **getVotes** — Gets the number of votes a user had before the proposal goes live
* **state** — Gets the current state of the specified proposal
* **propose** — Creates a proposal if the sender has enough votes
* **\_execute** — Sends the proposal for execution. The proposal must have surpassed the required timelock delay
* **\_cancel** — Cancels the specified proposal if its creator falls below the required threshold
* **\_executor** — Gets the address through which the Governor executes an action. In our case, the timelock address.
* **supportsInterface** — ERC165 that allows validating the interfaces used in our contract

Now, let's add our Timelock contract:

```
cd contracts/curl https://raw.githubusercontent.com/withtally/my-nft-dao-project/main/contracts/Timelock.sol --output Timelock.sol
```

Now our contracts folder should look like this:

<figure><img src="https://cdn-images-1.medium.com/max/1600/1*gwrN1Wds-dQ-R9OQCeIGbw.png" alt=""><figcaption><p>contracts folder</p></figcaption></figure>

If you're missing something, compare your project to this [example repository](https://github.com/withtally/my-nft-dao-project).

Next, we'll make sure the contracts compile:

```
yarn compile
```

#### Let's deploy

1. First, we'll add this **getExpectedContractAddress** function so that our deploy script can tell the **Timelock** where to find the **Governor**. We'll add a **utils.ts** file in our project **tasks/** folder and add the code below:

2\. We'll create a new [hardhat task](https://hardhat.org/guides/create-task.html). These tasks help automate steps in our contract development process. Let's add a new file in the **tasks/deploy/** folder in our project and name it **dao.ts,** and add the following to it:

3\. We'll add the DAO task to the **tasks/index.ts** file:

```
import "./dao";
```

4\. Let's update our **package.json** deploy script line to look like this:

```
"scripts": {	...	"deploy": "hardhat deploy:Dao",}
```

It's always essential to verify our smart contracts code on Etherscan. That way, our users can validate that the deployed contract does what it claims to do.

4\. Now, let's add the library needed to verify our contracts on Etherscan:

```
yarn add -D @nomiclabs/hardhat-etherscan
```

5\. In our root folder, let's find the **hardhat.config.ts** and update the configuration object to include the Etherscan config:

```
import "@nomiclabs/hardhat-etherscan"; // add the import of the plugin
```

```
const config: HardhatUserConfig = {	...	etherscan:{ apiKey: process.env.ETH_SCAN_API_KEY },}
```

6\. Next, we'll add the API key as an environment variable to our **.env** file. You can get your Etherscan API key [here](https://etherscan.io/apis):

```
ETH_SCAN_API_KEY=
```

7\. Now, we can deploy our contracts in R**inkeby** using the following command. Make sure the account which **mnemonic** we set up on the **.env** has testnet **Rinkeby ether** for gas!

```
yarn deploy --network rinkeby
```

8\. Add your DAO to [Tally](http://tally.xyz) using [this form](https://www.tally.xyz/register/protocol). This will make it easy for your community to create proposals, vote, and delegate.

We now have an NFT DAO deployed and verified on Etherscan. Our budding NFT community can vote on implementing the NFT contract and how to spend any money in the treasury.
