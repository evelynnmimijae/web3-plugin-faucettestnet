// src/ethereum/index.ts

import Web3 from 'web3';
import { ethereumConfig } from '../config';

const web3 = new Web3(ethereumConfig.network);

export async function sendEther(toAddress: string, amount: number): Promise<void> {
   const web3 = initializeWeb3();
   const accounts = await web3.eth.getAccounts();
   const faucetAddress = accounts[0]; // Assuming the faucet is the first account
  
   const transaction = {
      to: toAddress,
      value: web3.utils.toWei(amount.toString(), 'ether'),
      gas: 21000,
      gasPrice: web3.utils.toWei('20', 'gwei'),
   };
  
   try {
      const receipt = await web3.eth.sendTransaction(transaction);
      console.log('Transaction receipt:', receipt);
   } catch (error) {
      console.error('Error sending Ether:', error);
   }
  }

export async function sendTransaction(to: string, amount: number) {
 const { privateKey, gasPrice, gasLimit } = ethereumConfig;
 const account = web3.eth.accounts.privateKeyToAccount(privateKey);
 const tx = {
    from: account.address,
    to,
    value: web3.utils.toWei(amount.toString(), 'ether'),
    gas: gasLimit,
    gasPrice: web3.utils.toWei(gasPrice.toString(), 'gwei'),
 };

 const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
 const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
 return receipt;
}
