// src/services/faucetService.ts

import Web3 from 'web3';
import { updateTableland } from './tablelandService';

const web3 = new Web3('https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID');

const faucetAddress = 'YOUR_FAUCET_ACCOUNT_ADDRESS';

export const sendEther = async (toAddress: string, amount: number): Promise<void> => {
 try {
    const transaction = {
      from: faucetAddress,
      to: toAddress,
      value: web3.utils.toWei(amount.toString(), 'ether'),
      gas: 21000,
      gasPrice: web3.utils.toWei('20', 'gwei'),
    };

    const receipt = await web3.eth.sendTransaction(transaction);
    console.log('Transaction receipt:', receipt);

    // Update Tableland after sending Ether
    await updateTableland(toAddress);
 } catch (error) {
    console.error('Error sending Ether:', error);
    // Handle the error appropriately, e.g., retry, notify the user, etc.
 }
};
