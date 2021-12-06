# Create a Proposal

Before getting started, be sure to connect your wallet.

{% content-ref url="connect-your-wallet.md" %}
[connect-your-wallet.md](connect-your-wallet.md)
{% endcontent-ref %}

To submit a proposal, you must have at least enough voting power to meet the protocol's **proposal submission threshold**. You can find this number on each protocol's governance page by selecting the "information" section near the top of the page.

![](<../../.gitbook/assets/image (103).png>)

## Submitting a proposal:

Select the "add new proposal" button on the top of the relevant governance page.

![](<../../.gitbook/assets/image (104).png>)

Type in the proposal title and description in the text boxes. Then select the "add new command" option in the bottom right corner.

![](<../../.gitbook/assets/image (106).png>)

Enter the address of the contract you would like to interact with via the governance proposal, then click the "continue" button to advance to the next step.

![](<../../.gitbook/assets/image (108).png>)

Input a value of ETH in wei. In most cases, this value will be 0.

![](<../../.gitbook/assets/image (109).png>)

Select a function from the list of available options (these are generated automatically based on the address entered in step 1).

![](<../../.gitbook/assets/image (111).png>)

If the target address is not verified on Etherscan, you can manually add the contract ABI by selecting the "import ABI" button and then uploading a JSON file.

![](<../../.gitbook/assets/image (112).png>)

Enter any values needed for the function call you selected in step 3.

![](<../../.gitbook/assets/image (113).png>)

Verify that the inputted information in the summary section, paying special attention the the values/units in the "call data" section. If everything is correct, click "submit" to add this command to your proposal.

![](<../../.gitbook/assets/image (114).png>)

Your command has now been added to the proposal. You can review the command information again by clicking on the eye icon, or remove the command by selecting the trash can icon. If you would like to add additional commands, simply select the "add new command" button and repeat the steps above.

![](<../../.gitbook/assets/image (115).png>)

Once you've entered all necessary commands, click the "create proposal" button at the bottom. This will trigger a signature request for your wallet to submit the proposal as an on chain transaction.
