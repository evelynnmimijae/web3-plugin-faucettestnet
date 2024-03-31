// src/smartContracts/index.ts

import Web3 from 'web3';
import { ethereumConfig } from '../config';

const web3 = new Web3(ethereumConfig.network);

export async function callContractMethod(contractAddress: string, abi: any[], methodName: string, args: any[]) {
 const contract = new web3.eth.Contract(abi, contractAddress);
 const result = await contract.methods[methodName](...args).call();
 return result;
}
