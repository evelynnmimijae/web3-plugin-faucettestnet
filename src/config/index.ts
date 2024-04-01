// src/config/index.ts

import dotenv from 'dotenv';
dotenv.config();

export const ethereumConfig = {
    network: 'ropsten', // or any other testnet
    privateKey: process.env.PRIVATE_KEY || '',
    gasPrice: 20, // in Gwei
    gasLimit: 21000,
   };
   
   export const tablelandConfig = {
    apiKey: 'YOUR_TABLELAND_API_KEY',
    databaseId: 'YOUR_DATABASE_ID',
   };
   