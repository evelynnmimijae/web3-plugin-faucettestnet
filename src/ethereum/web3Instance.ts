// src/ethereum/web3Instance.ts

import Web3 from 'web3';
import { ethereumConfig } from '../config';

export const web3 = new Web3(ethereumConfig.network);

export function initializeWeb3(): Web3 {
 const web3 = new Web3('https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID');
 return web3;
}
