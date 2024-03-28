// src/services/faucetService.ts

import Web3 from 'web3';
import { updateTableland } from './tablelandService';

const web3 = new Web3('https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID');

export const sendEther = async (toAddress: string, amount: number): Promise<void> => {
 const accounts = await web3.eth.getAccounts();
 const faucetAddress = accounts[0]; // Assuming the faucet is the first account

 const transaction = {
    to: toAddress,
    value: web3.utils.toWei(amount.toString(), 'ether'),
    gas: 21000,
    gasPrice: web3.utils.toWei('20', 'gwei'),
 };

 const receipt = await web3.eth.sendTransaction(transaction);
 console.log('Transaction receipt:', receipt);

 // Update Tableland after sending Ether
 await updateTableland(toAddress);
};
