// src/ethereum/web3Instance.ts

import Web3 from 'web3';

export function initializeWeb3(): Web3 {
 const web3 = new Web3('https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID');
 return web3;
}
