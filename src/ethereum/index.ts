// src/ethereum/index.ts

import { ethereumConfig } from '../config';
import { initializeWeb3 } from './web3Instance';

// Use the Web3 instance initialized in web3Instance.ts
const web3 = initializeWeb3();

export async function sendEther(toAddress: string, amount: number): Promise<void> {
   const accounts = await web3.eth.getAccounts();
   const faucetAddress = accounts[0]; 
  
   // Automatically set the gas price
   const gasPrice = await web3.eth.getGasPrice();

   // Estimate the gas limit for the transaction
   const gasLimit = await web3.eth.estimateGas({
      from: faucetAddress,
      to: toAddress,
      value: web3.utils.toWei(amount.toString(), 'ether'),
   });
  
   const transaction = {
      from: faucetAddress, 
      to: toAddress,
      value: web3.utils.toWei(amount.toString(), 'ether'),
      gas: gasLimit,
      gasPrice: gasPrice,
   };
  
   try {
      const receipt = await web3.eth.sendTransaction(transaction);
      console.log('Transaction receipt:', receipt);
   } catch (error) {
      console.error('Error sending Ether:', error);
   }
}

export async function sendTransaction(to: string, amount: number) {
 const { privateKey } = ethereumConfig;
 const account = web3.eth.accounts.privateKeyToAccount(privateKey);

 // Automatically set the gas price
 const gasPrice = await web3.eth.getGasPrice();

 // Estimate the gas limit for the transaction
 const gasLimit = await web3.eth.estimateGas({
    from: account.address,
    to,
    value: web3.utils.toWei(amount.toString(), 'ether'),
 });

 const tx = {
    from: account.address,
    to,
    value: web3.utils.toWei(amount.toString(), 'ether'),
    gas: gasLimit,
    gasPrice: gasPrice,
 };

 const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
 const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
 return receipt;
}
