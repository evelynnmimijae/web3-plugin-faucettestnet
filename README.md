A web3.js Faucet Plugin for Testnets
===========

This repository contains a Faucet Plugin for Testnets built using Web3.js, Tableland, and smart contracts. The plugin allows users to request Ether for testing purposes on Ethereum testnets. It leverages the power of Web3.js to interact with the Ethereum blockchain, Tableland to manage data, and smart contracts to automate the distribution of Ether.

Features
----------
User request handling: Request validation—Validates user requests to ensure they meet the criteria for receiving Ether (e.g., valid Ethereum address format). Rate limiting—Implements rate limiting to prevent abuse of the faucet and ensure fair distribution of Ether.

Database integration with Tableland: Address Verification—Checks the Tableland database to verify if a user's address has already claimed Ether, preventing double-spending. Claim Record Management—Updates the Tableland database to mark an address as having claimed Ether after a successful transaction.

Ethereum Blockchain Interaction: Transaction Sending—Uses web3.js to send transactions from the faucet's Ethereum address to the user's address, transferring the requested amount of testnet Ether. Gas Management—Automatically sets appropriate gas prices and gas limits for transactions to ensure they are processed efficiently.

Smart Contract Support (Optional): Contract Interaction—If the faucet uses smart contracts for more complex logic (e.g., time-locked claims), the plugin can interact with these contracts using web3.js. Event Listening—The plugin listens for specific events emitted by the smart contracts to trigger actions (e.g., updating the database when a user claims Ether).

User feedback and Error handling: Confirmation Messages—Provides feedback to the user upon successful Ether distribution, including the transaction hash for verification. Error Handling— Gracefully handles and communicates errors to the user, including issues with the Ethereum network, insufficient funds, or problems with the Tableland database.

Security Measures: Secure Storage of Private Keys—Ensures that the faucet's private key is securely stored and not exposed, protecting the faucet's funds. Encryption—Uses encryption for sensitive data, such as API keys for Tableland, to enhance security.

Customization and Extensibility: Customizable Rules allow for customization of rules, such as the amount of Ether distributed per request or the eligibility criteria. Extensibility should be designed to be easily extended with additional features or integrations as needed.

This is still a work in progress, but feel free to tinker around, make notes, and contribute (see "Contributing" below).

How to use
------------

1. Clone the repository.
`git clone https://github.com/evelynnmimijae/web3-plugin-faucettestnet.git` in the Command Line. 

2. Navigate to the project directory
`cd web3-faucet-plugin`

3. Install dependencies.
`npm install`

4. Import, initiate, and use.
import { FaucetPlugin } from './src/FaucetPlugin';

async function main() {
 const faucetPlugin = new FaucetPlugin();
 await faucetPlugin.init();

 // Request 1 Ether to the specified address
 await faucetPlugin.requestEther('0xYourEthereumAddress', 1);
}

// Run the main function
main().catch(console.error);

Contributing
------------
Pull requests are welcome.

License
-------
This project is licensed under the MIT License. See the `LICENSE` file for details.
