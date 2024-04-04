// src/smartContracts/index.ts

import Web3 from 'web3';
import { ethereumConfig } from '../config';

const web3 = new Web3(ethereumConfig.network);

export async function callContractMethod(contractAddress: string, abi: any[], methodName: string, args: any[]) {
  const contract = new web3.eth.Contract(abi, contractAddress);
  const result = await contract.methods[methodName](...args).call();
  return result;
}

export async function sendContractTransaction(contractAddress: string, abi: any[], methodName: string, args: any[], fromAddress: string, privateKey: string) {
  const contract = new web3.eth.Contract(abi, contractAddress);

  // Create a transaction object
  const transaction = contract.methods[methodName](...args);
  
  // Estimate gas required for the transaction
  const gas = await transaction.estimateGas({from: fromAddress});
  
  // Get the current transaction count for the provided address (nonce)
  const nonce = await web3.eth.getTransactionCount(fromAddress, 'latest'); 

  // Sign the transaction with the private key
  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      data: transaction.encodeABI(),
      gas,
      nonce,
    },
    privateKey,
  );

  // Send the signed transaction
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  return receipt;
}
