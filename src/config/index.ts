// src/config/index.ts

import dotenv from 'dotenv';
dotenv.config();

export const ethereumConfig = {
    network: 'ropsten', // Example network
    privateKey: 'YOUR_PRIVATE_KEY',
    gasPrice: 20, // Example gas price
    gasLimit: 21000, // Example gas limit
    defaultEtherAmount: 0.1,
   };
   
   export const tablelandConfig = {
    apiKey: 'YOUR_TABLELAND_API_KEY',
    databaseId: 'YOUR_DATABASE_ID',
   };
   
   export const faucetRules = {
    ethDistributionAmount: 0.1, // Amount of Ether distributed per request
    eligibilityCriteria: {
      // Define criteria for eligibility
      minBalance: 0.01, // Example: Minimum balance required
      maxRequestsPerDay: 3, // Example: Maximum number of requests per day
    },
  };
